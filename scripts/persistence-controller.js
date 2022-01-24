const KEY = 'FAV_SuperHeroAPI'
function saveFavorites() {
    window.localStorage.setItem(KEY ,JSON.stringify(Array.from(favorites)));
    console.log(window.localStorage.getItem(KEY));
    console.log('SAVE-done');
    printFavorites();
}
function loadFavorites(){
    const loadedData = JSON.parse(window.localStorage.getItem(KEY));
    if(!loadedData) favorites = new Set();
    else loadedData.forEach(heroId => favorites.add(heroId));
    
    console.log('LOAD-done');
    printFavorites();
}


function printFavorites(){
    console.log('Logging Current Favorites:')
    favorites.forEach(f => console.log(f));
}