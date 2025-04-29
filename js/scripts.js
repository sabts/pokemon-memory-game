const cardsContainerElement = document.getElementById('cards-container');

let pokemonCards = [];

const randompokemonCards = () => {
    while(pokemonCards.length < 6) {
        const generateRandomPokemon = Math.floor(Math.random()*152);
        const randompokemon = `assets/images/${generateRandomPokemon}.png`
        if(!pokemonCards.includes(randompokemon)){
            pokemonCards.push(randompokemon)
        }
    }
    const pairPokemon = [...pokemonCards, ...pokemonCards];
    pairPokemon.sort(() => Math.random() - 0.5);
     return pairPokemon;
}

const cardIChooseYou = (event, pokemon) => {
    const cardClicked = event.target;
    const card = cardsContainerElement.children[0];
    const cardBack = cardsContainerElement.children[0].children[0];
    const CardsFront = cardsContainerElement.children[0].nextSibling

    if(cardClicked === card){
        card.classList.add('flip-Card')
        cardBack.classList.remove('back-card')
    }
}

const CardsFront = () => {
    cardsContainerElement.textContent = ""; //padre
    const fragment = document.createDocumentFragment(); 
    const pokemon = randompokemonCards()
    ;
    pokemon.forEach((cardImage) => {
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card");

        cardContainer.addEventListener("click", (event) => {
            cardIChooseYou(event, cardContainer);
        });

        //(back)
        const backCard = document.createElement("div");
        backCard.classList.add("card","back-card");
        //backCard.textContent = "?";

        // (front)
        const frontCard = document.createElement("div");
        frontCard.classList.add("card","front-card");
        frontCard.style.setProperty("--pokemon-picture:", `url(${cardImage})`);

        cardContainer.append(backCard, frontCard);
        fragment.append(cardContainer);
    });
    cardsContainerElement.append(fragment)
};

console.log(pokemonCards);
randompokemonCards()
CardsFront();