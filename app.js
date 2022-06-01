function searchPokemon(searchQuery) {
  // Hide the initial prompt
  $("#initial-search-prompt").addClass("hidden");

  //   https://pokeapi.co/api/v2/pokemon/${query}
  let req = $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/${searchQuery}`,
    dataType: "json",
  });
  req.done(function (data) {
    // Hide Error message
    $("#no-data").addClass("hidden");

    const {
      id,
      name,
      sprites: { front_default },
      types,
      stats,
    } = data;

    const pokemonDataPanelClasses =
      "bg-white border-4 border-blue-400 shadow shadow-blue-300 py-2 px-4 rounded-lg ";

    // Name
    const $nameContainer = document.createElement("div");
    $($nameContainer)
      .addClass(
        pokemonDataPanelClasses + "row-span-1 row-start-1 col-span-1  rounded-lg flex items-center"
      )
      .html("<h3 class='text-lg font-bold uppercase'>" + name + "</h3>");

    // Number
    const $idContainer = document.createElement("div");
    $($idContainer)
      .addClass(pokemonDataPanelClasses + "row-span-1 row-start-1 col-span-1 flex items-center")
      .html("<h3 class='text-lg font-bold'>#" + id + "</h3>");

    // Image
    const $imageContainer = document.createElement("div");
    $($imageContainer).addClass(
      pokemonDataPanelClasses + "row-start-2 row-span-4  col-span-2  rounded-lg flex justify-center"
    ).html(`
        <img 
        src=${front_default}
        alt=${name}
        class="object-cover w-40 md:h-full md:w-auto">`);

    // Types
    const $typesContainer = document.createElement("div");
    $($typesContainer)
      .addClass(
        pokemonDataPanelClasses +
          "row-start-6 row-span-1 col-start-1 col-span-2 py-2 px-4 rounded-lg flex items-center justify-center gap-2"
      )
      .html(function () {
        const backgroundColor = {
          bug: "bg-green-500",
          dark: "bg-stone-700",
          dragon: "bg-indigo-700",
          electric: "bg-yellow-400",
          fairy: "bg-rose-400",
          fighting: "bg-red-800",
          fire: "bg-orange-500",
          flying: "bg-violet-400",
          ghost: "bg-purple-800",
          grass: "bg-emerald-600",
          ground: "bg-amber-500",
          ice: "bg-cyan-500",
          normal: "bg-stone-400",
          poison: "bg-fuchsia-700",
          psychic: "bg-pink-600",
          rock: "bg-yellow-600",
          steel: "bg-slate-400",
          water: "bg-sky-500",
        };

        return types
          .map(({ type: { name } }) => {
            return `<div class="rounded-xl text-white uppercase px-3 ${backgroundColor[name]}">${name}</div>`;
          })
          .join("");
      });

    // Stats
    const $statsContainer = document.createElement("div");
    $($statsContainer)
      .addClass(
        pokemonDataPanelClasses + "col-span-2 md:row-start-2 md:row-span-full   rounded-lg "
      )
      .html("<h4 class='text-lg font-bold mb-4'>Stats:</h4>")
      .append(function () {
        const statNameKeys = {
          hp: "HP",
          attack: "Attack",
          defense: "Defense",
          "special-attack": "Sp. Attack",
          "special-defense": "Sp. Defense",
          speed: "Speed",
        };
        const statColorClasses = {
          hp: "bg-red-400",
          attack: "bg-orange-400",
          defense: "bg-yellow-400",
          "special-attack": "bg-blue-400",
          "special-defense": "bg-green-400",
          speed: "bg-pink-400",
        };
        return stats
          .map(({ base_stat, stat: { name } }) => {
            return `
            <div class="flex items-center gap-1 py-1">
                <p class="w-2/6  font-bold">${statNameKeys[name]}</p>
                <div class="w-4/6 bg-slate-300 rounded-full h-2.5">
                    <div class="${statColorClasses[name]} h-2.5 rounded-full w-0"}"
                        style="width: ${(base_stat / 255) * 100}%; transition: "width 500ms"
                    ></div>
                </div>
            </div>
            `;
          })
          .join("");
      });

    // Add all elements to pokemon data
    $("#pokemon-data")
      .removeClass("hidden")
      .html([$nameContainer, $idContainer, $imageContainer, $typesContainer, $statsContainer]);
  });
  req.fail(function (jqXHR, textStatus) {
    // Hide Data
    $("#pokemon-data").addClass("hidden");
    // Show Error message
    $("#no-data").removeClass("hidden");
  });
}

// Search
$("#search-input input").keypress(function (event) {
  // If user press enter do search
  if (event.which === 13) {
    const searchQuery = $("#search-input input").val();
    if ($(searchQuery).val() === "") return;

    searchPokemon(searchQuery);
  }
});
$("#search-input button").on("click", function (event) {
  const searchQuery = $("#search-input input").val();
  if ($(searchQuery).val() === "") return;
  searchPokemon(searchQuery);
});

// Random
$("#random-button").on("click", function (event) {
  const searchQuery = Math.floor(Math.random() * 898) + 1;
  searchPokemon(searchQuery);
});
