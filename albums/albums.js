const userObject = JSON.parse(localStorage.getItem("userObject"));
const userID = userObject["id"];
const namee = userObject["name"];
const username = userObject["username"];
const mainSection = document.querySelector(".main-section");

const albumsFetch = async function () {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  document.body.appendChild(spinner);

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userID}/albums`
    ).catch((error) => {
      throw new Error(
        `An error occured while connecting to the server: ${error.message}`
      );
    });
    const data = await response.json();
    data.forEach((el) => createElements(el));
  } catch (err) {
    console.error(err);
  } finally {
    document.body.removeChild(spinner);
  }
};

function createElements(data) {
  const innerDiv = document.createElement("div");
  innerDiv.classList.add("innerDiv");
  const albumTitle = document.createElement("p");
  albumTitle.classList.add("albumTitle");
  albumTitle.innerHTML = data.title;

  albumTitle.addEventListener("click", function () {
    localStorage.setItem("albumID", data.id);
    location.href = "../photos/photos.html";
  });

  innerDiv.appendChild(albumTitle);
  mainSection.appendChild(innerDiv);
}

albumsFetch();
