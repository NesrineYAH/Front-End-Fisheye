class Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this._url = url;
    console.log(`API initialized with URL: ${this._url}`);
  }

  async get(data) {
    try {
      const response = await fetch(this._url); //console.log(`Response status: ${response.status}`);
      const data = await response.json(); //
      console.log("Data fetched successfully:", data);
      console.log(`code HTTP : ${response.status}`);

      return data;
    } catch (err) {
      throw new Error(err);
    }
  }
}

// Define PhotographersApi class with Api

class PhotographersApi extends Api {
  /**
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }
  // Get Photographers data
  async getPhotographers() {
    return await this.get("res.photographer");
  }
}

class MediasApi extends Api {
  /**
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }
  // Get Medias data
  async getMedias() {
    return await this.get("res.media");
  }
}

export { PhotographersApi, MediasApi };
