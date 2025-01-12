function getRandomPokemonId() {
    const maxPokemonID = 1024; // Maximum valid Pokémon ID
    return Math.floor(Math.random() * maxPokemonID) + 1; // Random ID between 1 and 1024
}

function fetchRandomPokemon() {
    const pokemonId = getRandomPokemonId(); // Generate a random Pokémon ID
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`; // Construct the API URL

    // Fetch Pokémon data
    fetch(url)
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            console.log(`Fetched Pokémon ID: ${pokemonId}`);
            console.log(data); // Display Pokémon data in the console
        })
        .catch(error => console.error('Error fetching random Pokémon:', error)); // Handle errors
}

// Call the function to fetch a random Pokémon
fetchRandomPokemon();
