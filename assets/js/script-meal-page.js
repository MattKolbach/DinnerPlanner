const randomMealButton = document.querySelector('#randomSearchButton');
const resultMealEl = document.querySelector('#result-meal');

var meals = [] // create array to hold meals for saving

const getRandomMealHandler = function (event) {
    event.preventDefault();
    resultMealEl.innerHTML = "";
    console.log('worked');
    const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
    console.log(randomMealUrl);
    fetch(randomMealUrl).then(function (response) {
        if (response.ok) {
            // console.log(response);
            response.json().then(function (data) {
                // console.log(data);
                const meal = data.meals[0]
                var randomMeal = `${meal.strMeal}`
                const resultMealName = document.createElement('h3');
                resultMealName.textContent = randomMeal
                console.log(randomMeal)
                resultMealEl.append(resultMealName);

                console.log(meal);
                for (let i = 1; i < 20; i++) {
                    let ingredient = meal[`strIngredient${i}`]
                    let measure = meal[`strMeasure${i}`];
                    if (ingredient && measure) {
                        const receipe = document.createElement("p");
                        receipe.textContent = measure + " " + ingredient
                        resultMealEl.append(receipe);
                    }
                }
            });
        }
    });

};

// saves random meal to local storage
var saveToMealSearchHistory = function () {
    localStorage.setItem("dinners", JSON.stringify(meals)) // saves to local storage
}

randomMealButton.addEventListener('click', getRandomMealHandler);