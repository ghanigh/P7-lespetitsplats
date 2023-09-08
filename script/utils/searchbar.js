const searchBar = document.getElementById("search_input"); // L'élément de la barre de recherche
const magnifyGlass = document.querySelector(".magnifyGlass_bg"); // L'icône de loupe
const xMarkEl = document.querySelector(".input_Xmark"); // L'icône de croix

function effectuerRecherche() {
  // Filtrer les recettes
  if (searchBar.value.length >= 3) {
    // Correction : Appel à la fonction obtenirRecettesFiltrees
    const filteredRecipes = obtenirRecettesFiltrees();
    // Réafficher les cartes
    displayGallery(filteredRecipes); // Correction : appel à displayGallery au lieu de afficherGalerie
  } else {
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
})

// Écouteur de clic sur la croix de la barre de recherche
xMarkEl.addEventListener("click", () => {
  viderRecherche();
})

// Écouteur des modifications dans le champ de texte. Affiche la croix après 3 caractères.
document.addEventListener("input", () => {
  if (searchBar.value.length >= 3) { // Correction : >= au lieu de !==
    xMarkEl.classList.add("XmarkShow");
  } else {
    xMarkEl.classList.remove("XmarkShow");
  }
})

function obtenirRecettesFiltrees() {
  const searchTerm = searchBar.value.toLowerCase(); // Obtenez la valeur de recherche en minuscules

  // Filtrez les recettes en fonction du terme de recherche
  const filteredRecipes = allRecipes.filter((recipe) => {
    // Vérifiez si le nom ou la description de la recette contient le terme de recherche
    return recipe.name.toLowerCase().includes(searchTerm) || recipe.description.toLowerCase().includes(searchTerm);
  });

  return filteredRecipes;
}

function viderRecherche() {
  searchBar.placeholder = "Recherchez une recette";
  searchBar.value = "";
  xMarkEl.classList.remove("XmarkShow");
  // Correction : Appel à la fonction obtenirRecettesFiltrees
  const filteredRecipes = obtenirRecettesFiltrees();
  // Réafficher les cartes
  displayGallery(filteredRecipes); // Correction : appel à displayGallery au lieu de afficherGalerie
}
