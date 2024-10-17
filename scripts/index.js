import { filter, checkTag } from "./functions/filters.js";
import { PhotographersApi } from "./api/Api.js";
import { Photographer } from "./class/Photographer.js";
import { PhotographerCard } from "./templates/PhotographerCard.js";

class Homepage {
  constructor() {
    // Get data
    this.photographersApi = new PhotographersApi("../data/photographers.json");
    this.$photographersListWrapper = document.getElementById(
      "#photographers-list"
    );
  }
  // Render photographer list

  async photographer() {
    try {
      const photographerData = await this.photographersApi.getPhotographers();
      console.log(photographerData); // Pour vérifier la structure des données
      // vérification après l'appel API est un tableau

      if (!Array.isArray(photographerData)) {
        console.log(
          "photographerData n'est pas un tableau :",
          photographerData
        );
        return; //Arretez l'éxécution si ce n'ai pas un tableau
      }
      photographerData
        .map((photographer) => new Photographer(photographer))
        .forEach((photographer) => {
          const template = new PhotographerCard(photographer);
          this.$photographersListWrapper.appendChild(
            template.createPhotographerCard()
          );
        });
    } catch (error) {
      console.error("Erreur lors de la récupération des photographes :", error);
    }
  }
}
// Créer une instance de Homepage
const homepage = new Homepage();

// Init filter and render phtographers list
/*filter(homepage.photographer(), ".grid", ".itemSelector", "masonry");*/

homepage.photographer().then(() => {
  filter(
    homepage.$photographersListWrapper,
    ".grid",
    ".itemSelector",
    "masonry"
  );
});

// Extend function to navigation window
window.checkTag = checkTag; // fonction dans le fichier function/ filter.js
