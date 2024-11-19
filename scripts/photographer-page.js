import { filter, filters, checkTag } from "./functions/filters.js";
import { MediasFactory } from "../factories/MediasFactory.js";
import { Photographer } from "./class/Photographer.js";
import { AboutPhotographer } from "./templates/AboutPhotographer.js";
import { MediaCard } from "./templates/MediaCard.js";
import { newValue } from "./functions/newValue.js";
import { PhotographersApi, MediasApi } from "./api/Api.js";
import { plusSlides, currentSlide } from "./functions/slider.js";
import { Lightbox } from "./templates/Lightbox.js";

// Create mediasLightbox array
let mediasLightbox = [];

// Get photographer id
let id = new URLSearchParams(window.location.search).get("id");
// define PhotographerPgaes class
class PhotographerPgaes {
  constructor() {
    // Get elements
    this.$photographerWrapper = document.querySelector("#about-photographer");
    this.$mediasWrapper = document.querySelector(
      "#photographer-all-medias-container"
    );
    this.$lightboxWrapper = document.querySelector("#modal-content");
    // Get data
    this.photographersApi = new PhotographersApi("../data/photographers.json");
    this.mediasApi = new MediasApi("../data/photographers.json");
    // Data filters functions
    this.photographer = async () => {
      const photographerData = await this.photographersApi.getPhotographers();
      photographerData.map((photographer) => new Photographer(photographer));
      const photographerDataFiltred = photographerData.find(
        (photographer) => photographer.id == id
      );
      return photographerDataFiltred;
    };
    this.media = async () => {
      const mediasData = await this.mediasApi.getMedias();
      mediasData.map((media) => new MediasFactory(media));
      const mediasDataFiltered = mediasData.filter(
        (photographer) => photographer.id == id
      );
      return mediasDataFiltered;
    };
  }
  // Render aboutPhotographer
  async aboutPhotographer() {
    const photographer = await this.photographer();
    const template = new AboutPhotographer(photographer);
    this.$photographerWrapper.appendChild(template.createAboutPhotographer());
  }
  // Render medias
  async medias() {
    let allLikes = 0;

    const photographer = await this.photographer();
    const mediasData = await this.media();

    mediasData.forEach((media) => {
      const template = new MediaCard(media, photographer);
      this.$mediasWrapper.appendChild(template.createMediaCard());
      allLikes += media.likes;
    });
    newValue("about-photographer-likes-count", allLikes);
  }
  //Fill mediasLightboxArry array (for lightbox)
  async mediasLightboxArray() {
    const mediasData = await this.media();
    mediasLightbox = mediasData.filter(
      (photographer) => photographer.photographerId === id
    );
  }
}
