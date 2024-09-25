const loadLightbox = async () => {
  const { PhotographerPages } = await import("../photographer-page.js");
  const photographerPages = new PhotographerPages();

  photographerPages.lightbox();
};

let filters = [];
// Filter async function



const filtre = `
<section class="filtre-box">
  <label for="filter">Trier par :</label>
  <button class="data_btn" aria-label="filtre" >
  <label for="data-select" class="data-select select-icon"> 
    <p class="value">Popularité</p>
   <i class="fa-solid fa-angle-down"></i>
  </label>
  </button>
  <div class="custom-select">
    <button class="custom-select-option select-icon" data-value="Popularité" aria-label="filtre par Popularité">Popularité <i class="fa-solid fa-chevron-up"></i></button>
    <button class="custom-select-option" data-value="Date" aria-label=" filtre par Date">Date</button>
    <button class="custom-select-option" data-value="Titre" aria-label="filtre par Titre">Titre</button>
  </div>
</section>
`;

document
  .querySelector(".photograph-header")
  .insertAdjacentHTML("afterend", filtre);
