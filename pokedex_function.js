const mainScreen = document.querySelector('.main-screen');
const pokeName = document.querySelector('.poke-name');
const pokeID = document.querySelector('.poke-id');
const pokeNormalImage = document.querySelector('.poke-normal-image');
const pokeShinyImage = document.querySelector('.poke-shiny-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');
const pokeListItems = document.querySelectorAll('.list-item');

const TYPES = [
    'normal', 'fighting', 'flying',
    'poison', 'ground', 'rock', 'bug',
    'ghost', 'steel', 'fire', 'water',
    'grass', 'electric', 'psychic',
    'ice', 'dragon', 'dark', 'fairy'
];

const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

const resetScreen = () => {
    mainScreen.classList.remove('hide');
    for (const type of TYPES){
        mainScreen.classList.remove(type);
    }
    for(const pokeListItem of pokeListItems){
        pokeListItem.textContent = '';
    }
}

const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("searchBox");
    let pokeN = pokeNameInput.value;
    pokeN = pokeN.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeN}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            mainScreen.classList.add('hide');
            for(const pokeListItem of pokeListItems){
                pokeListItem.textContent = '';
            }
            pokeListItems[0].textContent = "Unknown";
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            resetScreen();

            const dataTypes = data['types'];
            const dataFirstType = dataTypes[0];
            const dataSecondType = dataTypes[1];
            pokeTypeOne.textContent = capitalize(dataFirstType['type']['name']);
            if(dataSecondType){
                pokeTypeTwo.classList.remove('hide');
                pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name']);
            }else{
                pokeTypeTwo.classList.add('hide');
                pokeTypeTwo.textContent = '';
            }
            //Get data for right side of screen
            mainScreen.classList.add(dataFirstType['type']['name']);
            pokeName.textContent = capitalize(data['name']);
            pokeID.textContent = '#' + data['id'].toString().padStart(3,'0');
            pokeWeight.textContent = data['weight'];
            pokeHeight.textContent = data['height'];
            
            pokeNormalImage.src = data.sprites.front_default || '';
            pokeShinyImage.src = data.sprites.front_shiny || '';

            //Get data for the left screen
            let pokeStats = data.stats;
            pokeListItems[0].textContent = "Base:";
            for(let i = 1; i < 7; i++){
                pokeListItems[i].textContent = capitalize(pokeStats[i-1].stat.name)+': '+pokeStats[i-1].base_stat;
            }
            
            let pokeMoves = data.moves.slice(0,9);
            pokeListItems[10].textContent = "Moves:";
            for(let i = 11; i < 20; i++){
                pokeListItems[i].textContent = capitalize(pokeMoves[i-11].move.name);
            }
        }
    });
}




/*const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}*/
