const searchInput = document.querySelector("#search-input");
const suggestionsList = document.getElementById("search-list");

//  When clicking on search box, the suggestions list will be shown accordingly
searchInput.addEventListener("keyup", showSuggestionList);

async function showSuggestionList(event) {
  // take the current value
  const searchTerm = event.target.value;

  // If it's empty then , we don't need to show any suggestions
  if (!searchTerm) {
    suggestionsList.innerHTML = "";
    return;
  }


//   Fetch the data from API to show the suggestions
  const datas = await fetch(
    `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=c1a220dd`
  );
  const data = await datas.json();

  const movies = data.Search || [];
  suggestionsList.innerHTML = "";


  movies.forEach((movie) => {
    const poster =
      movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/150x225?text=Image+Not+Found";

    let listItem = document.createElement("div");
    listItem.classList.add("search-list-item");
    listItem.id = movie.imdbID;

    const favMovies = JSON.parse(localStorage.getItem('MovieArray'));

    listItem.innerHTML = `
        <div class = "search-item-thumbnail">
           <a href ="./moviePage.html?id=${movie.imdbID}" > <img src = "${poster}"> </a>
        </div>

        <div class = "search-item-info">
        <a href ="./moviePage.html?id=${movie.imdbID}" >
            <h3>${movie.Title}</h3>
            <p>(${movie.Year})</p>
          </a>
            </div>
            
            <div class="fav-icon"> <i id="icon-${movie.imdbID}" class="${!favMovies?.includes(movie.imdbID) ?
               'fa-regular fa-star' :
             'fa-sharp fa-solid fa-star'}" onclick="addFavMovie(event)"></i> 
            
            </div>`;

        suggestionsList.appendChild(listItem);
  });

}


function addFavMovie(event){
  
  // getting the movid from the element's id
  const movId = event.target.id.split("-")[1];
  const favIcon = document.querySelector(`#icon-${movId}`);

  //  fetching the moviearray of ids from localstorage
  var favMovies = JSON.parse(localStorage.getItem('MovieArray'));

  // if array is not present, create one and add the id in it
  if(favMovies === null){
    favMovies = [];
    favMovies.push(movId);
  }else if(!favMovies.includes(movId)){
    //  if the id is not present then add it to the array and change the icon 
    favMovies = JSON.parse(localStorage.getItem('MovieArray'));
    favMovies.push(movId);

    favIcon.className = "fa-sharp fa-solid fa-star";

  }else if(favMovies.includes(movId)){
//  if the id is  present then remove it from the array and change the icon 
    let ind = favMovies.indexOf(movId);
    favMovies.splice(ind, 1);
    favIcon.className = "fa-regular fa-star";
  }


  //save the updated data in localstorage
  saveLocalData(favMovies);

}


function saveLocalData(data) {
	localStorage.setItem('MovieArray', JSON.stringify(data));
}
