const searchBar = document.getElementById("search_input"); // L'élément de la barre de recherche
const magnifyGlass = document.querySelector(".magnifyGlass_bg"); // L'icône de loupe
const xMarkEl = document.querySelector(".input_Xmark"); // L'icône de croix

// Écouteur de clic sur l'icône de loupe
magnifyGlass.addEventListener("click", () => {
  effectuerRecherche();
})

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
})

// Écouteur de clic sur la croix de la barre de recherche
xMarkEl.addEventListener("click", () => {
  viderRecherche();
})

// Écouteur des modifications dans le champ de texte. Affiche la croix après 3 caractères.
document.addEventListener("input", () => {
  if (searchBar.value.length !== 0) {
    xMarkEl.classList.add("XmarkShow");
  } else {
    xMarkEl.classList.remove("XmarkShow");
  }
})

function effectuerRecherche() {
  // Filtrer les recettes
  if (searchBar.value.length >= 3) {
    filteredRecipes = obtenirRecettesFiltrees();
    // Réafficher les cartes
    afficherGalerie(filteredRecipes);
  } else {
    searchBar.value = "";
    searchBar.placeholder = "Veuillez entrer au moins 3 caractères...";
    xMarkEl.classList.remove("XmarkShow");
  }
}

function viderRecherche() {
  searchBar.placeholder = "Recherchez une recette";
  searchBar.value = "";
  xMarkEl.classList.remove("XmarkShow");
  filteredRecipes = obtenirRecettesFiltrees();
  // Réafficher les cartes
  afficherGalerie(filteredRecipes);
}
