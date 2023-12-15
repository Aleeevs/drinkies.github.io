let entry = document.querySelector("#search-input");
let grid = document.querySelector("#results-grid");

const params = new URLSearchParams(window.location.search);
const query = params.get("q");

if (query != null && query.length != 0) {
  search(query);
  entry.value = query;
}

function search(value) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
    .then((res) => res.json())
    .then(async (data) => {
      let drinks = parseFetch(data);
      grid.innerHTML = "";

      let noResult = value.length == 0 || drinks.length == 0;

      document.querySelector("#notFoundImg").hidden = !noResult;

      if (noResult)
        return;
    
      document.querySelector("#page").classList.remove("h-100");

      for (let drink of drinks) {
        let col = document.createElement("div");
        col.classList.add("col");

        let card = document.createElement("div");
        card.classList.add("card", "justify-content-center", "drink-goto", "border-0");
        card.addEventListener("click", () => {
          window.location.href = "/docs/drink/index.html?id=" + drink.id;
        });
        col.appendChild(card);

        let thumbnail = document.createElement("img");
        thumbnail.classList.add("rounded-3");
        thumbnail.src = drink.thumb;
        card.appendChild(thumbnail);

        let title = document.createElement("h3");
        title.classList.add("card-title", "p-2");
        title.textContent = drink.name;
        card.appendChild(title);

        grid.appendChild(col);
      }
    });
}

function parseFetch(data) {
  let results = [];

  if (data.drinks == null) return results;

  for (let drink of data.drinks) {
    let parsedDrink = {
      id: drink.idDrink,
      name: drink.strDrink,
      thumb: drink.strDrinkThumb
    };

    results.push(parsedDrink);
  }

  return results;
}
