const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const refresh = document.getElementById("refresh");

const random = Math.floor(Math.random() * 499) + 1;
const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${random}`;

getMovies(APIURL);

refresh.addEventListener("click", () => {
  getMovies(APIURL);
  location.reload();
});

async function getMovies(url) {
  try {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);

    showMovies(respData.results);
    return respData;
  } catch (error) {
    console.log("Error:", error);
  }
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, id } = movie;

    if (!poster_path) {
      return;
    }

    const movieElem = document.createElement("div");
    movieElem.classList.add("movie");

    movieElem.innerHTML = `
      <a href="movie-details.html?id=${id}">
        <img src="${IMGPATH + poster_path}" alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
      </a>
    `;

    main.appendChild(movieElem);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
  } else {
    getMovies(APIURL);
  }

  console.log(searchTerm);
});


function getClassByRate(vote) {
  if (vote >= 8) return "green";
  else if (vote >= 5) return "orange";
  else return "red";
}
