// Trying to search for IronMan:
const BASEURL = 'https://www.superheroapi.com/api.php/4918875844839870/';

const searchBar= document.getElementById('search-bar');
const outputArea = document.getElementById('search-output');
const searchFeedback = document.getElementById('search-feedback');

searchBar.addEventListener('input',searchHero);

function searchHero(){
    const heroString = searchBar.value;
    if (heroString.length==0){
        searchFeedback.innerHTML = 'Type something to get started!';
    }
    else if(heroString.length == 1) {
        searchFeedback.innerHTML = 'Need atleast 2 characters!';
        return;
    }

    const url = BASEURL +'search/' + heroString;
    fetch(url)
        .then(data => data.json())
        .then(d => renderTotal(d));
}

function renderTotal(data){
    console.log(data);
    outputArea.innerHTML='';
    if(data.response=='error'){
        searchFeedback.innerHTML='No match found';
    }else{
        data.results.forEach(result => {
            outputArea.innerHTML += `<li class="hero-item">${result.name}</li>`;
        });
    }
}
