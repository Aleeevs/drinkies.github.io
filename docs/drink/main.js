var popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});

let search = window.location.search;
const params = new URLSearchParams(search);
const id = params.get("id");

const currentSuggestions = [];
let drink = null;

fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
  .then((res) => res.json())
  .then(async (data) => {
    console.log(data);

    let results = parseFetch(data);

    if (results.length == 0) {
      let notFoundImg = document.querySelector("#notFoundImg");
      let page = document.querySelector("#page");
      notFoundImg.hidden = false;
      page.hidden = true;
      return;
    }

    drink = results[0];
    console.log(drink);

    document.title = drink.name;

    let title = document.querySelector(".title h1");
    title.textContent = drink.name;

    if (drink.dateModified != null) {
      let date = document.querySelector(".subtitle p");
      let dateTime = new Date(Date.parse(drink.dateModified));

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      date.textContent = `${dateTime.getDate()} ${
        months[dateTime.getMonth()]
      } ${dateTime.getFullYear()}`;
    } else {
      let subtitle = document.querySelector(".subtitle");
      subtitle.hidden = true;
    }

    let videoButton = document.querySelector("#video-button");
    if (drink.video != null && drink.video.length != 0) {
      videoButton.hidden = false;
      videoButton.href = drink.video;
    }

    let photo = document.querySelector("#photo");
    photo.src = drink.thumb;

    if (drink.imageSource != null || drink.imageAttribution != null) {
      let credits = document.querySelector("#img-credits");
      credits.hidden = false;

      if (drink.imageSource == null) {
        credits.textContent = `Picture by ${drink.imageAttribution}`;
      } else {
        let reference = document.createElement("a");
        reference.href = drink.imageSource;

        if (drink.imageAttribution == null) {
          credits.textContent = "Picture from ";
          let link = drink.imageSource.split("/")[2];

          reference.text = link;
        } else {
          credits.textContent = "Picture by ";
          reference.text = drink.imageAttribution.split(" ")[0];
        }

        credits.appendChild(reference);
      }
    }

    let ul = document.querySelector("#page > ul");

    let otherTags = [
      { name: "alcoholic", value: drink.alcoholic },
      { name: "glass", value: drink.glass },
      { name: "category", value: drink.category },
      {
        name: "ingredients",
        value: `${drink.ingredients.length}`,
        extra: ` ingredient${drink.ingredients.length == 1 ? "" : "s"}`,
      },
    ];

    for (let tag of otherTags) {
      let tagDiv = document.createElement("li");
      tagDiv.classList.add("badge", "bg-color-" + tag.name);
      tagDiv.textContent = tag.value + (tag.extra == null ? "" : tag.extra);
      ul.appendChild(tagDiv);
      ul.append("\n");

      let span = document.querySelector(".info." + tag.name);
      span.textContent = tag.value;
    }

    for (let tag of drink.tags) {
      let tagDiv = document.createElement("li");
      tagDiv.classList.add("badge", "bg-color-generic-tag");
      tagDiv.textContent = tag;
      ul.appendChild(tagDiv);
      ul.append("\n");
    }

    let ingredients = document.querySelector("#ingredients");
    for (let i in drink.ingredients) {
      let value =
        (drink.measures[i] ?? "").trim() + " " + drink.ingredients[i].trim();

      let input = document.createElement("input");
      input.type = "checkbox";
      input.id = "ingredient-" + i;
      ingredients.appendChild(input);

      let label = document.createElement("label");
      label.htmlFor = input.id;
      label.textContent = value;

      let li = document.createElement("li");
      li.appendChild(input);
      li.appendChild(label);
      ingredients.appendChild(li);
    }

    let instructions = document.querySelector("#instructions");
    for (var instruction of drink.instructions.split(/(?<=[.])/g)) {
      let li = document.createElement("li");
      li.textContent = instruction.trim();
      instructions.appendChild(li);
    }

    findRelated();
  });

function parseFetch(data) {
  let results = [];

  if (data.drinks == null) return results;

  console.log(data);

  for (let drink of data.drinks) {
    let parsedDrink = {
      id: drink.idDrink,
      name: drink.strDrink,
      video: drink.strVideo,
      category: drink.strCategory,
      iba: drink.strIBA,
      alcoholic: drink.strAlcoholic,
      glass: drink.strGlass,
      instructions: drink.strInstructions,
      thumb: drink.strDrinkThumb,
      imageSource: drink.strImageSource,
      imageAttribution: drink.strImageAttribution,
      dateModified: drink.dateModified,
      tags: [],
      ingredients: [],
      measures: [],
    };

    for (let i = 1; i < 16; i++) {
      let ingredient = drink["strIngredient" + i];
      if (ingredient == null) break;

      if (ingredient.length == 0) continue;

      parsedDrink.ingredients.push(ingredient);
      parsedDrink.measures.push(drink["strMeasure" + i]);
    }

    if (drink.strTags != null)
      for (let tag of drink.strTags.split(",")) parsedDrink.tags.push(tag);

    results.push(parsedDrink);
  }

  return results;
}

function copyShare() {
  navigator.clipboard.writeText(window.location.href);
}

function randOf(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function findRelated() {
  for (let i = 0; i < 2; i++) {
    let ingredient = randOf(drink.ingredients);
    fetchRandomDrink(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`, {
      common: ingredient,
      commonType: "ingredient",
      commonTypeDisplay: "Ingredient"
    });
  }

  if (Math.random() > 0.5)
    fetchRandomDrink(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${drink.glass.replaceAll(" ", "_")}`, {
      common: drink.glass,
      commonType: "glass",
      commonTypeDisplay: "Glass"
    });
  else 
    fetchRandomDrink(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drink.category.replaceAll(" ", "_")}`, {
      common: drink.category,
      commonType: "category",
      commonTypeDisplay: "Category"
    });
}

function fetchRandomDrink(url, suggestionDetail) {
  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    if (data.drinks == null || data.drinks.length == 0)
      return;

    let i = 0;
    let random = null;
    do {
      random = randOf(data.drinks);
      if (i++ > 5)
        return;
    }
    while (currentSuggestions.includes(random.idDrink) || drink.id == random.idDrink);

    appendSuggestion({
      drink: {
        id: random.idDrink,
        name: random.strDrink,
        thumb: random.strDrinkThumb
      },
      common: suggestionDetail.common,
      commonType: suggestionDetail.commonType,
      commonTypeDisplay: suggestionDetail.commonTypeDisplay
    })
  });
} 

function appendSuggestion(suggestion) {
  let drink = suggestion.drink;
  currentSuggestions.push(drink.id);

  let suggestions = document.querySelector("#suggestions");

  let li = document.createElement("li");
  li.classList.add("drink-goto")
  suggestions.appendChild(li);

  let img = document.createElement("img");
  img.src = drink.thumb + "/preview";
  li.appendChild(img);

  let body = document.createElement("div");
  li.appendChild(body);

  let section = document.createElement("section");
  section.classList.add("my-auto");
  body.appendChild(section);

  let label = document.createElement("label");
  label.textContent = suggestion.commonTypeDisplay + ": ";
  section.appendChild(label);

  section.append(" ");

  let badge = document.createElement("div");
  badge.classList.add("badge", "bg-color-" + suggestion.commonType);
  badge.textContent = suggestion.common;
  section.appendChild(badge);

  let h4 = document.createElement("h4");
  h4.textContent = drink.name;
  h4.classList.add("link");
  body.appendChild(h4);

  li.addEventListener('click', () => {
    window.location.href = "/docs/drink?id=" + drink.id;
  });
}
