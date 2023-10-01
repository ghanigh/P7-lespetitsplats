const searchBar = document.getElementById("search_input"); // L'élément de la barre de recherche
const magnifyGlass = document.querySelector(".magnifyGlass_bg"); // L'icône de loupe
const xMarkEl = document.querySelector(".input_Xmark"); // L'icône de croix

// Effectuer une recherche
function effectuerRecherche() {
  // Vérifier si la barre de recherche a au moins 3 caractères
  if (searchBar.value.length >= 3) {
    // Filtrer les recettes
    const filteredRecipes = obtenirRecettesFiltrees();
    // Réafficher les cartes
    displayGallery(filteredRecipes);
  } else {
    // Afficher un message d'erreur si la recherche est invalide
    searchBar.value = "";
    searchBar.placeholder = "Veuillez entrer au moins 3 caractères...";
    xMarkEl.classList.remove("XmarkShow");
  }
}

// Écouteur des touches "Entrée" et "Échap"
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    effectuerRecherche();
  }
  if (e.key === "Escape") {
    e.preventDefault();
    viderRecherche();
  }
});

// Écouteur de clic sur la croix de la barre de recherche
xMarkEl.addEventListener("click", () => {
  viderRecherche();
});

// Écouteur des modifications dans le champ de texte. Affiche la croix après 3 caractères.
searchBar.addEventListener("input", () => {
  if (searchBar.value.length >= 3) {
    xMarkEl.classList.add("XmarkShow");
  } else {
    xMarkEl.classList.remove("XmarkShow");
  }
});

// Obtient les recettes filtrées en fonction de la recherche
function obtenirRecettesFiltrees() {
  const searchTerm = searchBar.value.toLowerCase(); // Obtenez la valeur de recherche en minuscules

  // Filtrez les recettes en fonction du terme de recherche
  const filteredRecipes = allRecipes.filter((recipe) => {
    // Vérifiez si le nom ou la description de la recette contient le terme de recherche
    return recipe.name.toLowerCase().includes(searchTerm) || recipe.description.toLowerCase().includes(searchTerm);
  });

  return filteredRecipes;
}

// Vider la recherche et réafficher toutes les recettes
function viderRecherche() {
  searchBar.placeholder = "Recherchez une recette";
  searchBar.value = "";
  xMarkEl.classList.remove("XmarkShow");
  // Effectuer une recherche
  effectuerRecherche();
}

// Gère le clic sur l'icône de recherche
magnifyGlass.addEventListener("click", () => {
  // Vérifie si la barre de recherche a au moins 3 caractères
  if (searchBar.value.length >= 3) {
    // Effectuer une recherche
    effectuerRecherche();
  } else {
    // Afficher un message d'erreur si la recherche est invalide
    searchBar.value = "";
    searchBar.placeholder = "Veuillez entrer au moins 3 caractères...";
    xMarkEl.classList.remove("XmarkShow");
  }
});

// Écouteur des modifications dans le champ de texte. Effectue la recherche après 3 caractères.
searchBar.addEventListener("input", () => {
  if (searchBar.value.length >= 3) {
    // Effectuer une recherche
    effectuerRecherche();
  } else {
    xMarkEl.classList.remove("XmarkShow");
  }
});
