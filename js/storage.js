const FAVORITES_KEY = "weatherFavorites";

function getFavorites() {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

function saveFavorite(city) {
    const favorites = getFavorites();

    if (!favorites.some(favorite => favorite.toLowerCase() === city.toLowerCase())) {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites, city]));
    }
}

function removeFavorite(city) {
    const favorites = getFavorites().filter(favorite => favorite.toLowerCase() !== city.toLowerCase());
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function isFavorite(city) {
    return getFavorites().some(favorite => favorite.toLowerCase() === city.toLowerCase());
}
