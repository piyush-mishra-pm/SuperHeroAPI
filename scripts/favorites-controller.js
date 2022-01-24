let favorites = new Set();

function addToFavorites(heroId){
    console.log('Adding to fav: '+heroId);
    favorites.add(heroId);
    saveFavorites();
}
function removeFromFavorites(heroId){
    console.log('Removing from fav: ' + heroId);
    favorites.delete(heroId);
    saveFavorites();
}

const getArtistDataByID = artistId => {
    const foundIndex = artistsJSONdata.findIndex(artistData => {
        return artistData.artistId == artistId;
    });
    return artistsJSONdata[foundIndex];
};

const modifyFavorites = e => {
    
    // Clicked ADD:
    if (e.target.closest('.btn-add')){
        const heroId = e.target.closest('.hero-item').dataset.heroId;
        addToFavorites(heroId);
    }
    // Clicked REMOVE:
    else if (e.target.closest('.btn-remove')) {
        const heroId = e.target.closest('.hero-item').dataset.heroId;
        removeFromFavorites(heroId);
    }
};

// Default artist:
document.querySelectorAll('.favorites-listener')?.forEach(favoritesListener => {
    favoritesListener.addEventListener('click', modifyFavorites);
});

loadFavorites();