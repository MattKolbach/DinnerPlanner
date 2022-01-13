const randomMealButton = document.querySelector('#random-search-button');
const resultMealEl = document.querySelector('#result-meal');

const getRandomMealHandler = function (event) {
    event.preventDefault();
    resultMeal.innerHTML = "";
    console.log('worked');
    const randomMealUrl = "www.themealdb.com/api/json/v1/1/random.php";
    console.log(randomMealUrl);
    fetch(randomMealUrl).then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                const meal = data.meals[0]
                const resultMealName = document.createElement('h3');
                const resultMealTags = document.createElement('p');

                resultMealName.textContent = '${meals.strMeal';
                resultMealTags.textContent = '${meals.strTags';

                resultMealEl.append(resultMealName, resultMealTags);

                console.log(meal);

                for (let i = 1; 1 < 20; i++) {
                    let ingredient = meal['strMealIngredient${i}'];
                    let measure = meal['strMeasure${i}'];
                    if (ingredient) {
                        console.log(ingredient);
                        const resultMealIngredient = document.createElement('p');
                        resultMealIngredient.textContent = ingredient;
                        resultMealEl.append(resultMealIngredient);
                    }
                    if (measure) {
                        console.log(measure);
                        const resultMealMeasure = document.createElement('p');
                        resultMealMeasure.textContent = measure;
                        resultMealEl.append(resultMealMeasure);
                    }
                }

            });
        }
    });

};

randomMealButton.addEventListener('click', getRandomMealHandler);