const loadLightbox = async () => {
  const PhotographerPagesModule = await import("../photographer-page.js");
  const photographerPages = new PhotographerPagesModule.PhotographerPages();
  photographerPages.lightbox();
};

// Créer un tableau de filtres
let filters = [];

// Fonction asynchrone pour le filtrage
const filter = async (
  waitForFunction,
  grid,
  itemSelector,
  layoutMode,
  sortBy,
  getSortData,
  sortAscending
) => {
  await waitForFunction;

  const gridElement = document.querySelector(grid);
  let iso = new Isotope(gridElement, {
    itemSelector: itemSelector,
    layoutMode: layoutMode,
    sortBy: sortBy,
    getSortData: getSortData,
    sortAscending: sortAscending,
  });

  // Gestion des filtres avec boutons .filters
  document.querySelectorAll(".filters button").forEach((button) => {
    button.addEventListener("click", function (event) {
      const target = event.currentTarget;
      const isChecked = target.classList.contains("is-checked");
      const filterValue = target.getAttribute("data-filter");

      if (isChecked) {
        addFilter(filterValue);
      } else {
        removeFilter(filterValue);
      }

      // Grouper les filtres
      iso.arrange({ filter: filters.length ? filters.join(",") : "*" });

      // Charger Lightbox si la page est "/photographer-page.html"
      if (window.location.pathname.includes("/photographer-page.html")) {
        loadLightbox();
      }
    });
  });

  // Fonction pour ajouter un filtre
  function addFilter(filter) {
    if (!filters.includes(filter)) {
      filters.push(filter);
    }
  }

  // Fonction pour retirer un filtre
  function removeFilter(filter) {
    const index = filters.indexOf(filter);
    if (index !== -1) {
      filters.splice(index, 1);
    }
  }

  // Gestion du tri via les boutons .sort-by-button-group
  document
    .querySelectorAll(".sort-by-button-group button")
    .forEach((button) => {
      button.addEventListener("click", function () {
        const sortValue = button.getAttribute("data-sort-value");
        iso.arrange({ sortBy: sortValue });
      });
    });

  // Gestion de la classe is-checked pour les boutons .button-group
  document.querySelectorAll(".button-group").forEach((buttonGroup) => {
    buttonGroup.addEventListener("click", function (event) {
      const button = event.target.closest("button");
      if (button) {
        buttonGroup.querySelector(".is-checked").classList.remove("is-checked");
        button.classList.add("is-checked");
      }
    });
  });
};

// Fonction pour vérifier si un bouton de tag est actif
const checkTag = (btn) => {
  const button = document.querySelector(".btn-" + btn);
  const isChecked = button.classList.contains("is-checked");

  if (isChecked) {
    button.classList.remove("is-checked");
    button.setAttribute("aria-pressed", "false");
  } else {
    button.classList.add("is-checked");
    button.setAttribute("aria-pressed", "true");
  }
};

export { filter, checkTag, filters };
