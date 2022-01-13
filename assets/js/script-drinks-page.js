const randomSearchButton = document.querySelector("#randomSearchButton");
const resultantDrinkEl = document.getElementById("resultantDrink");
////////// Global variables above //////////

///// Random Drink API call /////
const getRandomDrinkHandler = function (event) {
  event.preventDefault();
  resultantDrinkEl.innerHTML = "";
  console.log("button click worked");
  const randomDrinkURL =
    "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  console.log(randomDrinkURL);
  fetch(randomDrinkURL).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        const drink = data.drinks[0]
        const resultantDrinkName = document.createElement("h3");
        const resultantDrinkGlass = document.createElement("p");

        resultantDrinkName.textContent = `${drink.strDrink}`;
        resultantDrinkGlass.textContent = `${drink.strGlass}`;

        resultantDrinkEl.append(resultantDrinkName, resultantDrinkGlass);

        console.log(drink);
        for (let i = 1; i < 16; i++) {
            let ingredient = drink[`strIngredient${i}`];//drink @ key
            let measure = drink[`strMeasure${i}`];
            if (ingredient) {
                console.log(ingredient);
                const resultantDrinkIngredient = document.createElement("p");
                resultantDrinkIngredient.textContent = ingredient;
                resultantDrinkEl.append(resultantDrinkIngredient);
            }
            if (measure) {
                console.log(measure);
                const resultantDrinkMeasure = document.createElement("p");
                resultantDrinkMeasure.textContent = measure;
                resultantDrinkEl.append(resultantDrinkMeasure);
            }
        }
      });
    }
  });
};

randomSearchButton.addEventListener("click", getRandomDrinkHandler);
