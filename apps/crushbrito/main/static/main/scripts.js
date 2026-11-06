function pollServer() {
    // Envoie une requête au serveur
    fetch('/check_updates')
        .then(response => response.json())
        .then(data => {
            // Traite les nouvelles données
            if (data.newData) {
                // Met à jour la page avec les nouvelles données
                updatePage(data.newData);
            }
            // Planifie la prochaine requête périodique
            setTimeout(pollServer, 5000);  // Exemple : chaque 5 secondes
        })
        .catch(error => {
            console.error('Erreur lors de la requête au serveur', error);
            // Planifie la prochaine requête périodique en cas d'erreur
            setTimeout(pollServer, 5000);
        });
}





