const cardsContainerElement = document.getElementById('cards-container');
const pointsElement = document.getElementById('points');
const triesElement = document.getElementById('tries')
const restartButtonElement = document.getElementById('restart')

let pokemonCards = [];
let selectedCard = [];
let points = 100;
let tries = 1;

const randompokemonCards = () => {
    pokemonCards = []; 
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
    triesElement.textContent = `Tries: ${tries++}`
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
       // triesElement.textContent = `Tries: ${tries++}`
        } else{
            pointsElement.textContent = `Points:${points++}` 
        }
        selectedCard = [];
    }
}

const turnAttheBegining = () => {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        card.classList.add('flip-Card');
        setTimeout(() => {
            card.classList.remove('flip-Card');
        }, 4800);
    });
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
    setTimeout(() => {
        turnAttheBegining();
    }, 200);
};

renderCardsToPlay();

restartButtonElement.addEventListener("click", renderCardsToPlay);