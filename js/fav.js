const API_URL = "http://www.omdbapi.com/?apikey=c1a220dd";

const favMovieList = document.querySelector(".movie-container");

// Calling this function once my webpage is loaded to get the ids from localstorage and then fetch it's details from API

function loadFavHomePage() {
  movieArr = JSON.parse(localStorage.getItem("MovieArray"));

  // IF no data present in localstorage then show alert
  if (!movieArr || movieArr && movieArr.length === 0) {
    alert("No Favorites movies added");
    window.history.back();
    return;
  }

  // if Data is present then fetch it and create movie element for the movies
  movieArr.forEach(async function (ele) {
    //fetch the data from API
    const res = await fetch(`${API_URL}&i=${ele}`);
    const data = await res.json();

    //create movie element
    createMovieElement(data);
  });
}

loadFavHomePage();

// Create DOM element for movies
function createMovieElement(movie) {
  const movieElement = document.createElement("div");
  movieElement.classList.add("card", movie.imdbID);

  movieElement.innerHTML = ` <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
  <img  src="${
    movie.Poster === "N/A"
      ? "https://via.placeholder.com/150x225?text=Image+Not+Found"
      : movie.Poster
  }" 
  class="img-fluid" />
</div>

<div class="card-body">
  <h5 class="card-title"><strong>${movie.Title}</strong></h5>

  <a href="moviePage.html?id=${movie.imdbID}"> <button type="button" class="btn btn-primary">Details</button> </a>
 <button type="button" class="btn btn-primary ${movie.imdbID}"  onclick="deleteFavMovies(event)">Remove</button> 
</div> `;

  favMovieList.appendChild(movieElement);
}

// when clicked on delete button, it will delete the data from localstorage and also remove it from DOM
function deleteFavMovies(event) {
  let tragetId = event.target.classList[2];

  favMovies = JSON.parse(localStorage.getItem("MovieArray"));
  if (favMovies === null) {
    return;
  } else if (favMovies.includes(tragetId)) {
    let ind = favMovies.indexOf(tragetId);
    favMovies.splice(ind, 1);
  }

  saveLocalData(favMovies);
  // delete from DOM
  let elementToDel = document.querySelector(`.${tragetId}`);
  elementToDel.remove();

  if(favMovies.length === 0){
    location.reload();
  }
}

// to save data in localstorage
function saveLocalData(data) {
  localStorage.setItem("MovieArray", JSON.stringify(data));
}
