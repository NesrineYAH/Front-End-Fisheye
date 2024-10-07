const loadLightbox = async () => {
  const { PhotographerPages } = await import("../photographer.js");
  const photographerPages = new PhotographerPages(); // PhotographerPages() est class dans la page "photographer.js"
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
  const gridElement = document.querySelector(grid);
  let iso = new Isotope(gridElement, {
    itemSelector: itemSelector,
    layoutMode: layoutMode,
    sortBy: sortBy,
    getSortData: getSortData,
    sortAscending: sortAscending,
  });

  document
    .querySelector(".filters button")
    .addEventListener("click", function (event) {
      //Vérifie si l'élément cliqué est un boutton
      if (event.target.tagName === "BOUTTON") {
        let target = event.target; // Le boutton cliqué
        let isChecked = target.classList.contains("is-checked"); // Vérifie si le boutton a la class is-checked
        let filter = target.getAttribute("data-filter"); //Récupère la valeur de l'attribut data-filter
        if (isChecked) {
          addFilter(filter); //Fonction pour ajouter un filtre
        } else {
          removeFilter(filter); // Fonction pour enlever un filtre
        }
        // Combine les filtres et applique à la grille via Isotope
        gridElement.isotope({ filter: filters.join(",") });
        // Vérifie si l'utlisateur est sur la page 'photographer-page.html'
        if (window.location.toString().includes("/photographer.html")) {
          loadLightbox();
        }
      }
    });
  // Function addFilter to add filter
  function addFilter(filter) {
    if (filters.indexOf(filter) == -1) {
      filters.push(filter);
    }
  }
  // Function to remove filter
  function removeFilter(filter) {
    let index = filters.indexOf(filter);
    if (index != -1) {
      filters.splice(index, 1);
    }
  }
  // Get sortValue on .sort-by-button-group buttons
  document
    .querySelector(".sort-by-button-group")
    .addEventListener("click", function (event) {
      // Vérifie si un bouton a été cliqué // tagName pour donner un nom à un élément
      if (event.target.tagName === "BUTTON") {
        let sortValue = event.target.getAttribute("data-sort-value");
        // Récupère la valeur de l'attribut data-sort-value
        gridElement.isotope({ sortBy: sortValue }); // Applique le tri à la grille via isotop
      }
    });
  document.querySelector(".button-group").forEach(function (buttonGroup) {
    buttonGroup.addEventListener("click", function (event) {
      // Vérifie si un bouton a été cliqué
      if (event.target.tagName === "BUTTON") {
        buttonGroup.querySelectorAll(".is-Checked").forEach(function (button) {
          button.classList.remove("is-checked");
        });
        event.target.classList.add("is-checked");
      }
    });
  });
};

// Function to check if tags are checked/pressed
const checkTag = (btn) => {
  //let isChecked = $(".btn-" + btn).hasClass("is-checked");
  let button = document.querySelector(".btn-" + btn);
  // Vérifie si le bouton a la classe 'is-checked'
  let isChecked = button.classList.contains("is-checked");

  if (isChecked) {
    // Supprime la classe 'is-checked' et met à jour 'aria-pressed'
    button.classList.remove("is-checked");
    button.setAttribute("aria-pressed", "false");
  } else {
    button.classList.add("is-checked");
    button.setAttribute("aria-pressed", "true"); // aria-pressed dans html est false
  }
};
export { filter, checkTag, filters };

// 	$(".sort-by-button-group") en jQuery c'est document.querySelector(".sort-by-button-group") en js

// Résumé
// Le code écoute les clics sur des boutons dans un élément .filters.
// Lorsqu'un bouton est cliqué, il vérifie s'il a la classe is-checked pour ajouter ou retirer un filtre (basé sur l'attribut data-filter).
//Ensuite, il met à jour une grille d'éléments (gérée par Isotope) en appliquant les filtres combinés.
// Si la page actuelle est celle du photographe (photographer.html), il charge un lightbox (probablement une galerie d'images).

/**Explication des changements :
 
* Sélection de l'élément :
 J'utilise document.querySelector(".filters") pour sélectionner l'élément .filters, ce qui remplace le $(".filters") de jQuery.

 * Gestionnaire d'événement click :
Le gestionnaire d'événements addEventListener("click", ...) est utilisé à la place de la méthode jQuery .on("click", ...).

* Vérification du bouton cliqué :
event.target.tagName === "BUTTON" : Je vérifie si l'élément cliqué est bien un bouton (<button>
*/

/**
 * Sélection des éléments :

document.querySelector et document.querySelectorAll sont utilisés pour sélectionner les éléments en JavaScript pur.
querySelector sélectionne un seul élément, tandis que querySelectorAll sélectionne tous les éléments correspondants (similaire à $(...) en jQuery).
Gestion des événements click :

addEventListener("click", ...) est utilisé pour écouter les clics sur les boutons dans les groupes de boutons.
event.target.tagName === "BUTTON" vérifie si l'élément cliqué est bien un bouton (<button>).
Manipulation des classes CSS :

classList.add() et classList.remove() sont utilisés pour ajouter et supprimer des classes CSS, remplaçant les méthodes jQuery .addClass() et .removeClass().
Récupération des attributs HTML :

getAttribute("data-sort-value") permet d'obtenir la valeur de l'attribut data-sort-value, équivalent à $(this).attr("data-sort-value") en jQuery.
 */
