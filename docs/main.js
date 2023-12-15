let btn = document.querySelector("#info-space .btn")
btn.addEventListener('click', () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {
        window.location.href = "/docs/drink?id=" + data.drinks[0].idDrink;
    })
});

const creatorChoices = [ 12316, 178325, 17196, 12674, 11243, 17204, 178344, 178367, 178307 ]

let creatorGrid = document.querySelector("#creator-grid");
for (let id of creatorChoices)
    insertDrinkInCreator(id);

function insertDrinkInCreator(id) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => {
        let drink = data.drinks[0];

        let col = document.createElement("div");
        col.classList.add("col");

        let card = document.createElement("div");
        card.classList.add("card", "justify-content-center", "drink-goto", "border-0");
        card.addEventListener("click", () => {
          window.location.href = "/docs/drink?id=" + drink.idDrink;
        });
        col.appendChild(card);

        let thumbnail = document.createElement("img");
        thumbnail.classList.add("rounded-3");
        thumbnail.src = drink.strDrinkThumb;
        card.appendChild(thumbnail);

        let title = document.createElement("h3");
        title.classList.add("card-title", "p-2");
        title.textContent = drink.strDrink;
        card.appendChild(title);

        creatorGrid.appendChild(col);
    });
}