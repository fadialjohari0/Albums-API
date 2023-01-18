const emailElement = document.querySelector("#email");
const userError = document.querySelector("#error");

const login = async function () {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users`
    ).catch((error) => {
      throw new Error(
        `An error occured while connecting to the server: ${error.message}`
      );
    });
    const data = await response.json();

    const verifyEmail = data.find((el) => el.email === emailElement.value);

    if (verifyEmail !== undefined) {
      localStorage.setItem("userObject", JSON.stringify(verifyEmail));
      location.href = "../albums/albums.html";
    } else {
      throw new Error(`Something went wrong! Email is incorrect or not found!`);
    }
  } catch (err) {
    displayError(err.message);
    console.error(err);
  }
};

function submitButton() {
  login();
}

function displayError(err) {
  const errorElement = document.createElement("p");
  errorElement.innerHTML = err;
  userError.appendChild(errorElement);
}
