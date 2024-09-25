import { PhotographersApi } from "./api/api.js";
import { Photographer } from "./class/photographer.js";

class Homepage {
  constructor() {
    // Get data
    this.photographersApi = new PhotographersApi(
      "../../data/photographers.json"
    );
    this.$photographersListWrapper =
      document.querySelector("#photographer-list");
  }
  // Render photographer list

  async photographer() {
    const photographerData = await this.photographersApi.getPhotographers();

    photographerData
      .map((photographer) => new Photographer(photographer))
      .forEach((photographer) => {
        const template = new PhotographerCard(photographer);
        this.$photographersListWrapper.appendChild(
          template.createPhotographerCard()
        );
      });
  }
}
//
const homepage = new Homepage();

// Init filter and render phtographers list
filter(homepage.photographer(), ".grid", ".itemSelector", "masonry"); //???

// Extend function to navigation window
window.checkTag = checkTag; // fonction dans le fichier function/ filter.js
