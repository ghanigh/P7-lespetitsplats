// Créer un ensemble pour stocker une liste sans doublons.
let ingredientSet = new Set(); // Ensemble pour les ingrédients
let applianceSet = new Set(); // Ensemble pour les appareils
let utensilSet = new Set(); // Ensemble pour les ustensiles
let tempFilteredRecipes = []; // Liste temporaire des recettes filtrées

let selectedItem = []; // Liste des éléments sélectionnés

// Sélection des boutons du menu déroulant
const ingredientBtn = document.querySelector(".btn_ingredients"); // Bouton pour les ingrédients
const ingredientMenu = ingredientBtn.querySelector(".result_list"); // Menu déroulant des ingrédients
const applianceBtn = document.querySelector(".btn_appareils"); // Bouton pour les appareils
const applianceMenu = applianceBtn.querySelector(".result_list"); // Menu déroulant des appareils
const utensilBtn = document.querySelector(".btn_utensils"); // Bouton pour les ustensiles
const utensilMenu = utensilBtn.querySelector(".result_list"); // Menu déroulant des ustensiles

// Fonctions génériques
function surveillerClicListe(liste, menu) {
  const elementsMenu = menu.getElementsByTagName("li");

  // Parcourir tous les éléments <li> trouvés
  [...elementsMenu].forEach((li) => {
    // Écouter les clics sur les éléments
    li.addEventListener("click", () => {
      // Obtenir le texte de l'élément HTML
      let tag = li.textContent;

      // Créer la balise
      creerBalise(menu, tag);
    });
  });
}

function surveillerChampSaisie(liste, menu, bouton) {
  const inputEl = bouton.querySelector(".input_dropdown");

  // Écouter les modifications de l'entrée du menu déroulant
  inputEl.addEventListener("input", () => {
    const valeurSaisie = inputEl.value.toLowerCase();
    // Au moins deux lettres pour lancer la recherche
    if (valeurSaisie.length >= 2) {
      // Trouver les éléments correspondants dans la liste
      liste = liste.filter((item) => item.toLowerCase().includes(valeurSaisie));

      mettreAJourAffichage(liste, menu); // Mettre à jour l'affichage à mesure que l'utilisateur tape
      surveillerClicListe(liste, menu); // Vérifier si un élément est cliqué dans le menu
    } else {
      // Réafficher
      mettreAJourAffichage(liste, menu);
    }
  });
}

function mettreAJourAffichage(liste, menu) {
  // Filtrer la liste en fonction de la tagList
  liste = liste.filter(item => !tagList.includes(item));

  const listeRestante = menu.querySelector(".remaining_list");

  if (liste.length !== 0) {
    // Si la liste n'est pas vide, nous construisons le menu
    const listeEl = liste.map((item) => `<li>${item}</li>`).join("");
    listeRestante.innerHTML = listeEl;
  } else if (liste.length === 1) {
    const listeEl = `<p>${item}</p>`;
    listeRestante.innerHTML = listeEl;
  } else {
    // Sinon, il n'y a aucun résultat
    const aucunResultat = `<p class="noResult">Aucun résultat</p>`;
    listeRestante.innerHTML = aucunResultat;
  }
}

function creerBalise(menu, tag) {
  const nomBalise = tag;
  const baliseWrapper = document.querySelector(".filters_tags_wrapper");
  let baliseEl;

  // Éviter les doublons dans la tagList
  if (!tagList.includes(nomBalise)) {
    tagList.push(nomBalise);
  }
  // Mettre à jour la variable des recettes filtrées
  filteredRecipes = getFilteredRecipes(tagList);

  displayGallery(filteredRecipes);

  // Créer la balise de filtre
  baliseEl = document.createElement("div");
  baliseEl.classList.add("filters_tag");
  baliseEl.innerHTML = `
          <p class="tag_content">${nomBalise}</p>
          <img class="tag_xmark" src="./assets/icons/xMark.svg" alt="Icône d'une croix" />`;
  baliseWrapper.appendChild(baliseEl, menu);

  // Vérifier le clic sur la croix de la balise
  const tag_Xmark = baliseEl.querySelector(".tag_xmark")
  tag_Xmark.addEventListener("click", () => {
    removeTag(baliseEl, menu);
  })
}
// Afficher l'élément sélectionné en haut de la liste dans le menu
const elementSelectionne = `
  <div class="selected_list">
    <li class="selected_item">${tagName}</li>
    <img id="selected_xmark" src="./assets/icons/filledXmark.svg" alt="Icône d'une croix" />
  </div>
`;

menu.insertAdjacentHTML("afterbegin", elementSelectionne);

// Vérifier le clic sur la croix de l'élément sélectionné
const selected_Xmark = menu.querySelector("#selected_xmark");
selected_Xmark.addEventListener("click", () => {
  removeTag(tagEl, menu);
})

function removeTag(tagEl, menu) {
  const tagASupprimer = tagEl.querySelector(".tag_content").textContent.toLowerCase();
  const elementSelectionne = menu.querySelector(".selected_list");

  // Supprimer le tag de la tagList
  tagList = tagList.filter(tag => tag.toLowerCase() !== tagASupprimer);

  // Supprimer le tag du filtre
  tagEl.remove();

  // Supprimer l'élément sélectionné
  elementSelectionne.remove();

  // Réinitialiser les recettes filtrées
  filteredRecipes = getFilteredRecipes(tagList);

  // Afficher la galerie
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
      const nomIngredient = ingredient.ingredient.toLowerCase();
      ingredientSet.add(nomIngredient);
    });
  });

  // Créer un ensemble pour la liste des appareils
  filteredRecipes.forEach((recipe) => {
    const nomAppareil = recipe.appliance.toLowerCase();
    applianceSet.add(nomAppareil);
  });

  // Créer un ensemble pour la liste des ustensiles
  filteredRecipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      utensilSet.add(ustensil.toLowerCase());
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
