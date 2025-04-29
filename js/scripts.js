const cardsContainerElement = document.getElementById('cards-container');

let pokemonCards = [];
let selectedCard = [];
//let lockBoard = false

const randompokemonCards = () => {
    while(pokemonCards.length < 6) {
        const generateRandomPokemon = Math.floor(Math.random()*151)+ 1; // no Genera 0 segun yo
        const randompokemon = `${generateRandomPokemon}`
        if(!pokemonCards.includes(randompokemon)){
            pokemonCards.push(randompokemon)
        }
    }
    const pairPokemon = [...pokemonCards, ...pokemonCards];
    pairPokemon.sort(() => Math.random() - 0.5);
     return pairPokemon;
}

const cardIChooseYou = (event) => {
    const cardclicked  = event.target;
    cardclicked.classList.add('flip-Card');
    selectedCard.push(cardclicked); 
   // console.log(selectedCard)
   if (selectedCard.length === 2) {
    compareCard();
}
}

const compareCard = () => {
    if(selectedCard.length === 2){     
        const firstCard = selectedCard[0];
        const secondCard = selectedCard[1];

        const firstFrontCard = firstCard.querySelector('.front-card');
        const secondFrontCard = secondCard.querySelector('.front-card');
        
        const firstPokemonImage = firstFrontCard.style.getPropertyValue('--pokemon-picture');
        const secondPokemonImage = secondFrontCard.style.getPropertyValue('--pokemon-picture');

        if (firstPokemonImage !== secondPokemonImage) {
            setTimeout(() => {
                firstCard.classList.remove('flip-Card');
                secondCard.classList.remove('flip-Card');
            }, 1000);
        }
        selectedCard = [];
    }
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
renderCardsToPlay();