// Function to update attributes and contents of a element
// Pour mettre à jour l'affichage de l'element sélectionné par l'attribut id
const newValue = (id, textContent) => {
  const element = document.getElementById(id);
  element.textContent = textContent;
  return element;
};
export { newValue };
