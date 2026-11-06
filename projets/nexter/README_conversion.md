# Script de Conversion PNG/JPEG vers WebP

Ce script Python convertit automatiquement tous vos fichiers PNG et JPEG en format WebP, optimisant ainsi la taille de vos images.

## Installation

1. Installez les dépendances :
```bash
pip install -r requirements.txt
```

## Utilisation

### Conversion simple
Convertit tous les fichiers PNG et JPEG du répertoire actuel :
```bash
python image_to_webp.py
```

### Conversion avec options
```bash
# Conserver les fichiers originaux
python image_to_webp.py --keep-original

# Changer la qualité (1-100, défaut: 85)
python image_to_webp.py --quality 90

# Convertir seulement les PNG
python image_to_webp.py --format png

# Convertir seulement les JPEG
python image_to_webp.py --format jpeg

# Convertir des fichiers spécifiques
python image_to_webp.py --files img/logo.png img/hero.jpeg

# Analyser un répertoire spécifique
python image_to_webp.py --directory img/
```

### Options disponibles
- `--directory, -d` : Répertoire à analyser (défaut: répertoire actuel)
- `--quality, -q` : Qualité WebP 1-100 (défaut: 85)
- `--keep-original, -k` : Conserver les fichiers originaux
- `--files, -f` : Fichiers spécifiques à convertir
- `--format` : Format à convertir (`png`, `jpeg`, ou `all` - défaut: tous)

## Avantages du format WebP
- **Taille réduite** : 25-35% plus petit que PNG, 20-30% plus petit que JPEG
- **Qualité préservée** : Excellente qualité visuelle
- **Support moderne** : Compatible avec tous les navigateurs récents
- **Optimisation** : Parfait pour le web
- **Transparence** : Support de la transparence (comme PNG)

## Exemple de résultats
```
🖼️  Conversion PNG/JPEG → WebP (qualité: 85)
==================================================
📁 37 fichier(s) image trouvé(s)
   📸 PNG: 11
   📷 JPEG: 26

✓ img/logo.png → img/logo.webp
  Taille: 15,432 bytes → 8,234 bytes
  Réduction: 46.6%

✓ img/hero.jpeg → img/hero.webp
  Taille: 2,345,678 bytes → 1,876,543 bytes
  Réduction: 20.0%

✅ Conversion terminée!
📊 37/37 fichiers convertis
💾 Taille totale: 45,234,567 → 32,876,543 bytes
📉 Réduction totale: 27.3%
🗑️  Fichiers originaux supprimés
```
