#!/bin/bash
# Démarre les 3 processus du conteneur unique : gunicorn crushbrito, gunicorn pizzamama, Nginx.
# Si l'un s'arrête, le conteneur s'arrête aussi (Docker le relance : restart: unless-stopped).
#
# Secrets : fichiers /env/<appli>.env montés en lecture seule (écrits par le workflow de déploiement).
set -euo pipefail
umask 077

load_env() {
    if [ -f "/env/$1.env" ]; then
        set -a
        # shellcheck disable=SC1090
        . "/env/$1.env"
        set +a
    fi
}

start_django() {
    local name=$1 module=$2 port=$3
    (
        load_env "$name"
        export DJANGO_DB_PATH="/data/$name/db.sqlite3"
        export DJANGO_MEDIA_ROOT="/data/$name/media"
        export DJANGO_STATIC_ROOT="/srv/static/$name"
        export DJANGO_SCRIPT_NAME="/projets/$name"
        export SCRIPT_NAME="/projets/$name"
        export DJANGO_ALLOWED_HOSTS="${DJANGO_ALLOWED_HOSTS:-hugomeuriel.fr}"
        mkdir -p "/data/$name/media"
        cd "/srv/apps/$name"
        echo "[$name] migrations"
        python manage.py migrate --noinput -v 0
        exec gunicorn --workers 2 --bind "127.0.0.1:$port" --worker-tmp-dir /dev/shm \
            --access-logfile - --error-logfile - "$module.wsgi:application"
    ) &
}

start_django crushbrito osculte 8001
start_django pizzamama pizzeria 8002

# Nginx : clés météo et résolveur DNS injectés dans la config, écrite dans /tmp (lisible par ce conteneur seul).
(
    load_env sunorcloud
    export OWM_API_KEY="${OWM_API_KEY:-cle-absente}"
    export OPENCAGE_API_KEY="${OPENCAGE_API_KEY:-cle-absente}"
    NGINX_RESOLVER="$(awk '/^nameserver/ { print $2; exit }' /etc/resolv.conf)"
    export NGINX_RESOLVER="${NGINX_RESOLVER:-127.0.0.11}"
    envsubst '${OWM_API_KEY} ${OPENCAGE_API_KEY} ${NGINX_RESOLVER}' \
        < /etc/nginx/nginx.conf.template > /tmp/nginx.conf
    exec nginx -c /tmp/nginx.conf -g 'daemon off;'
) &

wait -n
echo "Un processus du conteneur s'est arrêté : arrêt du conteneur." >&2
kill 0
exit 1
