const search = document.querySelector("#search");
const btn = document.querySelector("#btn");
const $powerOff = document.querySelector("#power-off");
const screenOff = document.querySelector(".power-off");
const $screenOff1 = document.querySelector("#screen-off-1");
const $screenOff2 = document.querySelector("#screen-off-2");
const $alert = document.querySelector(".alert");
const $closeAlert = document.querySelector(".close-alert");
const $music = document.querySelector("#music");
const $theme = document.querySelector("#theme");
const $easterEgg = document.querySelector("#easter-egg");
const $themeEasterEgg = document.querySelector("#theme-easter-egg");

const pokedex = document.querySelector("#pokedex");
const promises = [];
const fetchAllPokemon = async () => {
  try {
    for (let i = 1; i <= 500; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      const resp = await fetch(url);
      const data = await resp.json();
      promises.push(data);
    }

    const pokemon = Promise.all(promises).then((results) => {
      const pokemon = results.map((data) => ({
        name: data.name,
        id: data.id,
        image: data.sprites.front_default,
        type: data.types[0].type.name,
      }));
      displayPokemon(pokemon);
    });

    return pokemon;
  } catch (e) {
    console.warn(e);
  }
};

const fetchPokemonById = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const resp = await fetch(url);
  const data = await resp.json();
  const pokemon = {
    name: data.name,
    id: data.id,
    image: data.sprites.front_default,
    type: data.types[0].type.name,
  };
  displayPokemon2(pokemon);
};

const updatePokemon = async (pokename) => {
  try {
    pokename = pokename.toLowerCase();
    if (pokename === "jordan" || pokename === "regio") {
      fetchPokemonById(143);
      easterEggAlert();
    } else if (pokename === "chuy") {
      fetchPokemonById(84);
      easterEggAlert();
    } else if (pokename === "apaparawe" || pokename === "montoya") {
      fetchPokemonById(155);
      easterEggAlert();
    } else if (pokename === "chemas" || pokename === "pizza") {
      fetchPokemonById(337);
      easterEggAlert();
    } else if (pokename === "apaparablack" || pokename === "carlos") {
      fetchPokemonById(67);
      easterEggAlert();
    } else if (pokename === "aldo" || pokename === "nigga") {
      fetchPokemonById(50);
      easterEggAlert();
    } else if (pokename === "alcantara" || pokename === "joto") {
      fetchPokemonById(39);
      easterEggAlert();
    } else if (
      pokename === "pablo" ||
      pokename === "marihuano" ||
      pokename === "marihuas"
    ) {
      fetchPokemonById(109);
      easterEggAlert();
    } else if (pokename === "wicho") {
      fetchPokemonById(129);
      easterEggAlert();
    } else if (pokename === "keila") {
      fetchPokemonById(471);
      easterEggAlert();
    }
    const pokemon = Promise.all(promises).then((results) => {
      const pokemon = results.filter((data) => {
        if (data.name === pokename) {
          const pokemon = {
            name: data.name,
            id: data.id,
            image: data.sprites.front_default,
            type: data.types[0].type.name,
          };
          displayPokemon2(pokemon);
        }
      });
    });
  } catch (e) {
    console.warn(e);
  }
};

const displayPokemon = (pokemon) => {
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) =>
        `
  <li class="list">
  <p class="name">${pokeman.id}</p>
      <img src="${pokeman.image}" alt="${pokeman.name}" />
      <h2>${pokeman.name}</h2>
  </li>
  `
    )
    .join("");

  pokedex.innerHTML = pokemonHTMLString;
};

const displayPokemon2 = async (pokemon) => {
  const pokemonHTMLString = `
<article class="card-container">
  <p class="name">${pokemon.name}</p>
  <span>${pokemon.id}</span>
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
  } else if (pokemon.type === "normal") {
    type.classList.add("normal");
    pikaname.classList.add("normal");
  } else if (pokemon.type === "poison") {
    type.classList.add("poison");
    pikaname.classList.add("poison");
  }
  back.addEventListener("click", () => {
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    h2.textContent = "Loading...";
    div.append(h2);
    div.classList.add("loading-container");
    pokedex.append(div);
    fetchAllPokemon();
    search.value = "";
  });
};

fetchAllPokemon();

search.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    updatePokemon(search.value);
  }
});

btn.addEventListener("click", () => {
  updatePokemon(search.value);
});

$closeAlert.addEventListener("click", () => {
  $alert.classList.add("hide-alert");
  $alert.classList.remove("show-alert");
});

let powerOff = true;
let music = false;
$powerOff.addEventListener("click", () => {
  if (!powerOff) {
    screenOff.classList.add("screen-hidden");
    screenOff.classList.remove("screen-visible");
    $screenOff1.classList.remove("on");
    $screenOff2.classList.remove("on");

    $screenOff1.classList.add("off");
    $screenOff2.classList.add("off");
    $theme.pause();
    music = false;
    powerOff = true;
  } else {
    screenOff.classList.add("screen-visible");
    screenOff.classList.remove("screen-hidden");
    $screenOff1.classList.remove("off");
    $screenOff2.classList.remove("off");
    $screenOff1.classList.add("on");
    $screenOff2.classList.add("on");
    $theme.play();
    music = true;
    powerOff = false;
  }
});

$music.addEventListener("click", () => {
  if (powerOff) {
    return;
  } else {
    if (music) {
      $theme.pause();
      music = false;
    } else {
      $theme.play();
      music = true;
    }
  }
});

setTimeout(() => {
  $alert.classList.remove("hide-alert");
  $alert.classList.add("show-alert");
}, 5000);

const easterEggAlert = () => {
  $theme.pause();
  $themeEasterEgg.play();
  $easterEgg.classList.remove("easter-hidden");
  $easterEgg.classList.add("easter-visible");
  setTimeout(() => {
    $easterEgg.classList.remove("easter-visible");
    $easterEgg.classList.add("easter-hidden");
    $theme.play();
  }, 3000);
};
