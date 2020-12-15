const root = document.createElement('nav');
const target = document.createElement('div');
target.setAttribute('id', 'target');
root.classList.add('navbar', 'navbar-light', 'bg-light', 'd-flex', 'justify-content-center');
root.insertAdjacentHTML('afterbegin', `
<h1 class="title">Movie Fight
<span class="icon">
    <i class="fas fa-film"></i>
</span>
</h1>
<form class="container-fluid">
<div class="input-group">
  <span class="input-group-text" id="basic-addon1"><i class="fas fa-film"></i></span>
  <input type="text" class="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1">
</div>
</form>
`);
document.body.prepend(target);
document.body.prepend(root);



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
const inputBar = document.querySelector('.form-control');

const onInput = async (event) => {
    const movies = await fetchData(event.target.value);

    for (let movie of movies) {
        const div = document.createElement('div');
        div.innerHTML = `
        <img src="${movie.Poster}">
        <h1>${movie.Title}</h1>
        `

        document.querySelector('#target').appendChild(div);
    }

}
inputBar.addEventListener('input', debounce(onInput));

