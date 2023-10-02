const global = {
  currentPage: window.location.pathname,
};

//Highlight active nav link
function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}
//Init app
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;
    case "/shows.html":
      displayPopularShows();
      break;
    case "/movie-details.html":
      console.log("Moviw Details");
      break;
    case "/tv-details.html":
      console.log("Tv Details");
      break;
    case "/search.html":
      console.log("Search");
      break;
  }

  highlightActiveLink();
}

//Display home page popular movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  results.forEach((movie) => {
    const outerElement = document.createElement("div");
    outerElement.className = "card";
    outerElement.innerHTML = `
                <a href="movie-details.html?id=${movie.id}">
                ${
                  movie.poster_path
                    ? `<img
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    class="card-img-top"
                    alt="${movie.title}"
                    />`
                    : `<img
                    src="images/no-image.jpg"
                    class="card-img-top"
                    alt="${movie.title}"
                />`
                }
                
                </a>
                <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                    <small class="text-muted">Release: ${movie.release_date}</small>
                </p>
                </div>`;
    document.querySelector("#popular-movies").appendChild(outerElement);
  });
}

//Display popular tv shows
async function displayPopularShows() {
  const { results } = await fetchAPIData("tv/popular");
  results.forEach((show) => {
    const outerElement = document.createElement("div");
    outerElement.className = "card";
    outerElement.innerHTML = `
                <a href="tv-details.html?id=${show.id}">
                    ${
                      show.poster_path
                        ? `<img
                        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                        class="card-img-top"
                        alt="${show.title}"
                        />`
                        : `<img
                        src="images/no-image.jpg"
                        class="card-img-top"
                        alt="${show.name}"
                    />`
                    }
                </a>
                <div class="card-body">
                    <h5 class="card-title">${show.name}</h5>
                    <p class="card-text">
                    <small class="text-muted">Aired: ${show.first_air_date}</small>
                    </p>
                </div>`;

    document.querySelector("#popular-shows").appendChild(outerElement);
  });
}

//Fetch Data from TMDB API
async function fetchAPIData(endpoint) {
  //Register your API and generate API key in https://developer.themoviedb.org/
  const API_KEY = "5d18089844659dfcdd919cbe2062944d";
  const API_URL = "https://api.themoviedb.org/3/";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      //Authorization: `Bearer ${API_KEY}`,
    },
  };
  showSpinner();
  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US&with_original_language=ta`, options);
  const data = await response.json();
  hideSpinner();
  return data;
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

document.addEventListener("DOMContentLoaded", init);
