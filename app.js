function searchPokemon(e) {
  let searchQuery = $("#search-input input").val();
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

    const $pre = document.createElement("pre");
    $($pre).addClass("max-h-96 overflow-scroll");
    $($pre).text(JSON.stringify({ id, name, front_default, types, stats }, 0, 2));
    $("#data-container").append($pre);
  });
  req.fail(function (jqXHR, textStatus) {
    // Show Error message
    $("#no-data").removeClass("hidden");
  });
}

$("#search-input input").keypress(function (event) {
  // If user press enter do search
  if (event.which === 13) {
    if ($(this).val() === "") return;
    searchPokemon();
  }
});
$("#search-input button").on("click", searchPokemon);
