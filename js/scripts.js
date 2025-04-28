const cardsContainerElement = document.getElementById('cards-container');

let pokemonCards = [
    'assets/images/1.png',
    'assets/images/2.png',
    'assets/images/3.png',
    'assets/images/4.png',
    'assets/images/5.png',
    'assets/images/6.png',
    'assets/images/7.png',
    'assets/images/8.png',
    'assets/images/8.png',
    'assets/images/9.png',
    'assets/images/10.png',
    'assets/images/11.png',
    'assets/images/93.png',
    'assets/images/93.png',
    'assets/images/94.png',
    'assets/images/144.png',
    'assets/images/145.png',
    'assets/images/146.png',
    'assets/images/150.png',
    'assets/images/151.png'
];

const randompokemonCards = () => {
    let cardsIChooseYou = []
    while(cardsIChooseYou.length < 12) { //por algun motivo no me da 12
        const generateRandomPokemon = Math.floor(Math.random()*pokemonCards.length);
        const randompokemon = pokemonCards[ generateRandomPokemon]
        if(!cardsIChooseYou.includes(randompokemon)){
            cardsIChooseYou.push(randompokemon)
        }
    }
    const pairPokemon = [...cardsIChooseYou, ...cardsIChooseYou];
    pairPokemon.sort(() => Math.random() - 0.5);
     return pairPokemon;
}

const cardsTurnedOver = (event, pokemon) => {
    const cardClicked = event.target;
    const backCard = cardsContainerElement.children[0].children[0];

    if(cardClicked === backCard){
        cardBack.classList.add('')
    }
}

const CardsFront = (randompokemonCards) => {
    cardsContainerElement.textContent = ""; //padre
    const fragment = document.createDocumentFragment(); 

   pokemonCards.forEach((cardImage, iD) => {
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card");
        cardContainer.dataset.id = iD;

        //(back)
        const backCard = document.createElement("div");
        backCard.classList.add("card","back-card");
        backCard.textContent = "?";
       // backCard.addEventListener("click", () => {cardsTurnedOver(event,card)});

        // (front)
        const frontCard = document.createElement("div");
        frontCard.classList.add("card","front-card");
        frontCard.style.backgroundImage = `url(${cardImage})`;

        cardContainer.append(backCard, frontCard);
        cardsContainerElement.appendChild(cardContainer);
    });

    //fragment.append(cardsContainerElement)
};

console.log(pokemonCards);
randompokemonCards()
CardsFront();