// Select DOM elements
const titleInput = document.getElementById("titleInput");
const imdbIdInput = document.getElementById("imdbIdInput");
const titleSearchButton = document.getElementById("titleSearchButton");
const imdbSearchButton = document.getElementById("imdbSearchButton");
const results = document.getElementById("results");

// Base URL for the OMDB API
const API_BASE_URL = "https://www.omdbapi.com/";
const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key

// Function to create and display movie information
function displayMovie(movie) {
    results.innerHTML = ""; // Clear previous results

    // Create the movie container
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    // Add movie poster
    const moviePoster = document.createElement("img");
    moviePoster.src = movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg";
    moviePoster.alt = movie.Title;
    movieDiv.appendChild(moviePoster);

    // Add movie details
    const movieDetails = document.createElement("div");
    movieDetails.classList.add("movie-details");

    const title = document.createElement("h3");
    title.textContent = movie.Title;
    movieDetails.appendChild(title);

    const year = document.createElement("p");
    year.textContent = `Year: ${movie.Year}`;
    movieDetails.appendChild(year);

    const genre = document.createElement("p");
    genre.textContent = `Genre: ${movie.Genre}`;
    movieDetails.appendChild(genre);

    const plot = document.createElement("p");
    plot.textContent = `Plot: ${movie.Plot}`;
    movieDetails.appendChild(plot);

    movieDiv.appendChild(movieDetails);
    results.appendChild(movieDiv);
}

// Function to handle errors
function displayError(message) {
    results.innerHTML = `<p class="error">${message}</p>`;
}

// Function to fetch and display movie by title
async function fetchMovieByTitle() {
    const title = titleInput.value.trim();
    if (!title) {
        displayError("Please enter a title.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}?t=${title}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === "True") {
            displayMovie(data);
        } else {
            displayError(data.Error);
        }
    } catch (error) {
        displayError("Failed to fetch data. Please try again later.");
    }
}

// Function to fetch and display movie by IMDb ID
async function fetchMovieByImdbId() {
    const imdbId = imdbIdInput.value.trim();
    if (!imdbId) {
        displayError("Please enter an IMDb ID.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}?i=${imdbId}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === "True") {
            displayMovie(data);
        } else {
            displayError(data.Error);
        }
    } catch (error) {
        displayError("Failed to fetch data. Please try again later.");
    }
}

// Event listeners for search buttons
titleSearchButton.addEventListener("click", fetchMovieByTitle);
imdbSearchButton.addEventListener("click", fetchMovieByImdbId);
