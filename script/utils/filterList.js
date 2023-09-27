// Créer des ensembles pour éviter les doublons.
let ingredientSet = new Set(); // Ensemble pour les ingrédients
let applianceSet = new Set(); // Ensemble pour les appareils
let utensilSet = new Set(); // Ensemble pour les ustensiles
let tempFilteredRecipes = []; // Liste temporaire des recettes filtrées

let selectedItem = []; // Liste des éléments sélectionnés

// Sélectionner les boutons du menu déroulant
const ingredientBtn = document.querySelector(".btn_ingredients"); // Bouton pour les ingrédients
const ingredientMenu = ingredientBtn.querySelector(".result_list"); // Menu des ingrédients
const applianceBtn = document.querySelector(".btn_appareils"); // Bouton pour les appareils
const applianceMenu = applianceBtn.querySelector(".result_list"); // Menu des appareils
const utensilBtn = document.querySelector(".btn_utensils"); // Bouton pour les ustensiles
const utensilMenu = utensilBtn.querySelector(".result_list"); // Menu des ustensiles

// Fonctions génériques
function checkListClick(list, menu) {
  const menuEl = menu.getElementsByTagName("li");

  // Parcourir tous les éléments <li> trouvés
  [...menuEl].forEach((li) => {
    // Écouter les clics sur les éléments
    li.addEventListener("click", () => {
      // Obtenir le texte de l'élément HTML
      let tag = li.textContent;

      // Créer le tag
      createTag(menu, tag);
    });
  });
}

function checkInputField(list, menu, btn) {
  const inputEl = btn.querySelector(".input_dropdown");

  // Écouter les modifications de l'entrée du menu déroulant
  inputEl.addEventListener("input", () => {
    const inputValue = inputEl.value.toLowerCase();
    // Au moins deux lettres pour lancer la recherche
    if (inputValue.length >= 2) {
      // Filtrer les éléments correspondants dans la liste
      list = list.filter((item) => item.toLowerCase().includes(inputValue));

      // Mettre à jour l'affichage au fur et à mesure que l'utilisateur tape
      updateDisplay(list, menu);
      
      // Vérifier si un élément est cliqué dans le menu
      checkListClick(list, menu);
    } else {
      // Réafficher la liste complète
      updateDisplay(list, menu);
    }
  });
}

function updateDisplay(list, menu) {
  // Filtrer la liste en fonction des éléments déjà sélectionnés
  list = list.filter(item => !tagList.includes(item));

  const remainList = menu.querySelector(".remaining_list");

  if (list.length !== 0) {
    // Si la liste n'est pas vide, construire le menu
    const listEl = list.map((item) => `<li>${item}</li>`).join("");
    remainList.innerHTML = listEl;
  } else if (list.length === 1) {
    const listEl = `<p>${item}</p>`;
    remainList.innerHTML = listEl;
  } else {
    // Sinon, aucun résultat
    const noResult = `<p class="noResult">Aucun résultat</p>`;
    remainList.innerHTML = noResult;
  }
}

function createTag(menu, tag) {
  const tagName = tag;
  const tagWrapper = document.querySelector(".filters_tags_wrapper");
  let tagEl;

  // Éviter les doublons dans la tagList
  if (!tagList.includes(tagName)) {
    tagList.push(tagName);
  }
  // Mettre à jour la variable des recettes filtrées
  filteredRecipes = getFilteredRecipes(tagList);

  // Afficher le tag de filtre
  tagEl = document.createElement("div");
  tagEl.classList.add("filters_tag");
  tagEl.innerHTML = `
          <p class="tag_content">${tagName}</p>
          <img class="tag_xmark" src="./assets/icons/xMark.svg" alt="Icône d'une croix" />`;
  tagWrapper.appendChild(tagEl, menu);

  // Vérifier le clic sur la croix du tag
  const tag_Xmark = tagEl.querySelector(".tag_xmark")
  tag_Xmark.addEventListener("click", () => {
    removeTag(tagEl, menu);
  })

  // Afficher l'élément sélectionné avant la liste dans le menu
  const itemEl = `
  <div class="selected_list">
    <li class="selected_item">${tagName}</li>
    <img id="selected_xmark" src="./assets/icons/filledXmark.svg" alt="Icône d'une croix" />
  </div>
`;

  menu.insertAdjacentHTML("afterbegin", itemEl);

  // Vérifier le clic sur la croix de l'élément sélectionné
  const selected_Xmark = menu.querySelector("#selected_xmark");
  selected_Xmark.addEventListener("click", () => {
    removeTag(tagEl, menu);
  })
}

