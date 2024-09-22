import { PhotographersApi } from "./api/api.js";
import { Photographer } from "./class/photographer.js";

class Homepage {
  constructor() {
    // Get data
    this.photographersApi = new PhotographersApi(
      "../../data/photographers.json"
    );
  }
}
