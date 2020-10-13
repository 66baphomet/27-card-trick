let deck = document.querySelectorAll('.app .deck img');
let deck1 = document.querySelector('.deck1-btn');
let deck2 = document.querySelector('.deck2-btn');
let deck3 = document.querySelector('.deck3-btn');
let resultImg = document.querySelector('.result');
let message = document.querySelector('.message');

let resultArr = [];
let gameStarted = false;

    deck1.addEventListener('click', ()=>{
        if(gameStarted)
        {
            update(0);
        }
    })
    
    deck2.addEventListener('click', ()=>{
        if(gameStarted)
        {
            update(1);
        }
    })
    
    deck3.addEventListener('click', ()=>{
        if(gameStarted)
        {
            update(2);
        }
    })


let decks = 3;
let cardsInDeck = 9;

let cards52 = [
    'CLUB-1', 'CLUB-2', 'CLUB-3', 'CLUB-4', 'CLUB-5', 'CLUB-6', 'CLUB-7', 'CLUB-8', 'CLUB-9', 'CLUB-10', 'CLUB-11-JACK', 'CLUB-12-QUEEN', 'CLUB-13-KING',
    'DIAMOND-1', 'DIAMOND-2', 'DIAMOND-3', 'DIAMOND-4', 'DIAMOND-5', 'DIAMOND-6', 'DIAMOND-7', 'DIAMOND-8', 'DIAMOND-9', 'DIAMOND-10', 'DIAMOND-11-JACK', 'DIAMOND-12-QUEEN', 'DIAMOND-13-KING',
    'HEART-1', 'HEART-2', 'HEART-3', 'HEART-4', 'HEART-5', 'HEART-6', 'HEART-7', 'HEART-8', 'HEART-9', 'HEART-10', 'HEART-11-JACK', 'HEART-12-QUEEN', 'HEART-13-KING',
    'SPADE-1', 'SPADE-2', 'SPADE-3', 'SPADE-4', 'SPADE-5', 'SPADE-6', 'SPADE-7', 'SPADE-8', 'SPADE-9', 'SPADE-10', 'SPADE-11-JACK', 'SPADE-12-QUEEN', 'SPADE-13-KING',
    'JOKER-1'
];

let cards = [[], [], []];

const initialSetUp = ()=>{

    cards52.sort(()=> 0.5 - Math.random());

    let cards52Index = 0;
    
    for(let i = 0; i < decks; i++)
    {
        for(let j = 0; j < cardsInDeck; j++)
        {
            cards[i][j] = cards52[cards52Index];
            cards52Index++;
        }
    }

    UIsetup();
}

const UIsetup = ()=>{

    if(gameStarted)
    message.innerHTML = "Dealing!";

    let deckIndex = 0;

    for(let i = 0; i < decks; i++)
    {
        for(let j = 0; j < cardsInDeck; j++)
        {
            deck[deckIndex].src = 'img/BACKSIDE.jpg';
            deckIndex++;
        }
    } 

    //adding an interval between the dealings
    if(gameStarted)
    {
        setInterval(()=>{
            let deckIndex = 0;

            for(let i = 0; i < decks; i++)
            {
                for(let j = 0; j < cardsInDeck; j++)
                {
                    deck[deckIndex].src = 'img/' + cards[i][j] + '.svg';
                    deckIndex++;
                }
            } 
            if(resultArr.length < 3)
            message.innerHTML = "Choose the deck containing your card.";
        }, 2000);
    }

    //stopping backside img when result is ready 
    if(resultArr.length < 3)
    {
        resultImg.src = 'img/BACKSIDE.jpg';
    }
    else if(resultArr.length == 3){
        message.innerHTML = "Your card is found!";
    }
 
}

const update = (chosenDeck)=>{

    //setting target deck starts
    let temp;
    let targetDeck = Math.floor(Math.random() * 3 + 1) - 1;
    resultArr.push(targetDeck);


    for(let i = 0; i < cardsInDeck; i++)
    {
        temp = cards[chosenDeck][i];
        cards[chosenDeck][i] = cards[targetDeck][i];
        cards[targetDeck][i] = temp;
    }

    //setting target deck ends


    if(resultArr.length < 3)
    {
    //dealing again
    let tempArr = [[], [], []];
    let tempIndex = 0;
    let tempIndex2 = 0;

    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            tempArr[j][i] = cards[tempIndex][tempIndex2];
            tempIndex2++;
        }

        if(tempIndex2 >= 9)
        {
            tempIndex2 = 0;
            tempIndex++;
        }
    }

    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            cards[i][j] = tempArr[i][j];
        }
    }

    }
    else{
        showResult();
    }

    UIsetup();
}

const showResult = ()=>{
    gameStarted = false;
    let temp = [];
    let tempIndex = 0;

    for(let i = 0; i < decks; i++)
    {
        for(let j = 0; j < cardsInDeck; j++)
        {
            temp[tempIndex] = cards[i][j];
            tempIndex++;
        }
    }

    let resultIndex = resultArr[0] * 1 + resultArr[1] * 3 + resultArr[2] * 9;
    resultImg.src = 'img/' + temp[resultIndex] + '.svg';

}

let startBtn = document.querySelector('.start-btn');
startBtn.addEventListener('click', ()=>{
    startReset();
})

const startReset = ()=>{
    gameStarted = true;
    resultArr = [];
    cards = [[], [], []];
    resultImg.src = 'img/BACKSIDE.jpg';
    initialSetUp();
    UIsetup();

    message.innerHTML = "Choose the deck containing your card.";
}

initialSetUp();
