let cardBoard = document.querySelector("#cardBoard")
let newGame = document.querySelector("#newGame")
let whoosh = document.getElementById("whoosh");
let success = document.getElementById("success");
let winSound = document.getElementById("winSound");
let youWin =  document.querySelector("#youWin")

let cardsArray

cardBoard.style.display = "none"

let selectedCards = []
let lastClicked = []
let pairs = []

//! CLICKING NEW GAME BUTTON
newGame.addEventListener("click", () => {
    youWin.classList.remove("youWin")
    selectedCards = []
    lastClicked = []
    pairs = []

    //! BEFORE ANYTHING ELSE, REMOVE ALL CONTENT FROM CARDBOARD (JUST IN CASE CLICKING MULTIPLE TIMES)
    cardBoard.innerHTML = ""
    
    //! STEP 1: MAKE THE CARDBOARD APPEAR AND APPEND IT 8 CARDS
    cardBoard.style.display = "flex"

    for (let index = 0; index < 8; index++) {
        let card = document.createElement("DIV")
        card.setAttribute("class", "card")
        card.style.height = "45%"
        card.style.width = "23%"
        cardBoard.appendChild(card)
    }

    itsTheFirstGame = false

    //! STEP 2: CREATE AN ARRAY WITH THE 4 DIFFERENT POSSIBILE CLASSES TO ADD TO CARDS (2 FROM EACH CLASS)
    let possibilities = ["card1", "card1", "card2", "card2", "card3", "card3", "card4", "card4"]

        //! STEP 3: RANDOMIZE THE ARRAY
        for (let i = possibilities.length - 1; i > 0; i--) {
            let x = Math.floor(Math.random() * (i + 1));
            [possibilities[i], possibilities[x]] = [possibilities[x], possibilities[i]];
        }

    //! STEP 4: CREATE AN ARRAY WITH ALL THE CARDS
    let cards = document.querySelectorAll(".card")
    cardsArray = [...cards]

    //! STEP 5: FOR EACH CARD IN THE ARRAY, ASSIGN AS CLASS EACH ELEMENT FROM THE RANDOMIZED CLASSES ARRAY
    cardsArray.forEach((element, i = 0) => {
        let classToAdd = possibilities[i]
        element.classList.add(classToAdd)
        i++
    });
})



//! WHEN CLICKING A CARD
cardBoard.addEventListener("click", (e) => {

    if (e.target.classList.contains("card1")){
        whoosh.play()
        e.target.classList.add("selected1")
        lastClicked.push(e.target)
        selectedCards.push(1)
    } else if (e.target.classList.contains("card2")){
        whoosh.play()
        e.target.classList.add("selected2")
        lastClicked.push(e.target)
        selectedCards.push(2)
    } else if (e.target.classList.contains("card3")){
        whoosh.play()
        e.target.classList.add("selected3")
        lastClicked.push(e.target)
        selectedCards.push(3)
    } else if (e.target.classList.contains("card4")){
        whoosh.play()
        e.target.classList.add("selected4")
        lastClicked.push(e.target)
        selectedCards.push(4)
    }

    if (selectedCards.length == 2) {
        
        let sameCards = selectedCards.every(card => card === selectedCards[0])
        
        if(!sameCards){

            setTimeout(() => {
                whoosh.play()
                lastClicked[0].classList.remove("selected1")
                lastClicked[0].classList.remove("selected2")
                lastClicked[0].classList.remove("selected3")
                lastClicked[0].classList.remove("selected4")
                lastClicked[1].classList.remove("selected1")
                lastClicked[1].classList.remove("selected2")
                lastClicked[1].classList.remove("selected3")
                lastClicked[1].classList.remove("selected4")
                lastClicked[0].classList.remove("unclickable")
                lastClicked[1].classList.remove("unclickable")
                lastClicked = []
                selectedCards = []
            }, 500)
        } else {
            success.play()
            pairs.push(lastClicked[0])
            pairs.push(lastClicked[1])
            lastClicked = []
            selectedCards = []
        }
    } else {
        lastClicked[0].classList.add("unclickable")
    }

    if (pairs.length == 8) {
        setTimeout(() => {
            cardBoard.style.display = "none"
            youWin.classList.add("youWin")
            winSound.play()
            pairs = []
        }, 800)
    }

    pairs.forEach(element => {
        element.classList.add("unclickable")
    });
})

