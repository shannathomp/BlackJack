//create variables for deck and player
//create a shuffle deck
//create functions that want to run
//create styling for site
//Get card images

const hitin = document.getElementById('hit');
const dealerSumn = document.getElementById('dealer-sum')
const results = document.getElementById('results')
const stayin = document.getElementById('stay');
const imghidden = document.getElementById('hidden');
const dealercards = document.getElementById("dealer-cards");
const playercards = document.getElementById("your-cards");
const yourSumn =  document.getElementById('your-sum');
const refreshbtn = document.querySelector('#refresh')
let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0; 

let hidden;
let deck;

let canHit = true; //allows the player to draw while yourSum <= 21

window.onload = () => {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
        }
    }
    // console.log(deck);
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); 
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSum);
    while (dealerSum < 17) {
        //<img src="./cards/4-C.png">
        let cardImg = document.createElement("img");
        let card = deck.pop(); //pushes card into deck
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
       dealercards.append(cardImg)
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card); 
       playercards.append(cardImg)
    }

    console.log(yourSum);

   
    hitin.addEventListener('mouseover',hit)
    stayin.addEventListener('mouseover',stay)
    

}

function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    playercards.append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) { //A, J, 8 -> 1 + 10 + 8
        canHit = false;
    }

}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    imghidden.src = "./cards/" + hidden + ".png";

    let message = "";
    if (yourSum > 21) {
        message = "You Lose!"; 
    
    }
    else if (dealerSum > 21) {
        message = "You win!";
    }
    //both you and dealer <= 21
    else if (yourSum == dealerSum) {
        message = "Tie!";
    }
    else if (yourSum > dealerSum) {
        message = "Winner Winner Chciken Dinner!";   
    }
    else if (yourSum < dealerSum) {
        message = "So Sad You Lost!";
    }
 

    dealerSumn.innerText = dealerSum;
    yourSumn.innerText = yourSum;
   results.innerText = message;
}


function refreshMe(){
    console.log(refreshMe);
   

}

function getValue(card) {
    let data = card.split("-"); // "4-C" -> ["4", "C"]
    let value = data[0];

    if (isNaN(value)) { //A J Q K
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

console.log(refreshbtn);

refreshbtn.addEventListener('mouseover', function(){
   window.location.reload(true);
    
})




// console.log(`running script`);

// const clickMe = document.getElementById('cl1')
// const container = document.querySelector('.container')
// const comdeck = document.querySelector('#comdeck')
// const computercard = document.getElementById('comcard-slot')
// const playerdeck = document.getElementById('pdeck')
// const playercardslot = document.getElementById('pcard-slot')
// const startbutton = document.querySelector('#start')
// const resetbtn = document.querySelector('#reset')
// const player = document.querySelector('#player-sum')
// const computer = document.getElementById('dealer-sum')
// const cardImg = ('./images/.png')
// let deck;
// let hidden;
// let dealerSum = 0;
// let playerSum = 0;
// let dealerAceCount = 0;
// let yourAceCount = 0;
// let canHit = true;
// // let checkAce;
// // const deck = new Deck;



// // let resultsContainer = document.getElementById('results');
// // let cardsRemaining = document.getElementById('cardsRemaining');
// // let player1cards, player2cards, pairsPlayer, pairsComp, player, cardToMatchValue;
// // let statusBlock = document.querySelector('.statusBlock')




// window.onload = function(){
//     getDeck()
//     shuffleDeck()
//     startGame()
//     checkAce()
// }

// function getDeck()
// {
//     //card arrays
//    const suits = ["spades", "diamonds", "clubs", "hearts"];
// const values = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"]; 
// deck =[];
	
// // let deck = new Array();

// 	for(let i = 0; i < suits.length; i++)
// 	{
// 		for(let x = 0; x < values.length; x++)
// 		{
// 			// let deck = {Value: values[x], Suit: suits[i]};
// 			deck.push(values[x] + '_of_' + suits[i]);
// 		}
// 	}
   
// 	// console.log(deck);
// }

// function shuffleDeck(){
//     for(let i = 0; i< deck.length; i++){
//         let x = Math.floor(Math.random() * deck.length);
//     let shuff = deck[i];
//     deck[i] = deck[x];
//     deck[x] = shuff;
//     }
//     // console.log(deck);    
    
// }

// function startGame() {
//     hidden = deck.pop();
//     dealerSum += getValue(hidden);
//     dealerAceCount += checkAce(hidden);
//     console.log(hidden);
//     console.log(dealerSum);
//     while (dealerSum < 21) {
//         //<img src="./cards/4-C.png">
//         let cardImg = document.createElement("img");
//         let card = deck.pop();
//         cardImg.src = `./images/${card}.png`
//         dealerSum += getValue(card);
//         dealerAceCount += checkAce(card);
//         document.getElementById("computerCards").append(cardImg);
//     }
//     startbutton.addEventListener('click',shuffleDeck) 
//     // console.log(dealerSum);
// // console.log(computer);

// for(let i =0; i <=2; i++){
//     let cardImg = document.createElement("img");
//         let card = deck.pop();
//         cardImg.src = `./images/${card}.png`
//         playerSum += getValue(card);
//         yourAceCount += checkAce(card);
//         document.getElementById("player1Cards").append(cardImg);
// }
// }
// // console.log(player);


// // console.log(hidden);
// // console.log(computer);



// function getValue(card) {
//     let data = card.split("-"); 
//     let value = data[0];

//     if (isNaN(value)) { 
//         if (value == "A") {
//             return 11;
//         }
//         return 10;
//     }
//     return parseInt(value);
// }

// function clickMe2(){
// console.log('clicked');
// }
// function checkAce(card) {
//     if (card[0] === "A") {
//         return 1;
//     }else{
//     return 0;    
//     }
    
// }
// function hit() {
//     if (!canHit) {
//         return;
//     }

//     let cardImg = document.createElement("img");
//     let card = deck.pop();
//     cardImg.src = "./cards/" + card + ".png";
//     yourSum += getValue(card);
//     yourAceCount += checkAce(card);
//     document.getElementById("your-cards").append(cardImg);

//     if (reduceAce(yourSum, yourAceCount) > 21) { //A, J, 8 -> 1 + 10 + 8
//         canHit = false;
//     }

// }

// class Deck{
//     constructor(){
//       this.deck = [] 
//     }
// }
// class Card{
//   constructor(suit, value){
//      this.suit = suit
// this.value = value    
//   }

//   createDeck(suits, values){
//       for(let suit of suits){
//           for(let value of values)
// {
//     this.deck.push(new Card(suit, value))
// }      }
//       return this.deck
//       }
//   }
//   let decks =  new Deck();
//   decks.createDeck(suits, values);
//   console.log(decks);
 
// }
//    console.log(Deck.Card)

   


// function start(){
// console.log('Let\'s begin');
// }

// function reset(){
//     reset()
// }

// let suits = ['H','C','S','D']
// let cardnum = ['2','3','4','5','6','7','8','9','T','J','Q','K','A']
// const randomcards = Math.floor(Math.random()) * cardnum.length+52
// const suitcard = Math.floor(Math.random()) * suits.length +4
// let cardsuit = suits.cardnum
// const idx = randomcards[suits]
// console.log(idx);
// // console.log(startbutton);
// // console.log(resetbtn);
// console.log(randomcards)


// // for(let i=2; i<cardnum.length; i++){
// //     console.log(randomcards);
// // }




// // console.log(startbutton);