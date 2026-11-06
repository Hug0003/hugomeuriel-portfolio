# hugomeuriel-portfolio

Le site **hugomeuriel.fr** au complet : le portfolio et tous les projets, dans **un seul conteneur Docker**.

| Dossier | Servi à | Type |
|---|---|---|
| `/` (racine) | `hugomeuriel.fr/` | portfolio |
| `projets/guessmynumber/` | `/projets/guessmynumber/` | statique |
| `projets/icecream/` | `/projets/icecream/` | statique |
| `projets/natours/` | `/projets/natours/` | statique |
| `projets/nexter/` | `/projets/nexter/` | statique |
| `projets/trillo/` | `/projets/trillo/` | statique |
| `projets/robot/` | `/projets/robot/` | statique |
| `projets/sunorcloud/` | `/projets/sunorcloud/` | statique + relais API météo (clés côté serveur) |
| `apps/crushbrito/` | `/projets/crushbrito/` | Django |
| `apps/pizzamama/` | `/projets/pizzamama/` | Django |

Les projets viennent de leurs anciens repos (guess-my-number, glace, travel, reservation-hotels,
agence-de-voyage, robot, apiMeteo, crushbrito, Pizzeria), qui restent sur GitHub mais **ne sont plus
déployés** : les modifications se font ici.

## Ajouter un projet

- **Statique** : créer `projets/<nom>/` avec son `index.html` (liens relatifs, sans `/` au début),
  ajouter un bloc `location /projets/<nom>/` dans `docker/nginx.conf.template` et un fichier
  `docker/headers/<nom>.conf` (sa CSP), puis la carte dans `data.json`.
- Pousser sur `main` : le workflow construit l'image, teste chaque chemin, la publie et la déploie.

## Fonctionnement

- `Dockerfile` : une image Python + Nginx. Nginx (port 8080) sert le portfolio et les projets statiques,
  relaie la météo et transmet `/projets/crushbrito/` et `/projets/pizzamama/` aux deux gunicorn
  (127.0.0.1:8001 et 8002), lancés par `docker/start.sh`.
- `docker/headers/` : en-têtes de sécurité, une CSP par projet.
- Secrets (clés Django, clés météo) : jamais dans ce repo. Ils sont dans les secrets GitHub de
  `sites-infra` et arrivent sur le serveur dans `/env`, en lecture seule.
- Données Django (bases SQLite, images envoyées) : volume `/data` sur le serveur.

## En local

```bash
docker build -t hugomeuriel .
docker run --rm -p 8080:8080 --tmpfs /tmp -v "$PWD/.data:/data" hugomeuriel
# → http://localhost:8080 (les applis Django demandent l'en-tête Host: hugomeuriel.fr)
```

Développement d'une appli Django seule : `cd apps/crushbrito && DJANGO_DEBUG=1 python manage.py runserver`.
