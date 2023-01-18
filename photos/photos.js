const userObject = JSON.parse(localStorage.getItem("userObject"));
const clickedAlbumID = localStorage.getItem("albumID");
const mainSection = document.querySelector(".main-section");

const photosFetch = async function () {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${clickedAlbumID}/photos
        `
    ).catch((error) => {
      throw new Error(
        `An error occured while connecting to the server: ${error.message}`
      );
    });
    const data = await response.json();
    data.forEach((el) => createElements(el));
    console.log(data);
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
  mainSection.appendChild(cardContainer);
}

photosFetch(userObject.id);
