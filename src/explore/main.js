const dict = {
    "africa": {
        drink: 17831,
        display: "Africa",
        description: `Even if this drink is not from Africa, the primary ingredient actually is!
        Ginger beer was invented in Africa and many local recipes were introduced in the past to make this ingredient.
        How fascinating, you should try it!`
    },
    "asia": {
        drink: 12518,
        display: "Asia",
        description: `This drink is one of the most famous ones from Asia.
        The invention of it, and its name, is attributed to Colonel Hector MacDonald, who devised it during the days of the British Raj in India.
        How interesting, isn't it?`
    },
    "australia": {
        drink: 17211,
        display: "Australia",
        description: `Introducing the "Bermuda Breeze", a classic cocktail born in the tropics. 
        With dark rum and fiery ginger beer, it's a tempest of flavors that embodies the essence of a Dark'n'Stormy.
        Sip and savor the Bermuda Breeze, a taste of the sun-soaked shores.`
    },
    "europe": {
        drink: 178325,
        display: "Europe",
        description: `This well-known drink is from Venice, Italy and it was invented in 1920. 
        Aperol Spritz was ranked as the world's ninth bestselling cocktail in 2019 by the website Drinks International!
        That's a must, don't you think?`
    },
    "north-america": {
        drink: 11007,
        display: "North America",
        description: `The Margarita, born in Mexico in 1920, is a timeless classic - a perfect blend of tequila, triple sec, and lime juice. 
        Universally adored, it's a must-have for cocktail enthusiasts worldwide. 
        Cheers to this iconic drink!`
    },
    "south-america": {
        drink: 11202,
        display: "South America",
        description: `This famous cocktail is from São Paulo, Brazil. 
        They say this drink was invented in 1918 as a cure for patients affected by Spanish flu.
        You gotta try it!`
    }
};

$(document).ready(function(){

    // CSSMap;
    $("#map-continents").CSSMap({
      "size": 1450,
      "tooltips": "floating-top-center",
      "responsive": "auto",
      "onClick": function(li) {
        var modalEl = document.querySelector('#info-modal');
        var modal = bootstrap.Modal.getOrCreateInstance(modalEl);

        modal.toggle();

        let info = dict[li[0].id];
        let drinkId = info.drink;

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
        .then(res => res.json())
        .then(data => {
            let drink = data.drinks[0];
            modalEl.querySelector(".modal-title").textContent = `${info.display} offers... ${drink.strDrink}!`;
            modalEl.querySelector(".modal-body p").textContent = info.description;
            modalEl.querySelector(".modal-body img").src = drink.strDrinkThumb;
            modalEl.querySelector(".modal-body a").href = `/src/drink/index.html?id=${info.drink}`;
        })
        
        
      }
    });
    // END OF THE CSSMap;

});