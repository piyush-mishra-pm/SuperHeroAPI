// Trying to search for IronMan:
const BASEURL = configData.BASEURL;

const searchBar= document.getElementById('search-bar');
const outputArea = document.getElementById('search-output');
const searchFeedback = document.getElementById('search-feedback');
const template = document.getElementById('template-hero');

searchBar.addEventListener('input',searchHeroByName);

function searchHeroByName(){
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
        .then(d => renderSearchResults(d));
}

function renderSearchResults(data){
    console.log(data);
    outputArea.innerHTML='';
    if(data.response=='error'){
        searchFeedback.innerHTML='No match found';
    }else{
        data.results.forEach(result => {
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
            outputArea.appendChild(liItem);
        });
    }
}
