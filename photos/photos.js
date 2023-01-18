const currentUrl = new URL(window.location.href);
const albumId = new URLSearchParams(currentUrl.search).get("AlbumId");

const mainSection = document.querySelector(".main-section");

const photosFetch = async () => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${albumId}/photos
        `
    ).catch((error) => {
      throw new Error(
        `An error occured while connecting to the server: ${error.message}`
      );
    });
    const data = await response.json();
    const elements = data.map((el) => createElements(el));
    mainSection.append(...elements);
  } catch (err) {
    console.error(err);
  }
};

function createElements(el) {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  const photoTitle = document.createElement("p");
  photoTitle.classList.add("photo-title");
  photoTitle.innerHTML = el.title;

  const photo = document.createElement("img");
  photo.classList.add("photo");
  photo.src = el.url;

  cardContainer.appendChild(photoTitle);
  cardContainer.appendChild(photo);
  return cardContainer;
}

photosFetch(albumId);
