const pokemonList    = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
let offset         = 0
const limit        = 5
const maxRecords   = 779



function loadPokemonItems(offset, limit){
    pokeapi.getPokemons(offset, limit).then((pokemons = [])  => {
    const newHtml = pokemons.map((pokemon) =>
    ` <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
    
                    <div class="detail">
                        <ol class="types">
                        <li class="type ttitles">Types</li>
                            ${pokemon.types.map((type) =>`<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        
                        <img src="${pokemon.photo}"
                            alt="${pokemon.name}">
                    </div>
                    <div class="detail2">
                    <ul class="abilities">
                    <li class="ability ttitles">Abilities</li>
                    ${pokemon.abilities.map((ability) =>`<li class="ability ${pokemon.type}">${ability}</li>`).join('')}
                    </ul>
                    <ul class="sizes">
                    <li class="size ttitles">Size</li>
                    <li class="size">Weight: ${pokemon.weight} kg</li>
                    <li class="size">Height: ${pokemon.height} m</li>
                    </ul>
                </div>
                </li>`
    ).join('')
    pokemonList.innerHTML +=  newHtml
    
    })

}

loadPokemonItems(offset, limit)



loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtRecords = offset + limit

    if (qtRecords >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else{

        loadPokemonItems(offset, limit)

    }
    
    
})




   
   