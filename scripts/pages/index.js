import Photographer from "../models/Photographer.js";

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

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
