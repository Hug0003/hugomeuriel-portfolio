# Image unique de hugomeuriel.fr : portfolio + tous les projets dans un seul conteneur.
#   /srv/www            portfolio (/) et projets statiques (/projets/<nom>/), servis par Nginx
#   /srv/apps/<appli>   crushbrito et pizzamama (Django + gunicorn)
#   /srv/static/<appli> fichiers statiques Django, collectés pendant le build
#   /data               volume : bases SQLite et images envoyées (seul dossier modifiable)
#   /env                secrets en lecture seule (écrits par le workflow de déploiement)
FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN apt-get update \
    && apt-get install -y --no-install-recommends nginx gettext-base ca-certificates \
    && rm -rf /var/lib/apt/lists/* /etc/nginx/sites-enabled /etc/nginx/conf.d

COPY requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt

# Applis Django, puis collecte de leurs fichiers statiques (clé factice : elle ne sert qu'au build).
COPY apps/ /srv/apps/
RUN for app in crushbrito pizzamama; do \
        cd "/srv/apps/$app" \
        && DJANGO_SECRET_KEY=build-only DJANGO_STATIC_ROOT="/srv/static/$app" \
           python manage.py collectstatic --noinput -v 0 || exit 1; \
    done

# Portfolio et projets statiques (le .dockerignore écarte les fichiers de travail).
COPY . /srv/www
RUN rm -rf /srv/www/apps /srv/www/docker /srv/www/Dockerfile /srv/www/requirements.txt

COPY docker/nginx.conf.template /etc/nginx/nginx.conf.template
COPY docker/meteo-proxy.conf docker/django-proxy.conf /etc/nginx/
COPY docker/headers/ /etc/nginx/headers/
COPY docker/start.sh /usr/local/bin/start.sh

RUN chmod 755 /usr/local/bin/start.sh \
    && useradd --uid 1000 --no-create-home --shell /usr/sbin/nologin site \
    && mkdir -p /data && chown site:site /data

USER 1000
EXPOSE 8080
CMD ["/usr/local/bin/start.sh"]
