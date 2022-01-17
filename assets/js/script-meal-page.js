const randomSearchButton = document.querySelector("#randomSearchButton");

const resultantFoodEl = document.getElementById("resultantFood");
const otherFoodEl = document.getElementById("otherFoodResult")

const ingredientButton = document.querySelector("#ingredientSearchButton")
const inputIngredientEl = document.querySelector("#inputIngredient")

const searchByAreaButton = document.querySelector("#searchByAreaButton");
const searchAreaEl = document.querySelector("#searchByArea");

var meals = [] //array for holding stuff





//Food by area API//
const getCuisineHandler = function (event) {
  event.preventDefault();


  resultantFoodEl.innerHTML = "";
  const searchArea = searchAreaEl.value.trim();
  
  const cuisineFoodUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + searchArea
  if (searchArea) {
    resultantFoodEl.innerHTML = "";// clears?
    console.log("this one works");

    //searchFoodEl.value = "";
   console.log(cuisineFoodUrl);
   fetch(cuisineFoodUrl).then(function (response) {
       if(response.ok) {
          response.json().then (function(data) {
            otherFoodFiller(data);
          
          
            const foodAreaArrayLength = data.meals.length;
        
            for (let i = 0; i < foodAreaArrayLength; i++) {
              let newFoodButton = document.createElement("button");
              newFoodButton.type = "submit";
              newFoodButton.className = "pure-button";
              newFoodButton.innerText = data.meals[i].strMeals;
              newFoodButton.dataset.id = data.meals[i].idMeal;
              resultantFoodEl.append(newFoodButton);


              var newFoodButtonHandler = function (event) {
                event.preventDefault()
                otherFoodEl.innerHTML = "";//clears previous drink result
                var foodID = data.meals[i].idMeals
                //console.log(drinkID)
                var foodIDUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + foodID
                fetch(foodIDUrl).then(function (response) {
                  if (response.ok) {
                    response.json().then(function (data) {
                      otherFoodResult(data)
                    })
                  }
                })
              }
              newFoodButton.addEventListener("click", newFoodButtonHandler)
            }
          });
        } else {
          console.log("ingredient not valid")
        }
        
      });
    } 
};

const foodByIngredient = function (event) {
  event.preventDefault();
  resultantFoodEl.innerHTML = "";//clears
  const searchIngredient = inputIngredientEl.value.trim();
  inputIngredientEl.value = "";//clears input field
  const inputIngredientUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + searchIngredient;
  console.log(searchIngredient)
  fetch(inputIngredientUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        const foodArrayLength = data.meals.length;
        console.log(foodArrayLength);
        for (let i = 0; i < foodArrayLength; i++) {
          let newFoodButton = document.createElement("button");
          newFoodButton.type = "submit";
          newFoodButton.className = "pure-button";
          newFoodButton.innerText = data.meals[i].strMeals;
          newFoodButton.dataset.id = data.meals[i].idMeal;
          resultantFoodEl.append(newFoodButton);

          var newFoodButtonHandler = function (event) {
            event.preventDefault()
            otherFoodEl.innerHTML = "";//clears 
            var foodID = data.meals[i].idMeals
            var foodIDUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + foodID
            fetch(foodIDUrl).then(function (response) {
              if (response.ok) {
                response.json().then(function (data) {
                  otherFoodResult(data)
                })
              }
            })
          }
          newFoodButton.addEventListener("click", newFoodButtonHandler)
        }
      })
    } else {
      console.log("ingredient not valid")
    }
  })
}

//Random API Call//
const getRandomFoodHandler = function (event) {
    event.preventDefault();
    resultantFoodEl.innerHTML = "";
    console.log("worked");
    const randomFoodUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
    console.log(randomFoodUrl);
    fetch(randomFoodUrl).then(function(response) {
      if (response.ok) {
            //console.log(response);
        response.json().then(function(data) {
        fillResults(data);
               
        });
      };
    });
};



//filling function//
const fillResults = function (data) {
  const food = data.meals[0];

  const resultantFoodName = document.createElement("h3");
  const resultantFoodInstructions = document.createElement("p");

  resultantFoodName.textContent = `${food.strMeal}`;
  resultantFoodInstructions.textContent = `${food.strInstructions}`;

  resultantFoodEl.append(resultantFoodName, resultantFoodInstructions);

  for (let i = 1; i < 50; i++) {
    const food = data.meals[0];
    let ingredient = food[`strIngredient${i}`];
    let measure = food[`strMeasure${i}`];
    if (ingredient && measure) {
      const recipe = document.createElement("p");
      recipe.textContent = measure + " " + ingredient;
      resultantFoodEl.append(recipe);
    }
  }

  var favButton = document.createElement("button")
  favButton.textContent = "Add to Favorites"
  favButton.classList = "pure-button"
  resultantFoodEl.append(favButton)

  var saveFoodToFavorites = function (event) {
   var randomFood = `${food.strMeals}`
   console.log(randomFood)

    if (!meals.includes(randomFood)) {
     saveToFoodFavoriteLibrary(randomFood) // save to local storage
    }
  } 

   favButton.addEventListener("click", saveFoodToFavorites)
  
};

const otherFoodFiller = function (data) {
  const food = data.meals[0];
  const resultFoodName = document.createElement("h3");
  const resultFoodInstructions = document.createElement("p");
  resultFoodInstructions.classList.add("prep-instructions") // adding class name for italics

  resultFoodName.textContent = `${food.strMeals}`;
  resultFoodInstructions.textContent = `${food.strInstructions}`;

  otherFoodEl.append(resultFoodName, resultFoodInstructions);

  for (let i = 1; i < 50; i++) {
    const food = data.meals[0]
    let ingredient = food[`strIngredient${i}`]; //drink @ key
    let measure = food[`strMeasure${i}`];
    if (ingredient && measure) {
      const recipe = document.createElement("p");
      recipe.textContent = measure + " " + ingredient;
      otherFoodEl.append(recipe);
    }
  }

  var favButton = document.createElement("button")
  favButton.textContent = "Add to Favorites"
  favButton.classList = "pure-button"
  otherFoodEl.append(favButton)

  var saveFoodToFavorites = function (event) {
    var randomFood = `${food.strMeals}`
    if (!meals.includes(randomFood)) {
      saveToFoodFavoriteLibrary(randomFood) // save to local storage
    }
  }

  favButton.addEventListener("click", saveFoodToFavorites)

}


var saveToFoodFavoriteLibrary = function (randomFood) {
  const loadFoodFavorites = localStorage.getItem("dinners");
  foods = JSON.parse(loadDrinkFavorites);
  foods.push(randomFood)
  localStorage.setItem("dinners", JSON.stringify(foods)) // saves to local storage
}


randomSearchButton.addEventListener("click", getRandomFoodHandler);
searchByAreaButton.addEventListener("click", getCuisineHandler);
ingredientButton.addEventListener("click", foodByIngredient);
