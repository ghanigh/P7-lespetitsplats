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
