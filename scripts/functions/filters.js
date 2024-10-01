const loadLightbox = async () => {
  const { PhotographerPages } = await import("../photographer-page.js");
  const photographerPages = new PhotographerPages();

  photographerPages.lightbox();
};

let filters = [];
// Filter async function

const filter = async (
  waitForFunction,
  grid,
  itemSelector,
  layoutMode,
  sortBy,
  getSortdata,
  sortAscending
) => {
  await waitForFunction; //une promesse ou une fonction asynchrone que l'on attend avant de continuer l'exécution de la suite de la fonction.

  let $grid = $(grid).isotope({
    itemSelector: itemSelector,
    layoutMode: layoutMode,
    sortBy: sortBy, /// Tri selon le nom des éléments (si tu as défini getSortData)
    getSortdata: getSortdata,
    sortAscending: sortAscending,
  });
};

//Version uniquement avec JS sans jQuery
// Sélectionne l'élément avec JavaScript pur (au lieu de $(grid) avec jQuery)
/*
let gridElement = document.querySelector(grid);

let iso = new Isotope(gridElement, {
  itemSelector: itemSelector,
  layoutMode: layoutMode,
  sortBy: sortBy,
  getSortData: getSortData,
  sortAscending: sortAscending,
});*/

// If .filters buttons isChecked = add filters
$(".filters").on("click", "button", function (event) {
  let $target = $(event.currentTarget);
  let isChecked = $target.hasClass("is-checked");
  let filter = $target.attr("data-filter");
  if (isChecked) {
    addFilter(filter);
  } else {
    removeFilter(filter);
  }
  // group filters together, inclusive
  $grid.isotope({ filter: filters.join(",") });

  // loadLightbox on photographer-page
  if (window.location.toString().includes("/photographer-page.html")) {
    loadLightbox();
  }
});
//////////////// Version javaScript
document.querySelector(".filters").addEventListener("click", function (event) {
  //Vérifie si l'élément cliqué est un boutton
  if (event.target.tagName === "BOUTTON") {
    let target = event.target; // Le boutton cliqué
    let isChecked = target.classList.contains("is-checked"); // Vérifie si le boutton a la class is-checked
    let filter = target.getAttribute("data-filter"); //Récupère la valeur de l'attribut data-filter

    //Ajoute ou enlève le filtre selon la classe is-checked

    if (isChecked) {
      addFilter(filter); //Fonction pour ajouter un filtre
    } else {
      removeFilter(filter); // Fonction pour enlever un filtre
    }
    // Combine les filtres et applique à la grille via Isotope
    $grid.isotope({ filter: filters.join(",") }); /// ????
  }
});
