const randomSearchButton = document.querySelector("#randomSearchButton");

const resultantFoodEl = document.getElementById("resultantFood");


const searchByAreaButton = document.querySelector("#searchByAreaButton");
const searchedAreaEl = document.querySelector("#searchByArea");





//Food by area API//
const getCuisineHandler = function (event) {
  event.preventDefault();

  const searchArea = searchedAreaEl.value.trim();

  if (searchArea) {

    resultantFoodEl.innerHTML = "";// clears?
    console.log("this one works");

    searchFoodEl.value = "";
  
   const cuisineFoodUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + searchArea
   console.log(cuisineFoodUrl);
   fetch(cuisineFoodUrl).then(function (response) {
       if(response.ok) {
           //console.log(response);
           response.json().then (function(data) {

             console.log(data);

             for (let i = 0; i < 100; i++) {
                 const food = data.meals[i]
                 const resultantFoodName = document.createElement("h3");
                 const resultantFoodId = `${food.stridMeal}`;
  
                 resultantFoodName.textContent = `${food.strMeal}`;
                //resultantFoodId.textContent = 

                 console.log(resultantFoodId);
                 console.log(food);
            
                 resultantFoodEl.append(resultantFoodName);
             };
           });

       };
   });
  } 
};

searchButton.addEventListener("click", getCuisineHandler)

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
               
          });
        }
    });
};

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
}

randomSearchButton.addEventListener("click", getRandomFoodHandler);