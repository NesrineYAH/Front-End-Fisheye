const like = (id, number) => {
  // Récupérer et mettre à jour le compteur de likes pour une image
  const mediaLikesElement = document.getElementById(`like-${id}`);
  let mediaLikes = parseInt(mediaLikesElement.textContent, 10);
  mediaLikes += number;
  mediaLikesElement.textContent = mediaLikes;

  // Récupérer et mettre à jour le compteur total de likes
  const totalLikesElement = document.getElementById(
    "about-photographer-likes-count"
  );
  let totalLikes = parseInt(totalLikesElement.textContent, 10);
  totalLikes += number;
  totalLikesElement.textContent = totalLikes;

  // Trouver les éléments du conteneur et du cœur
  const likeContainer = document.getElementById(`likes-container-${id}`);
  const likeHeart = document.getElementById(`like-heart-${id}`);

  if (number === 1) {
    // Si on aime, changer la fonction en dislike et ajouter une classe
    likeContainer.setAttribute("onclick", `like(${id}, -1)`);
    likeHeart.classList.add("is-liked");
  } else {
    // Si on n'aime plus, changer la fonction en like et retirer la classe
    git 
    likeContainer.setAttribute("onclick", `like(${id}, 1)`);
    likeHeart.classList.remove("is-liked");
  }
};
