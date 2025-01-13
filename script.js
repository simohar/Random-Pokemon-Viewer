const fetchButton = document.getElementById('fetch-pokemon');
const pokemonImageDiv = document.getElementById('pokemon-image');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokemonTypes = document.getElementById('pokemon-types');
const pokemonAbilities = document.getElementById('pokemon-abilities');
const statsList = document.getElementById('stats-list');

function getRandomPokemonId() {
    const maxPokemonID = 1024; 
    return Math.floor(Math.random() * maxPokemonID) + 1; 
}

function fetchRandomPokemon() {
    const pokemonIdValue = getRandomPokemonId(); // Generate a random Pokémon ID
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonIdValue}/`; // Construct the API URL

    // Reset content and show loading message
    pokemonName.textContent = 'Loading...';
    pokemonId.textContent = '';
    pokemonTypes.innerHTML = '';
    pokemonAbilities.innerHTML = '';
    statsList.innerHTML = '';
    pokemonImageDiv.innerHTML = '';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(`Fetched Pokémon ID: ${pokemonIdValue}`);
            console.log(data); 
            displayPokemonData(data);
        })
        .catch(error => {
            console.error('Error fetching random Pokémon:', error);
            pokemonName.textContent = 'Error fetching data';
        });
}

// function to display Pokémon data in the UI
function displayPokemonData(data) {
    const spriteUrl = data.sprites.front_default || 'placeholder.png';
    pokemonImageDiv.innerHTML = `<img src="${spriteUrl}" alt="${data.name}">`;

    pokemonName.textContent = `Name: ${capitalizeFirstLetter(data.name)}`;

    pokemonId.textContent = `ID: ${data.id}`;

    const types = data.types.map(typeInfo => {
        const typeName = typeInfo.type.name;
        return `<span class="type-badge type-${typeName}">${capitalizeFirstLetter(typeName)}</span>`;
    }).join('');
    pokemonTypes.innerHTML = `Type(s): ${types}`;

    const abilities = data.abilities.map(abilityInfo => {
        const abilityName = abilityInfo.ability.name;
        return `<span class="ability-item">${capitalizeFirstLetter(abilityName)}</span>`;
    }).join(', ');
    pokemonAbilities.innerHTML = `Abilities: ${abilities}`;

    const stats = data.stats.map(statInfo => {
        const statName = statInfo.stat.name;
        const statValue = statInfo.base_stat;
        return `<li class="stat-item"><span class="stat-name">${capitalizeFirstLetter(statName)}</span><span class="stat-value">${statValue}</span></li>`;
    }).join('');
    statsList.innerHTML = stats;
}

fetchButton.addEventListener('click', fetchRandomPokemon);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
