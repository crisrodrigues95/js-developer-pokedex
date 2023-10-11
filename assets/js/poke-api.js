const pokeapi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon  = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name   = pokeDetail.name
    pokemon.height = pokeDetail.height/10
    pokemon.weight = pokeDetail.weight/10

    const types        = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const abilities    = pokeDetail.abilities.map((abilitieSlot) => abilitieSlot.ability.name)
    const [type]       = types
    pokemon.types      = types
    pokemon.type       = type
    pokemon.abilities  = abilities
    pokemon.photo      = pokeDetail.sprites.other.dream_world.front_default
    return pokemon
}

pokeapi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
           .then((response) => response.json())
           .then(convertPokeApiDetailToPokemon) 
}

pokeapi.getPokemons = (offset = 0, limit = 5) => {
    const url    = `http://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
           .then((response)  => response.json())
           .then((jsonBody)  => jsonBody.results)
           .then((pokemons)  => pokemons.map(pokeapi.getPokemonDetail))
           .then((detailRequests) =>Promise.all(detailRequests))
           .then((pokemonsDetails) =>(pokemonsDetails))

           .catch((error)    => console.error(error))
}

