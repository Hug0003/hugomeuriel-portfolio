# Système de Composants Globaux

Ce système permet de réutiliser le header et le footer sur toutes les pages du site.

## Structure des fichiers

```
assets/
├── components/
│   ├── header.html          # Navigation globale
│   ├── footer.html          # Footer global
│   └── README.md           # Cette documentation
├── js/
│   └── components.js       # Chargeur de composants
```

## Utilisation

### 1. Inclure le script de composants
```html
<script defer src="assets/js/components.js"></script>
```

### 2. Ajouter les placeholders dans votre HTML
```html
<body>
    <!-- Header Component -->
    <div id="header-placeholder"></div>
    
    <!-- Votre contenu -->
    <main>
        <!-- ... -->
    </main>
    
    <!-- Footer Component -->
    <div id="footer-placeholder"></div>
</body>
```

### 3. Les composants se chargent automatiquement
Le script `components.js` charge automatiquement les composants au chargement de la page.

## Avantages

- ✅ **Réutilisabilité** : Un seul endroit pour modifier header/footer
- ✅ **Cohérence** : Même design partout
- ✅ **Maintenance** : Modifications centralisées
- ✅ **Performance** : Cache des composants
- ✅ **Flexibilité** : Facile d'ajouter de nouveaux composants

## Ajouter un nouveau composant

1. Créer le fichier HTML dans `assets/components/`
2. Ajouter la méthode dans `components.js`
3. Appeler la méthode dans `loadAllComponents()`

## Exemple d'ajout

```javascript
// Dans components.js
async loadNewComponent() {
    const html = await this.loadComponent('assets/components/new-component.html');
    const element = document.querySelector('#new-component-placeholder');
    if (element) {
        element.innerHTML = html;
    }
}
```

## Notes importantes

- Les composants se chargent de manière asynchrone
- Le cache évite les requêtes multiples
- Les scripts dépendants doivent être réinitialisés après le chargement
