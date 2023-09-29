let allRecipes = []; // Liste contenant toutes les recettes
let filteredRecipes = []; // Liste pour stocker les recettes filtrées

let ingredientList = []; // Liste pour les ingrédients
let utensilList = []; // Liste pour les ustensiles
let applianceList = []; // Liste pour les appareils

let tagList = []; // Liste pour les tags
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

function updateList() {
  // Réinitialiser les listes
  ingredientList = [];
  utensilList = [];
  applianceList = [];

  // Remplir les listes
  allRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const ingredientName = ingredient.ingredient.toLowerCase();
      if (!ingredientList.includes(ingredientName)) {
        ingredientList.push(ingredientName);
      }
    });

    const applianceName = recipe.appliance.toLowerCase();
    if (!applianceList.includes(applianceName)) {
        applianceList.push(applianceName);
    }

    recipe.ustensils.forEach((utensil) => {
        const utensilName = utensil.toLowerCase();
        if (!utensilList.includes(utensilName)) {
            utensilList.push(utensilName);
        }
    });
  });
}

function updateDisplayOnFilter() {
  // Mettre à jour les recettes filtrées en fonction des filtres sélectionnés
  filteredRecipes = getFilteredRecipes();

  // Mettre à jour l'affichage
  displayGallery(filteredRecipes);
}

function getFilteredRecipes() {
  const searchValueLower = searchValue.toLowerCase();

  // Filtre basé sur la recherche
  filteredRecipes = allRecipes.filter((recipe) => {
    return (
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(searchValueLower)
      ) ||
      recipe.appliance.toLowerCase().includes(searchValueLower) ||
      recipe.ustensils.some((utensil) => utensil.toLowerCase().includes(searchValueLower))
    );
  });

  // Filtre basé sur les tags
  if (tagList.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) => {
      return tagList.every((tag) => {
        return (
          recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(tag)
          ) ||
          recipe.appliance.toLowerCase().includes(tag) ||
          recipe.ustensils.some((utensil) => utensil.toLowerCase().includes(tag))
        );
      });
    });
  }

  return filteredRecipes;
}
