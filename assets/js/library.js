//////// DRINKS ////////
// get drinks from local storage
var loadDrinkSearchHistory = function () {
    var savedDrinks = localStorage.getItem("drinks")

    if (savedDrinks === null) {
        return false;
    }

    drinks = JSON.parse(savedDrinks)

    for (var i = 0; i < drinks.length; i++) {
        createDrinkListItemEl(drinks[i])
    }
}

// display on page
var createDrinkListItemEl = function (drink) {
    var drinkListItemEl = document.createElement("li")
    drinkListItemEl.innerHTML = drink
    document.querySelector(".drink-ul").appendChild(drinkListItemEl)
}

//////// DINNERS ////////
// get dinners from local storage
var loadDinnerSearchHistory = function () {
    var savedDinners = localStorage.getItem("dinners")

    if (savedDinners === null) {
        return false;
    }

    dinners = JSON.parse(savedDinners)

    for (var i = 0; i < dinners.length; i++) {
        createDinnerListItemEl(dinners[i])
    }
}

// display on page
var createDinnerListItemEl = function (dinner) {
    var dinnerListItemEl = document.createElement("li")
    dinnerListItemEl.innerHTML = dinner
    document.querySelector(".dinner-ul").appendChild(dinnerListItemEl)
}

// load history on page load
loadDrinkSearchHistory()
loadDinnerSearchHistory()