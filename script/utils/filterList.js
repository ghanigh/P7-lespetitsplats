// Ensemble pour les ingrédients
let ingredientSet = new Set();
// Ensemble pour les appareils
let applianceSet = new Set();
// Ensemble pour les ustensiles
let utensilSet = new Set();
let tempFilteredRecipes = [];
let selectedItem = [];

const ingredientBtn = document.querySelector(".btn_ingredients");
const ingredientMenu = ingredientBtn.querySelector(".result_list");
const applianceBtn = document.querySelector(".btn_appareils");
const applianceMenu = applianceBtn.querySelector(".result_list");
const utensilBtn = document.querySelector(".btn_utensils");
const utensilMenu = utensilBtn.querySelector(".result_list");

function checkListClick(list, menu) {
  const menuEl = menu.getElementsByTagName("li");
  [...menuEl].forEach((li) => {
    li.addEventListener("click", () => {
      let tag = li.textContent;
      createTag(menu, tag);
      updateDisplayOnFilter();
    });
  });
}

function checkInputField(list, menu, btn) {
  const inputEl = btn.querySelector(".input_dropdown");
  inputEl.addEventListener("input", () => {
    const inputValue = inputEl.value.toLowerCase();
    if (inputValue.length >= 2) {
      list = list.filter((item) => item.toLowerCase().includes(inputValue));
      updateDisplay(list, menu);
      checkListClick(list, menu);
    } else {
      updateDisplay(list, menu);
    }
  });
}

function updateDisplay(list, menu) {
  list = list.filter(item => !tagList.includes(item.toLowerCase()));
  const remainList = menu.querySelector(".remaining_list");

  if (list.length !== 0) {
    const listEl = list.map((item) => `<li>${item}</li>`).join("");
    remainList.innerHTML = listEl;
  } else if (list.length === 1) {
    const listEl = `<p>${list[0]}</p>`;
    remainList.innerHTML = listEl;
  } else {
    const noResult = `<p class="noResult">Aucun résultat</p>`;
    remainList.innerHTML = noResult;
  }
}

function createTag(menu, tag) {
  const tagName = tag.toLowerCase();
  const tagWrapper = document.querySelector(".filters_tags_wrapper");
  let tagEl;

  if (!tagList.includes(tagName)) {
    tagList.push(tagName);
  }

  filteredRecipes = getFilteredRecipes();

  tagEl = document.createElement("div");
  tagEl.classList.add("filters_tag");
  tagEl.innerHTML = `
    <p class="tag_content">${tagName}</p>
    <img class="tag_xmark" src="./assets/icons/xMark.svg" alt="Icône d'une croix" />`;
  tagWrapper.appendChild(tagEl, menu);

  const tag_Xmark = tagEl.querySelector(".tag_xmark")
  tag_Xmark.addEventListener("click", () => {
    removeTag(tagEl, menu);
    updateDisplayOnFilter();
  });

  const itemEl = `
    <div class="selected_list">
      <li class="selected_item">${tagName}</li>
      <img id="selected_xmark" src="./assets/icons/filledXmark.svg" alt="Icône d'une croix" />
    </div>
  `;

  menu.insertAdjacentHTML("afterbegin", itemEl);

  const selected_Xmark = menu.querySelector("#selected_xmark");
  selected_Xmark.addEventListener("click", () => {
    removeTag(tagEl, menu);
    updateDisplayOnFilter();
  });
}

function removeTag(tagEl, menu) {
  const tagToRemove = tagEl.querySelector(".tag_content").textContent.toLowerCase();
  const selectedItem = menu.querySelector(".selected_list");

  tagList = tagList.filter(tag => tag.toLowerCase() !== tagToRemove);

  tagEl.remove();
  selectedItem.remove();
  filteredRecipes = getFilteredRecipes();
  displayGallery(filteredRecipes);
}

function getFilteredRecipes() {
  filteredRecipes = allRecipes;
  const searchValue = searchBar.value.toLowerCase();

  filteredRecipes = filteredRecipes.filter(recipe =>
    recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchValue) ||
      recipe.description.toLowerCase().includes(searchValue) ||
      recipe.name.toLowerCase().includes(searchValue))
  );

  if (tagList.length !== 0) {
    filteredRecipes = filteredRecipes.filter(recipe =>
      tagList.every(tag =>
        recipe.ingredients.some(ingredient =>
          ingredient.ingredient.toLowerCase().includes(tag) ||
          recipe.appliance.toLowerCase().includes(tag) ||
          recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag))
        )
      )
    );
  }

  updateList();
  recipesCounter();
  return filteredRecipes;
}

function updateList() {
  ingredientSet.clear();
  applianceSet.clear();
  utensilSet.clear();

  filteredRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const ingredientName = ingredient.ingredient.toLowerCase();
      ingredientSet.add(ingredientName);
    });
  });

  filteredRecipes.forEach((recipe) => {
    const applianceName = recipe.appliance.toLowerCase();
    applianceSet.add(applianceName);
  });

  filteredRecipes.forEach((recipe) => {
    recipe.ustensils.forEach((utensil) => {
      utensilSet.add(utensil.toLowerCase());
    });
  });

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

const recetteCountSpan = document.getElementById("recetteCount");

function mettreAJourCompteurRecettes(nombreRecettes) {
  recetteCountSpan.textContent = `${nombreRecettes} recette${nombreRecettes !== 1 ? 's' : ''}`;
}

function displayGallery(filteredRecipes) {
  const section = document.getElementById("recipes");
  section.innerHTML = "";

  filteredRecipes.forEach((recipe) => {
    const { id } = recipe;
    const cardModel = createCard(recipe);

    const cardEl = document.createElement("article");
    cardEl.classList.add("recipe_card");
    cardEl.setAttribute("article-ID", `${id}`);
    cardEl.innerHTML = cardModel;

    section.appendChild(cardEl);
  });
}

function createCard(recipe) {
  const { id, description, ingredients, name, time } = recipe;

  let ingredientItems = "";
  for (let i = 0; i < ingredients.length; i++) {
    const ingredient = ingredients[i];
    const ingredientItem = ingredient.ingredient;
    const quantity = ingredient.quantity ? `${ingredient.quantity}` : " ";
    const unit = ingredient.unit ? `${ingredient.unit}` : " ";

    if (unit === "grammes") {
      ingredient.unit = "g";
    }

    ingredientItems += `<div class="list_item">
                            <p><strong>${ingredientItem} </strong></p>
                            <p>${quantity} ${unit}</p>
                          </div>`;
  }

  const card = `
    <div class="card_wrapper">
        <img src="./assets/recettes/Recette${id}.jpg" alt="Recette : ${name}" class="recette_image">
        <div class="time">
          <p>${time}min</p>
        </div>
        <div class="content_wrapper">
          <h2 class="name">${name}</h2>
          <p class="subtitle">recette</p>
          <p class="description">${description}</p>
          <p class="subtitle">ingrédients</p>
          <ul class="ingredients_list">
            ${ingredientItems}
          </ul>
        </div>
    </div>
  `;

  return card;
}

// Initialisation
init();
