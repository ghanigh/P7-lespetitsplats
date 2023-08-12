// Tableau pour stocker toutes les recettes
let allRecipes = [];

// Tableau pour stocker les recettes filtrées
let filteredRecipes = [];

// Tableau pour stocker la liste des ingrédients
let ingredientList = [];

// Tableau pour stocker la liste des ustensiles
let utensilList = [];

// Tableau pour stocker la liste des appareils
let applianceList = [];

// Tableau pour stocker la nouvelle liste des ingrédients
let ingredientNewList = [];

// Tableau pour stocker la nouvelle liste des ustensiles
let utensilNewList = [];

// Tableau pour stocker la nouvelle liste des appareils
let applianceNewList = [];

// Tableau pour stocker la liste des étiquettes
let tagList = [];

// Valeur utilisée pour la recherche
let searchValue = "";

// Initialisation du processus
init();

// Fonction asynchrone pour obtenir la liste des recettes
async function getRecipes() {
  try {
    const response = await fetch('./data/recipes.json'); // Obtenir les données du fichier JSON
    const data = await response.json(); // Convertir les données en format JSON
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Fonction d'initialisation
async function init() {
  const recipes = await getRecipes(); // Obtenir les recettes
  allRecipes = recipes.recipes; // Obtenir toutes les recettes
  filteredRecipes = allRecipes; // Initialiser la liste des recettes filtrées avec toutes les recettes

  updateList(); // Mettre à jour les listes d'ingrédients, d'ustensiles et d'appareils
  displayGallery(allRecipes); // Afficher la galerie de recettes
  recipesCounter(filteredRecipes); // Mettre à jour le compteur de recettes
}
