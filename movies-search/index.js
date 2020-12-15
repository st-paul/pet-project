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
`<div class="container">
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

    for (let movie of movies) {
        const option = document.createElement('a');
        option.classList.add('dropdown-item');
        option.insertAdjacentHTML('afterbegin', `
            <img src="${movie.Poster}"/>
            <h1>${movie.Title}</h1>
        `);
        resultsWrapper.appendChild(option);
    }

}
input.addEventListener('input', debounce(onInput));