function removeTag(tagEl, menu) {
  const tagToRemove = tagEl.querySelector(".tag_content").textContent.toLowerCase();
  const selectedItem = menu.querySelector(".selected_list");

  // Supprimer le tag de la tagList
  tagList = tagList.filter(tag => tag.toLowerCase() !== tagToRemove);

  // Supprimer le tag du filtre
  tagEl.remove();

  // Supprimer l'élément sélectionné
  selectedItem.remove();

  // Réinitialiser les recettes filtrées
  filteredRecipes = getFilteredRecipes(tagList);

  // Afficher la galerie de recettes
  displayGallery(filteredRecipes);
}

function getFilteredRecipes() {
  filteredRecipes = allRecipes;
  const searchValue = searchBar.value.toLowerCase();

  // METHODE FILTER()
  filteredRecipes = filteredRecipes.filter(recipe =>
    recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchValue) ||
      recipe.description.toLowerCase().includes(searchValue) ||
      recipe.name.toLowerCase().includes(searchValue))
  )

  // METHODE FILTER() pour les MENUS DÉROULANTS
  if (tagList.length !== 0) {
    filteredRecipes = filteredRecipes.filter(recipe =>
      tagList.every(tag =>
        recipe.ingredients.some(ingredient =>
          ingredient.ingredient.toLowerCase().includes(tag) ||
          recipe.appliance.toLowerCase().includes(tag) ||
          recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag))
        )
      )
    )
  }

  // Mettre à jour toutes les listes des menus déroulants
  updateList();

  // Créer le compteur de recettes
  recipesCounter();
  return filteredRecipes;
}

function updateList() {
  // Réinitialiser tous les ensembles
  ingredientSet.clear();
  applianceSet.clear();
  utensilSet.clear();

  // Créer un ensemble pour la liste des ingrédients
  filteredRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const ingredientName = ingredient.ingredient.toLowerCase();
      ingredientSet.add(ingredientName);
    });
  });

  // Créer un ensemble pour la liste des appareils
  filteredRecipes.forEach((recipe) => {
    const applianceName = recipe.appliance.toLowerCase();
    applianceSet.add(applianceName);
    });
    
    // Créer un ensemble pour la liste des ustensiles
    filteredRecipes.forEach((recipe) => {
    recipe.ustensils.forEach((utensil) => {
    utensilSet.add(utensil.toLowerCase());
    });
    });
    
    // Stocker les listes trouvées et mettre à jour le résultat
    ingredientList = Array.from(ingredientSet);
    updateDisplay(ingredientList, ingredientMenu);
    checkListClick(ingredientList, ingredientMenu);
    checkInputField(ingredientList, ingredientMenu, ingredientBtn);
    
    applianceList = Array.from(applianceSet);
    updateDisplay(applianceList, applianceMenu);
    checkListClick(applianceList, applianceMenu);
    checkInputField(applianceList, applianceMenu, applianceBtn);
    
    utensilList = Array.from(utensilSet);
    updateDisplay(utensilList, utensilMenu);
    checkListClick(utensilList, utensilMenu);
}
// updateCounter.js
const recetteCountSpan = document.getElementById("recetteCount");

function mettreAJourCompteurRecettes(nombreRecettes) {
  recetteCountSpan.textContent = nombreRecettes;
}
// ... Votre code existant ...

function updateDisplayOnFilter() {
  // Mettre à jour les recettes filtrées en fonction des filtres sélectionnés
  filteredRecipes = getFilteredRecipes();

  // Mettre à jour l'affichage
  displayGallery(filteredRecipes);
}

