const search = document.querySelector("#search");
const btn = document.querySelector("#btn");

const pokedex = document.querySelector("#pokedex");
const promises = [];
const fetchAllPokemon = async () => {
  try {
    for (let i = 1; i <= 898; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      const resp = await fetch(url);
      const data = await resp.json();
      promises.push(data);
    }

    const pokemon = Promise.all(promises).then(results => {
      const pokemon = results.map(data => ({
        name: data.name,
        id: data.id,
        image: data.sprites.front_default,
        type: data.types.map(type => type.type.name).join(", ")
      }));
      displayPokemon(pokemon);
    });

    return pokemon;
  } catch (e) {
    console.warn(e);
  }
};

const updatePokemon = async pokename => {
  try {
    const pokemon = Promise.all(promises).then(results => {
      const pokemon = results.filter(data => {
        if (data.name === pokename) {
          const pokemon = {
            name: data.name,
            id: data.id,
            image: data.sprites.front_default,
            type: data.types.map(type => type.type.name).join(", ")
          };
          displayPokemon2(pokemon);
        }
      });
    });
  } catch (e) {
    console.warn(e);
  }
};

const displayPokemon = pokemon => {
  const pokemonHTMLString = pokemon
    .map(
      pokeman =>
        `
  <li class="list">
      <img src="${pokeman.image}" alt="${pokeman.name}" />
      <h2>${pokeman.name}</h2>
  </li>
  `
    )
    .join("");

  pokedex.innerHTML = pokemonHTMLString;
};

const displayPokemon2 = async pokemon => {
  const pokemonHTMLString = `
<article class="card-container">
  <p class="name">${pokemon.name}</p>
  <img src="${pokemon.image}" alt="${pokemon.name}" />
  <p class='type'>${pokemon.type}</p>
  <div id="back" class="back-container">
    <i class="fas fa-arrow-left"></i>
  </div>
</article>
`;
  pokedex.innerHTML = pokemonHTMLString;
  const pikaname = document.querySelector(".name");
  const type = document.querySelector(".type");
  const back = document.querySelector("#back");

  if (pokemon.type === "electric") {
    type.classList.add("electric");
    pikaname.classList.add("electric");
  } else if (pokemon.type === "fire") {
    type.classList.add("fire");
    pikaname.classList.add("fire");
  } else if (pokemon.type === "water") {
    type.classList.add("water");
    pikaname.classList.add("water");
  } else if (pokemon.type === "bug") {
    type.classList.add("bug");
    pikaname.classList.add("bug");
  } else if (pokemon.type === "poison") {
    type.classList.add("poison");
    pikaname.classList.add("poison");
  }
  back.addEventListener("click", () => {
    location.reload();
  });
};

fetchAllPokemon();

search.addEventListener("keydown", e => {
  if (e.keyCode === 13) {
    updatePokemon(search.value);
  }
});

btn.addEventListener("click", () => {
  updatePokemon(search.value);
});
