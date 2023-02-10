const backButton = document.querySelector('.back-button');
const Doctitle = document.querySelector('title');

const API_KEY = "c1a220dd";


// To fetch the movie data from 
async function fetchMovieData() {
  // Getting the movieId from URL 
  const movieId = window.location.href.split("=")[1];

  // fetching the all the movie details from API 
  const movieData = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`);
  const data = await movieData.json();
  return data;
}

async function displayMovieData() {

  //fetching the data
  const movieData = await fetchMovieData();

  const poster = document.querySelector("#poster");
  const title = document.querySelector("#title");
  const year = document.querySelector("#year");
  const plot = document.querySelector("#plot");
  const actors = document.querySelector("#actors");
  const language = document.querySelector("#language");
  const gener = document.querySelector("#gener");
  const releasedDate = document.querySelector("#releasedDate");
  const rating = document.querySelector("#rating");

  const {Poster,Title,Genre,Year,Plot,Actors,Language,Released,imdbRating} = movieData;
  
  // Updating DOM title with movie name
  Doctitle.innerText = Title;

  // populating the data 
  poster.src = Poster === 'N/A' ? 'https://via.placeholder.com/150x225?text=Image+Not+Found' : Poster;
  title.textContent = Title;
  year.textContent = Year;
  plot.textContent = Plot;
  actors.textContent = Actors;
  language.textContent = Language;
  gener.textContent = Genre;
  rating.textContent = imdbRating;
  releasedDate.textContent = Released;
}

displayMovieData();
