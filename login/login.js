const emailElement = document.querySelector("#email");
const userError = document.querySelector("#error");

const login = async () => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users`
    ).catch((error) => {
      throw new Error(
        `An error occured while connecting to the server: ${error.message}`
      );
    });
    const data = await response.json();

    const verifiedEmail = data.find((el) => el.email === emailElement.value);

    if (verifiedEmail !== undefined) {
      localStorage.setItem("userObject", JSON.stringify(verifiedEmail));
      location.href = "../albums/albums.html";
    } else {
      throw new Error(`Something went wrong! Email is incorrect or not found!`);
    }
  } catch (err) {
    displayError(err.message);
    console.error(err);
  }
};

function displayError(err) {
  const errorElement = document.createElement("p");
  errorElement.innerHTML = err;
  userError.appendChild(errorElement);
}

function submitButton() {
  login();
}
