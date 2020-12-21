const autoCompleteConfig = {
    renderOption(movie) {
        const srcImg = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
            <img src="${srcImg}">
            <h1>${movie.Title} (${movie.Year})</h1>
        `
    },
    inputValue(movie) {
        return movie.Title;
    },
    async fetchData(searchData) {
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                apikey: '7d7f6799',
                s: searchData
            }
        });
        if (response.data.Error) {
            return movies = [];
        }
        return response.data.Search;
    }
};

createAutoComplete({
    root: document.querySelector('#left-autocomplete'),
    ...autoCompleteConfig,
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelected(movie, document.querySelector('#left-summary'), 'left');
    },
});
createAutoComplete({
    root: document.querySelector('#right-autocomplete'),
    ...autoCompleteConfig,
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelected(movie, document.querySelector('#right-summary'), 'right');
    },
});

let leftMovie;
let rightMovie;
const onMovieSelected = async (movie, summaryElm, side) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '7d7f6799',
            i: movie.imdbID
        }
    });
    summaryElm.innerHTML = movieTemplate(response.data);

    if (side === 'left') {
        leftMovie = response.data;
    } else {
        rightMovie = response.data;
    };

    if (leftMovie && rightMovie) {
        runCompare(leftMovie, rightMovie);
    };
};

const runCompare = (leftMovie, rightMovie) => {
    console.log(leftMovie.imdbRating)
};

const movieTemplate = (movieObj) => {
    return `
    <article class="media">
    <figure class="media-left">
      <p class="image">
        <img src="${movieObj.Poster}" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <h1>${movieObj.Title}</h1>
        <h4>${movieObj.Genre}</h4>
        <p>${movieObj.Plot}</p>
      </div>
    </div>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieObj.Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieObj.BoxOffice}</p>
        <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieObj.Metascore}</p>
        <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieObj.imdbRating}</p>
        <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${movieObj.imdbVotes}</p>
        <p class="subtitle">IMDB Votes</p>
    </article>
    `
};