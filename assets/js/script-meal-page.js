const randomSearchButton = document.querySelector("#randomSearchButton");
const resultantFoodEl = document.getElementById("resultantFood");



const getRandomFoodHandler = function (event) {
    event.preventDefault();
    resultantFoodEl.innerHTML = "";
    console.log("worked");
    const randomFoodUrl = 
        "https://www.themealdb.com/api/json/v1/1/random.php";
    console.log(randomFoodUrl);
    fetch(randomFoodUrl).then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                const food = data.meals[0]
                const resultantFoodName = document.createElement("h3");
                const resultantFoodArea = document.createElement("p");

                resultantFoodName.textContent = `${food.strMeal}`;
                resultantFoodArea.textContent = `${food.strArea}`;

                resultantFoodEl.append(resultantFoodName, resultantFoodArea);

                console.log(food);
                for (let i = 1; 1 < 20; i++) {
                    let ingredient = food[`strIngredient${i}`];
                    let measure = food[`strMeasure${i}`];
                    if (ingredient) {
                        console.log(ingredient);
                        const resultantFoodIngredient = document.createElement("p");
                        resultantFoodIngredient.textContent = ingredient;
                        resultantFoodEl.append(resultantFoodIngredient);
                    }
                    if (measure) {
                        console.log(measure);
                        const resultantFoodMeasure = document.createElement("p");
                        resultantFoodMeasure.textContent = measure;
                        resultantFoodEl.append(resultantFoodMeasure);
                    }
                }

            });
        }
    });
};

randomSearchButton.addEventListener("click", getRandomFoodHandler);