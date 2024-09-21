class Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this.url = url;
  }

  async get(data) {
    return fetch(this.url)
      .then((res) => res.json())
      .then((res) => eval(data))
      .catch((err) => console.log("an error occurs", err));
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
    return await this.get("res.photographers");
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
  async getMedia() {
    return await this.get("res.media");
  }
}

export { PhotographersApi, MediasApi };

/*
async function getPhotographers() {
  try {
    const requete = await fetch("./data/photographers.json", {
      method: "GET",
    });
    if (requete.ok) {
      const data = await requete.json();

      return {
        photographer: [...data.photographers],
      };
    }
  } catch (e) {
    console.log(e);
  }
}
*/
