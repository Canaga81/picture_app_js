const formWrapper = document.querySelector(".form-wrapper");
const form = document.getElementById("form");
const searchInput = document.getElementById("searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.getElementById("searchButton");
const clearButton = document.getElementById("clearButton");
const imagelistWrapper = document.querySelector(".imagelist-wrapper");

runEventListeners();

function runEventListeners() {

  searchButton.addEventListener("click", searchPhotos);
  clearButton.addEventListener("click", clearPhotos);

}

function searchPhotos(e) {

  const value = searchInput.value.trim();

  if (value === null || value === "") {
    alert("Axtariş Bölməsinə bir şeylər yazin !");
  } 
  else {
    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
      method: "GET",
      headers: {
        Authorization: "Client-ID -hVByid0GcZiaZd6zJbWCg1Mfpv1CqHgEWlgTmLIoSk",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.results.forEach((image) => {
          addImageToUI(image.urls.small);
        });
      })
      .catch((err) => console.log(err));
  }

  searchInput.value = "";

  e.preventDefault();

}

function clearPhotos(e) {

  e.preventDefault();
  Array.from(imagelistWrapper.children).forEach((child) => child.remove());

}

function addImageToUI(url) {

  // <div>
  //    <img src="" alt="">
  // </div>

  const div = document.createElement("div");
  div.className = "card";

  const img = document.createElement("img");
  img.setAttribute("src", url);
  img.className = "card-image";

  div.appendChild(img);
  imagelistWrapper.appendChild(div);

}