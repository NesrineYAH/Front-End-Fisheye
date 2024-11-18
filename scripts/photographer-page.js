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
    this.$aboutPhotographerWrapper = document.querySelector(
      "#about-photographer"
    );
    this.$mediasWrapper = document.querySelector(
      "#photographer-all-medias-container"
    );
    this.$lightboxWrapper = document.querySelector("#modal-content");
    // Get data
    this.photographersApi = new PhotographersApi("../data/photographers.json");
    this.MediasApi = new MediasApi("../data/photographers.json");
  }
}
