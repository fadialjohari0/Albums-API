const userObject = JSON.parse(localStorage.getItem("userObject"));

const mainSection = document.querySelector(".main-section");

const albumsFetch = async () => {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  document.body.appendChild(spinner);

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userObject.id}/albums`
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
  } finally {
    document.body.removeChild(spinner);
  }
};

function createElements(data) {
  const albumTitleContainer = document.createElement("div");
  albumTitleContainer.classList.add("album-title-container");

  const albumTitle = document.createElement("p");
  albumTitle.classList.add("album-title");
  albumTitle.innerHTML = data.title;

  albumTitle.addEventListener("click", function () {
    localStorage.setItem("albumID", data.id);
    location.href = "../photos/photos.html";
  });

  albumTitleContainer.appendChild(albumTitle);
  return albumTitleContainer;
}

albumsFetch();
