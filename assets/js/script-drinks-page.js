const randomSearchButton = document.querySelector("#randomSearchButton");
const resultantDrinkEl = document.getElementById("resultantDrink");
const ingredientSearchButton = document.querySelector(
  "#ingredientSearchButton"
);
const userIngredientEl = document.querySelector("#userIngredient");
const searchResultsEl = document.getElementById("searchResults");
////////// Global variables above //////////

///// Random Drink API call /////
const getRandomDrinkHandler = function (event) {
  event.preventDefault();
  resultantDrinkEl.innerHTML = ""; //clears previous drink result
  //console.log("button click worked");
  searchResultsEl.innerHTML = ""; //clears 'buttons' from previous searches
  const randomDrinkURL =
    "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  console.log(randomDrinkURL);
  fetch(randomDrinkURL).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        resultantDrinkPanel(data);
      });
    }
  });
};

/////  Drink by ingredient API call  /////
const drinkByIngredientHandler = function (event) {
  event.preventDefault();
  resultantDrinkEl.innerHTML = ""; //clears previous drink result
  //console.log("button click worked");
  const userIngredient = userIngredientEl.value.trim();
  userIngredientEl.value = ""; //clears input field
  const userIngredientURL =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" +
    userIngredient;
  fetch(userIngredientURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log("data:");
        console.log(data);
        const drinksArrayLength = data.drinks.length;
        console.log(drinksArrayLength);
        for (let i = 0; i < drinksArrayLength; i++) {
          let newDrinkButton = document.createElement("button");
          newDrinkButton.type = "submit";
          newDrinkButton.className = "pure-button";
          newDrinkButton.innerText = data.drinks[i].strDrink;
          newDrinkButton.dataset.id = data.drinks[i].idDrink;

          searchResultsEl.append(newDrinkButton);
        }
      });
    }
  });
};

/////   Search drink on "drink button" click   /////
const searchByIDHandler = function (event) {
  const drinkID = event.target.dataset.id;
  console.log(drinkID);
  const drinkIDURL =
    "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID;
  fetch(drinkIDURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log("data:");
        console.log(data);
        resultantDrinkPanel(data);
      });
    }
  });
};


/////   Call this to fill resultant drink panel (resultantDrinkEl)   /////
const resultantDrinkPanel = function (data) {
  const drink = data.drinks[0];
  const resultantDrinkName = document.createElement("h3");
  const resultantDrinkGlass = document.createElement("p");
  const resultantDrinkInstructions = document.createElement("p");

  resultantDrinkName.textContent = `${drink.strDrink}`;
  resultantDrinkGlass.textContent = `${drink.strGlass}`;
  resultantDrinkInstructions.textContent = `${drink.strInstructions}`;

  resultantDrinkEl.append(
    resultantDrinkName,
    resultantDrinkGlass,
    resultantDrinkInstructions
  );

  //console.log(drink);
  for (let i = 1; i < 16; i++) {
    let ingredient = drink[`strIngredient${i}`]; //drink @ key
    let measure = drink[`strMeasure${i}`];
    if (ingredient) {
      //console.log(ingredient);
      const resultantDrinkIngredient = document.createElement("p");
      resultantDrinkIngredient.textContent = ingredient;
      resultantDrinkEl.append(resultantDrinkIngredient);
    }
    if (measure) {
      //console.log(measure);
      const resultantDrinkMeasure = document.createElement("p");
      resultantDrinkMeasure.textContent = measure;
      resultantDrinkEl.append(resultantDrinkMeasure);
    }
  }
};

/////  drink button factory  /////
/*const drinkButtonFactory = function() {
  const drinkResultEl = document.createElement("button");
  drinkResultEl.type = "submit";//adds type to button
  drinkResultEl.className = "pure-button"; //adds class to button
  drinkResultEl.innerText = 
}*/

randomSearchButton.addEventListener("click", getRandomDrinkHandler);
ingredientSearchButton.addEventListener("click", drinkByIngredientHandler);
searchResultsEl.addEventListener("click", searchByIDHandler);
