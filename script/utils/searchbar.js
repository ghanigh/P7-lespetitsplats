// Déclaration des éléments de la barre de recherche
const searchBar = document.getElementById("search_input"); // Input de recherche
const magnifyGlass = document.querySelector(".magnifyGlass_bg"); // Icône de loupe
const xMarkEl = document.querySelector(".input_Xmark"); // Icône de croix pour effacer la recherche

// Écouter le clic sur l'icône de loupe
magnifyGlass.addEventListener("click", () => {
    launchSearch(); // Fonction pour lancer la recherche
});

// Écouter les touches Enter et Escape pour la recherche
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        launchSearch(); // Fonction pour lancer la recherche
    }
    if (e.key === "Escape") {
        e.preventDefault();
        emptySearch(); // Fonction pour vider la recherche et afficher toutes les recettes
    }
});

// Écouter le clic sur la croix de la barre de recherche pour vider la recherche
xMarkEl.addEventListener("click", () => {
    emptySearch(); // Fonction pour vider la recherche et afficher toutes les recettes
});

// Écouter les modifications de l'entrée de texte. Afficher une croix une fois que l'utilisateur saisit au moins 3 caractères.
document.addEventListener("input", () => {
    if (searchBar.value.length !== 0) {
        xMarkEl.classList.add("XmarkShow"); // Afficher l'icône de croix pour effacer la recherche
    } else {
        xMarkEl.classList.remove("XmarkShow"); // Masquer l'icône de croix si la recherche est vide
    }
});

// Fonction pour lancer la recherche
function launchSearch() {
    // Filtrer les recettes si l'utilisateur a saisi au moins 3 caractères
    if (searchBar.value.length >= 3) {
        filteredRecipes = getFilteredRecipes(); // Obtenir les recettes filtrées
        displayGallery(filteredRecipes); // Afficher les cartes des recettes filtrées
    } else {
        // Si la recherche est inférieure à 3 caractères, vider la recherche et afficher un message d'invite
        searchBar.value = "";
        searchBar.placeholder = "Veuillez entrer au moins 3 caractères...";
        xMarkEl.classList.remove("XmarkShow"); // Masquer l'icône de croix
    }
}

// Fonction pour vider la recherche et afficher toutes les recettes
function emptySearch() {
    searchBar.placeholder = "Recherchez une recette"; // Remettre le texte d'invite par défaut
    searchBar.value = ""; // Vider le champ de recherche
    xMarkEl.classList.remove("XmarkShow"); // Masquer l'icône de croix
    filteredRecipes = getFilteredRecipes(); // Obtenir toutes les recettes (non filtrées)
    displayGallery(filteredRecipes); // Afficher toutes les cartes des recettes
}

// Fonction pour filtrer les recettes en fonction de la recherche
function getFilteredRecipes() {
    // Mettez ici le code pour filtrer les recettes en fonction de la recherche de l'utilisateur
    // (Code non inclus dans le commentaire, car il dépendrait du fonctionnement spécifique de l'application)
}

// Fonction pour afficher les cartes des recettes filtrées ou non filtrées
function displayGallery(recipes) {
    // Mettez ici le code pour afficher les cartes des recettes en fonction du tableau "recipes"
    // (Code non inclus dans le commentaire, car il dépendrait du fonctionnement spécifique de l'application)
}
