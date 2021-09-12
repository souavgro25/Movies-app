const Form = document.querySelector("#form");
const Movies = document.querySelector("#movies");
const Searchmovie = document.querySelector("#searchmovies");
const MOVIE_DB_API = "d8bf019d0cca372bd804735f172f67e8";
const MOVIE_DB_ENDPOINT = "https://api.themoviedb.org";
const MOVIE_DB_IMAGE_ENDPOINT = "https://image.tmdb.org/t/p/w500";
const Search = document.querySelector("#search");

Form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchMovie(Search.value);
});

function getmovies(url, render, id) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      let out = "";
      out = render(res, Searchmovie);

      id.innerHTML = out;
    })
    .catch((err) => console.log(err));
}

function generateMovieDBUrl(path) {
  const url = `${MOVIE_DB_ENDPOINT}/3${path}?api_key=${MOVIE_DB_API}`;
  return url;
}

function getTrendingMovies() {
  const url = generateMovieDBUrl("/trending/movie/day");

  getmovies(url, view, Movies);
}

function view(data, id) {
  let out = "";

  data.results.forEach((data) => {
    console.log(data);
    out += `<div onclick="getdetails('${data.id}')" class="flex  flex-col rounded-md bg-gray-900 p-1 justify-center items-center max-w-xs border border-green-500">
    <img class="w-60 h-80 rounded" src=${MOVIE_DB_IMAGE_ENDPOINT}${data.poster_path} alt="">
    <h2 style="max-width:15rem" class="text-green-500 font-bold font-serif text-xl text-center mt-2">${data.title}</h2>
    </div>`;
  });
  return out;
}
function searchMovie(query) {
  const url = generateMovieDBUrl("/search/movie") + "&query=" + query;
  // const url = generateMovieDBUrl(`/movie/${data}`);
  getmovies(url, view, Searchmovie);
  Movies.classList.add("hidden");
}

function getdetails(data) {
  console.log(data);
  sessionStorage.setItem("movie_id", data);
  window.location = "movies.html";
}

function getmovie() {
  let id = sessionStorage.getItem("movie_id");
  console.log(id);
  const url = generateMovieDBUrl(`/movie/${id}`);
  let movie = "";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      movie = `<div class="flex md:flex-row flex-col gap-y-5 rounded-md bg-gray-900 p-1 justify-between mt-5  ">
      <div style="max-height:30rem" class=" flex-1 flex  justify-center  ">
      <img class="  border border-green-500 rounded" src=${MOVIE_DB_IMAGE_ENDPOINT}${data.poster_path} alt=""></div>
     <div class="flex-1 flex flex-col gap-y-5 "> 
      <h2  class="text-green-500 font-bold font-serif md:text-5xl text-3xl mt-2">${data.title}</h2>
      <div class="bg-gray-800 md:mt-10 mt-5 flex flex-col  gap-y-4 pl-5 pt-5">

      <p class="max-w-sm text-md  font-mono font-medium text-green-500"><strong class="text-md font-mono text-gray-500">Tagline:</strong>${data.tagline}</p>
      <p class="max-w-sm text-md  font-mono font-medium text-green-500"><strong class="text-md font-mono text-gray-500">Genres:</strong>${data.genres[0].name}</p>
       <p class="max-w-sm text-md  font-mono font-medium text-green-500"><strong class="text-md font-mono text-gray-500">language:</strong>${data.original_language}</p>
        <p class="max-w-sm text-md  font-mono font-medium text-green-500"><strong class="text-md font-mono text-gray-500">Release date:</strong>${data.release_date}</p>
          <p class="max-w-sm text-md  font-mono font-medium text-green-500"><strong class="text-md font-mono text-gray-500">Popularity:</strong>${data.popularity}</p><div>

      </div>
      </div>
      <div class="bg-gray-800 pl-5 py-5"> 
        <h1 class="text-gray-500 text-xl font-mono">OverView<h1>
        <p class="text-md max-w-xl mt-2 text-green-500">${data.overview}</p>  
      </div>
      </div>`;
      document.querySelector("#Details").innerHTML = movie;
    });
  console.log(movie);
}

getTrendingMovies();
