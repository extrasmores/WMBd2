const moviesWrapper = document.querySelector(".movies");

moviesWrapper.classList += " movies__loading";
moviesWrapper.classList.remove("movies__loading");


async function renderMovies(filter) {
  event.preventDefault();
  const searchInput = document.querySelector("#searchInput");
  const query = searchInput.value;

  moviesWrapper.classList.add("movies__loading");
  await timeout(1000);

  const movies = await fetch(
    `https://www.omdbapi.com/?apikey=1f280777&s=${query}`
  );
  const moviesData = await movies.json();
  const moviesArray = moviesData.Search;

  if (filter === "NEW_TO_OLD") {
    moviesArray.sort((a, b) => b.Year - a.Year);
  } else if (filter === "OLD_TO_NEW") {
    moviesArray.sort((a, b) => a.Year - b.Year);
  }

    moviesWrapper.innerHTML = moviesArray
      .map((movie) => getMovieHTML(movie))
      .join("");
    moviesWrapper.classList.remove("movies__loading");
}

function filterMovies(event) {
  renderMovies(event.target.value);
}


function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getMovieHTML(movie) {
  return `<div class="movie">
         <figure class="movie__img--wrapper">
       <img
         class="movie__img"
         src="${movie.Poster}"
         alt=""
       />
        </figure>
        <div class="movie__title">${movie.Title}</div>
       <div class="movie__year"> ${movie.Year}
         </div>           
     </div>`;
}
