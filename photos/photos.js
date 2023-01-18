const userObject = JSON.parse(localStorage.getItem("userObject"));
const userID = userObject["id"];
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
  const innerDiv = document.createElement("div");
  innerDiv.classList.add("innerDiv");

  const photoTitle = document.createElement("p");
  photoTitle.classList.add("photoTitle");
  photoTitle.innerHTML = el.title;

  const photo = document.createElement("img");
  photo.classList.add("photo");
  photo.src = el.url;

  innerDiv.appendChild(photoTitle);
  innerDiv.appendChild(photo);
  mainSection.appendChild(innerDiv);
}

photosFetch(userID);
