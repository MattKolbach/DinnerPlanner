const randomSearchButton = document.querySelector("#randomSearchButton");

const resultantDrinkEl = document.getElementById("resultantDrink");
const secondaryResultantDrinkEl = document.getElementById("secondaryResultantDrink");

const ingredientSearchButton = document.querySelector("#ingredientSearchButton");
const userIngredientEl = document.querySelector("#userIngredient");

const drinkNameSearchButton = document.querySelector("#drinkNameSearchButton")
const userDrinkEl = document.querySelector("#userDrink");

const searchResultsEl = document.getElementById("searchResults");

var drinks = [] // create array to hold drinks for saving
////////// Global variables above //////////



/////  SEARCH BY INGREDIENT API call  /////
const drinkByIngredientHandler = function (event) {
  event.preventDefault();
  resultantDrinkEl.innerHTML = "";//clears previous drink result
  secondaryResultantDrinkEl.innerHTML = ""; //clears previous drink result
  const userIngredient = userIngredientEl.value.trim();
  userIngredientEl.value = "";//clears input field
  const userIngredientURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + userIngredient;
  fetch(userIngredientURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        //console.log(data);
        const drinksArrayLength = data.drinks.length;
        console.log(drinksArrayLength);
        for (let i = 0; i < drinksArrayLength; i++) {
          let newDrinkButton = document.createElement("button");
          newDrinkButton.type = "submit";
          newDrinkButton.className = "pure-button";
          newDrinkButton.innerText = data.drinks[i].strDrink;
          newDrinkButton.dataset.id = data.drinks[i].idDrink;
          resultantDrinkEl.append(newDrinkButton);

          // when user clicks on one of the drink buttons, a receipe comes up
          var newDrinkButtonHandler = function (event) {
            event.preventDefault()
            secondaryResultantDrinkEl.innerHTML = "";//clears previous drink result
            var drinkID = data.drinks[i].idDrink
            //console.log(drinkID)
            var drinkIDURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID
            fetch(drinkIDURL).then(function (response) {
              if (response.ok) {
                response.json().then(function (data) {
                  secondaryResultantDrinkPanel(data)
                })
              }
            })
          }
          newDrinkButton.addEventListener("click", newDrinkButtonHandler)
        }
      })
    } else {
      console.log("ingredient not valid")
    }
  })
}

///// SEARCH BY DRINK NAME API call /////
const drinkByNameHandler = function (event) {
  event.preventDefault();
  const userDrink = userDrinkEl.value.trim();
  if (userDrink) {
    resultantDrinkEl.innerHTML = ""; //clears previous drink result
    secondaryResultantDrinkEl.innerHTML = ""; //clears previous drink result

    userDrinkEl.value = ""; // clears input field
    const userDrinkURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + userDrink;
    fetch(userDrinkURL).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          resultantDrinkPanel(data)
        })
      } else {
        console.log("error: drink not found. please check spelling.")
      }
    })
  } else {
    console.log("please enter a drink name") // alert user they did not enter anything 
  }
}

///// RANDOM API call /////
const getRandomDrinkHandler = function (event) {
  event.preventDefault();
  resultantDrinkEl.innerHTML = ""; //clears previous drink result
  secondaryResultantDrinkEl.innerHTML = ""; //clears previous drink result
  const randomDrinkURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  //console.log(randomDrinkURL);
  fetch(randomDrinkURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        resultantDrinkPanel(data)
      });
    }
  });
};

