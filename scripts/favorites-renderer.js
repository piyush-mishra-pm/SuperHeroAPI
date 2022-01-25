const BASEURL = configData.BASEURL;
const template = document.getElementById('template-hero');

//If favorites screen, then show favorites, else skip this script:
const favoritesDisplayContainer = document.getElementById(
    'favorites-display-container'
); // This should only be present in favorites.html:
console.log(favoritesDisplayContainer);
if (favoritesDisplayContainer) {
    favorites.forEach(favoriteHeroId => searchHeroByID(favoriteHeroId));
}

let favoritesSet = new Set();
function searchHeroByID(heroId) {
    const heroString = heroId;
    const url = BASEURL + heroString;
    fetch(url)
        .then(data => data.json())
        .then(d=> populateFavoritesSet(d))
        .then(d => renderFavorites(favoritesSet));
}

function populateFavoritesSet(d){
    if (d.response != 'error') {
        favoritesSet.add(d);
    }
}

function renderFavorites(set) {
    console.log(set);
    favoritesDisplayContainer.innerHTML = '';
    if (set.response == 'error') {
        searchFeedback.innerHTML = 'Error occurred while fetching hero!';
    } else {
        set.forEach( result=>{
            // Clone the template code for list item:
            const liItem = template.content.cloneNode(true);

            // Set the heroId:
            liItem.querySelector('li').dataset.heroId = result.id;

            // Set the image:
            const imgItem = liItem.querySelector('li .hero-img');
            imgItem.src = `${result.image.url}`;

            // Set the name:
            const nameItem = liItem.querySelector('li .hero-name');
            nameItem.textContent = `${result.name}`;

            // Append to DOM
            favoritesDisplayContainer.appendChild(liItem);
        });
    }
}
