const titleInput = document.getElementById("titleInput");
const imdbInput = document.getElementById("imdbIdInput");
const titleSearchButton = document.getElementById("titleSearchButton");
const imdbSearchButton = document.getElementById("imdbSearchButton");
const results = document.getElementById("results");

//set the API key and URL

const API_BASE_URL = "https://www.omdbapi.com";
const API_KEY = "99bcb000";

//function to create and display movie information

function displayMovie() {
    results.innerHTML = "";// clears previous results

    //contain movie container
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    //add movie poster
    const moviePoster = document.createElement("img");
    moviePoster.src = movie.poster !== "N/A" ? movie.Poster : "placeholder.jpg";
    moviePoster.alt = movie.Title;
    movieDiv.appendChild(moviePoster);

    //Add movie details
    const movieDetails = document.CreateElement("div");
    movieDetails.classList.add("movie-details");

    const title = document.createElement("h3");
    title.textContent = movie.title;
    movieDetails.appendChild(title);

    const genre = document.createElement("p");
    genre.textContent = `Genre:${movie.Genre}`;
    movieDetails.appendChild(genre);

    const plot = document.createElement("p");
    plot.textContent = `Plot:${movie.plot}`;
    movieDetails.appendChild(plot);

    movieDiv.appendChild(movieDetails);
    results.appendChild(movieDiv);

}


//Function handle errors

function displayError(message) {
    results.innerHTML = `<p class="error">${message}</p>`;
}

// function to fetch and display movie by Title

async function fetchMovieByTitle() {
    const title = title.Input.value.trim();
    if (!title) {
        displayError("Please enter a title.")
        return;
    } try {
        const response = await fetch(`${API_BASE_URL}?t=${title}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === "True") {
            displayMovie(data);
        } else {
            displayError(data.Error);
        }
    }
    catch (error) {
        displayError("Failed to fetch data.Please try again later")
    }
}

//Function to fetch and display movie by IMDB ID
async function fetchMovieByImdbId() {
    const imdbId = imdbInput.value.trim();
    if (!imdbId) {
        displayError("please enter an IMDB ID");
        return;
    }


    try {
        const response = await fetch(`${API_BASE_URL}?i=${imdbId}&{API_KEY}`);
        const data = await response.json();

        if (data.response === "True") {
            displayMovie(data);

        } else {
            displayError(data.Error)
        }

    } catch (error) {
        displayError("Failed to fetch data.please try again later")
    }
}

//Event listeners for search buttons
titleSearchButton.addEventListener("click", fetchMovieByTitle);
imdbSearchButton.addEventListener("click", fetchMovieByImdbId)