/////   Call this to fill resultant drink panel (resultantDrinkEl)   /////
const resultantDrinkPanel = function (data) {
  const drink = data.drinks[0];
  const resultantDrinkName = document.createElement("h3");
  // resultantDrinkName.classList.add("drink-title") // adding class name for fav. btn
  const resultantDrinkGlass = document.createElement("p");
  const resultantDrinkInstructions = document.createElement("p");
  resultantDrinkInstructions.classList.add("drink-instructions") // adding class name for italics

  resultantDrinkName.textContent = `${drink.strDrink}`;
  resultantDrinkGlass.textContent = "Glass: " + `${drink.strGlass}`;
  resultantDrinkInstructions.textContent = `${drink.strInstructions}`;

  resultantDrinkEl.append(
    resultantDrinkName,
    resultantDrinkGlass,
    resultantDrinkInstructions
  );

  for (let i = 1; i < 16; i++) {
    const drink = data.drinks[0]
    let ingredient = drink[`strIngredient${i}`]; //drink @ key
    let measure = drink[`strMeasure${i}`];
    if (ingredient && measure) {
      const receipe = document.createElement("p");
      receipe.textContent = measure + " " + ingredient;
      resultantDrinkEl.append(receipe);
    }
  }

  var favButton = document.createElement("button")
  favButton.textContent = "Add to Favorites"
  favButton.classList = "pure-button"
  resultantDrinkEl.append(favButton)

  var saveDrinkToFavorites = function (event) {
    var randomDrink = `${drink.strDrink}`
    console.log(randomDrink)
    // check if drink is already saved to local storage
    // if drink isn't already saved, then save drink
    if (!drinks.includes(randomDrink)) {
     // drinks.push(randomDrink) // push the drink into the drinks array
      saveToDrinkFavoriteLibrary(randomDrink) // save to local storage
    }
  }

  favButton.addEventListener("click", saveDrinkToFavorites)

};

/////   Call this to fill secondary resultant drink panel (secondaryResultantDrinkEl)   /////
/////   Only used for SEARCH BY INGREDIENT API CALL   /////
const secondaryResultantDrinkPanel = function (data) {
  const drink = data.drinks[0];
  const resultantDrinkName = document.createElement("h3");
  const resultantDrinkGlass = document.createElement("p");
  const resultantDrinkInstructions = document.createElement("p");
  resultantDrinkInstructions.classList.add("drink-instructions") // adding class name for italics

  resultantDrinkName.textContent = `${drink.strDrink}`;
  resultantDrinkGlass.textContent = "Glass: " + `${drink.strGlass}`;
  resultantDrinkInstructions.textContent = `${drink.strInstructions}`;

  secondaryResultantDrinkEl.append(
    resultantDrinkName,
    resultantDrinkGlass,
    resultantDrinkInstructions
  );

  for (let i = 1; i < 16; i++) {
    const drink = data.drinks[0]
    let ingredient = drink[`strIngredient${i}`]; //drink @ key
    let measure = drink[`strMeasure${i}`];
    if (ingredient && measure) {
      const receipe = document.createElement("p");
      receipe.textContent = measure + " " + ingredient;
      secondaryResultantDrinkEl.append(receipe);
    }
  }

  var favButton = document.createElement("button")
  favButton.textContent = "Add to Favorites"
  favButton.classList = "pure-button"
  secondaryResultantDrinkEl.append(favButton)

  var saveDrinkToFavorites = function (event) {
    var randomDrink = `${drink.strDrink}`
    //console.log(randomDrink)
    // check if drink is already saved to local storage
    // if drink isn't already saved, then save drink
    if (!drinks.includes(randomDrink)) {
       // push the drink into the drinks array
      saveToDrinkFavoriteLibrary(randomDrink) // save to local storage
    }
  }

  favButton.addEventListener("click", saveDrinkToFavorites)
};



/*const loadFavorites = function () {
  const loadDrinkFavorites = localStorage.getItem("drinks");
  const parsedDrinkFavorites = JSON.parse(loadDrinkFavorites);
  console.log(parsedDrinkFavorites);
  saveToDrinkFavoriteLibrary(parsedDrinkFavorites);
}*/



var saveToDrinkFavoriteLibrary = function (randomDrink) {
  const loadDrinkFavorites = localStorage.getItem("drinks");
  drinks = JSON.parse(loadDrinkFavorites);
  drinks.push(randomDrink)
  localStorage.setItem("drinks", JSON.stringify(drinks)) // saves to local storage
}



//window.onload = loadFavorites;
/////   click listeners   /////
randomSearchButton.addEventListener("click", getRandomDrinkHandler);
ingredientSearchButton.addEventListener("click", drinkByIngredientHandler);
drinkNameSearchButton.addEventListener("click", drinkByNameHandler)
