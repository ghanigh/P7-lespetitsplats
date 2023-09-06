let allRecipes = []; // Une liste contenant toutes les recettes
let filteredRecipes = []; // Une liste pour stocker les recettes filtrées

let ingredientList = []; // Une liste pour les ingrédients
let utensilList = []; // Une liste pour les ustensiles
let applianceList = []; // Une liste pour les appareils

let ingredientNewList = []; // Une nouvelle liste pour les ingrédients
let utensilNewList = []; // Une nouvelle liste pour les ustensiles
let applianceNewList = []; // Une nouvelle liste pour les appareils

let tagList = []; // Une liste pour les tags
let searchValue = ""; // La valeur de recherche


init();

// Récupère la liste des recettes
async function getRecipes() {
  try {
    const response = await fetch('./data/recipes.json'); // Récupère les données du fichier JSON
    const data = await response.json(); // Convertit les données au format JSON
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function init() {
  const recipes = await getRecipes(); // Obtient les recettes
  allRecipes = recipes.recipes; // Stocke toutes les recettes dans la variable allRecipes
  filteredRecipes = allRecipes; // Initialise la liste des recettes filtrées avec toutes les recettes

  updateList(); // Met à jour les listes d'ingrédients, d'ustensiles et d'appareils
  displayGallery(allRecipes); // Affiche la galerie de recettes
  recipesCounter(filteredRecipes); // Met à jour le compteur de recettes
}
