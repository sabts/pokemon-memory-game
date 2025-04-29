const cardsContainerElement = document.getElementById('cards-container');

let pokemonCards = [];

const randompokemonCards = () => {
    while(pokemonCards.length < 6) {
        const generateRandomPokemon = Math.floor(Math.random()*152);
        const randompokemon = `${generateRandomPokemon}`
        if(!pokemonCards.includes(randompokemon)){
            pokemonCards.push(randompokemon)
        }
    }
    const pairPokemon = [...pokemonCards, ...pokemonCards];
    pairPokemon.sort(() => Math.random() - 0.5);
     return pairPokemon;
}

const cardIChooseYou = (event, pokemon) => {
    const cardclicked  = event.target;
    cardclicked.classList.add('flip-Card');
    
}

const renderCardsToPlay = () => {
    cardsContainerElement.textContent = ""; //padre
    const fragment = document.createDocumentFragment(); 
    const pokemon = randompokemonCards()
    ;
    pokemon.forEach((cardImage) => {
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card");

        cardContainer.addEventListener("click", cardIChooseYou);

        //(back)
        const backCard = document.createElement("div");
        backCard.classList.add("card","back-card");

        // (front)
        const frontCard = document.createElement("div");
        frontCard.classList.add("card","front-card");
        frontCard.style.setProperty('--pokemon-picture', `url(../assets/images/${cardImage}.png)`);

        cardContainer.append(backCard, frontCard);
        fragment.append(cardContainer);
    });
    cardsContainerElement.append(fragment)
};

console.log(pokemonCards);
randompokemonCards()
renderCardsToPlay();