import { newValue } from "../functions/newValue.js";

class AboutPhotographer {
  constructor(photographer) {
    this._photographer = photographer;
  }
  createAboutPhotographer() {
    const pageTitle = document.getElementById("title");
    pageTitle.textContent = this._photographer.name + " - Fisheye";
    const callToActionModalPhotographerName = newValue(
      "call-to-action-modal-photographer-name",
      this._photographer.name
    );
    // Render Tags loop for aboutPhotographer
    let photographerTags = "";
    for (let tag of this._photographer.tags) {
      const Tags = ` <li>
                    <button role="button" type="button" class="btn btn-danger me-1 mb-1 p-1 rounded-pill photographer-card-tags tag btn-${tag}" data-bs-toggle="button" tabindex="1" autocomplete="off" onclick="checkTag('${tag}')" data-filter=".${tag}" aria-pressed="false">#${tag}</button>
                    <span class="visually-hidden">Tag ${tag}</span>
                </li>`;
      photographerTags = photographerTags + Tags;
    }
  }
}
