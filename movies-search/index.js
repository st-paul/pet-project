const fetchData = async (searchData) => {
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


const rootHeader = document.createElement('section');

rootHeader.classList.add('hero', 'is-primary', 'is-bold');

rootHeader.insertAdjacentHTML('afterbegin', `
<div class="hero-body">
<div class="container">
  <h1 class="title">
    Movie Fight
    <span class="icon">
      <i class="fas fa-film"></i>
    </span>
  </h1>
</div>
</div>
`);

document.body.prepend(rootHeader);
rootHeader.insertAdjacentHTML('afterend', 
`<div class="container" id="mainSection">
    <div class="autocomplete">
        <label><b>Search For a Movie</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    </div>
</div>`);


const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');


const onInput = async (event) => {
    const movies = await fetchData(event.target.value);

    dropdown.classList.add('is-active');

    resultsWrapper.innerHTML = '';

    if (movies.length === 0) {
        dropdown.classList.remove('is-active');
        return;
    }
    for (let movie of movies) {
        const option = document.createElement('a');
        const srcImg = movie.Poster === 'N/A' ? '' : movie.Poster;

        option.classList.add('dropdown-item');
        option.insertAdjacentHTML('afterbegin', `
            <img src="${srcImg}"/>
            <h1>${movie.Title}</h1>
        `);

        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
            onMovieSelected(movie);
        });

        resultsWrapper.appendChild(option);
    }

}
input.addEventListener('input', debounce(onInput));

document.addEventListener('click', (event) => {
    if (!rootHeader.contains(event.target)) {
       dropdown.classList.remove('is-active');
    }
})

const onMovieSelected = async (movie) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '7d7f6799',
            i: movie.imdbID
        }
    });
    movieTemplate(response.data);
}

const movieTemplate = (movieObj) => {
    const summary = document.querySelector('#mainSection');
    summary.insertAdjacentHTML('beforeend', `
        <div id="summary">
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
        </div>
    `);
}