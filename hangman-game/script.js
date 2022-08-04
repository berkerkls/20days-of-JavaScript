const wordEl = document.getElementById("word")
const wrongLettersEl = document.getElementById("wrong-letters")
const playAgainBtn = document.getElementById("play-button")
const popup = document.getElementById("popup-container")
const notification = document.getElementById("notification-container")
const finalMessage = document.getElementById("final-message")

const figurePart = document.querySelectorAll(".figure-part")

;


let selectedWord = words[Math.floor(Math.random() * words.length)]


console.log(selectedWord)


const correctLetters = [];
const wrongLetters = [];

function displayWords() {
    wordEl.innerHTML = `
    ${selectedWord.split('').map(letter => `<span class= "letter"> ${correctLetters.includes(letter) ? letter : ""}</span>`).join('')
    }
    `

    const innerWord = wordEl.innerText.replace(/\n/g,"")

    if(innerWord === selectedWord) {
        finalMessage.innerHTML = "Congratulations You WON!"
        popup.style.display="flex"
    }
}
// Update Wrong Letters Function
function updateWrongLettersEl() {
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? `<p>Wrong</p>`: ""}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)} 
    `
   figurePart.forEach((part,index) => {
        const error = wrongLetters.length

        if(index < error) {
            part.style.display= "block"
        } else {
            part.style.display = "none"
        }
   }) 

    // check if lost
    if(wrongLetters.length === figurePart.length) {
        finalMessage.innerHTML = "Unfortunately You Lost :("
        popup.style.display = "flex"
    }
}

// Show Notification function

function showNotification() {
    notification.classList.add("show")

    setTimeout(() => {
        notification.classList.remove("show")
    },2000)
}

// Keydown Event Listener
window.addEventListener("keydown", (e) => {
    if(e.keyCode >= 60 && e.keyCode <= 90) {
        const letter = e.key

        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter)

                displayWords()
            } else {
                showNotification()
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter)

                updateWrongLettersEl()
            } else {
                showNotification()
            }
        }
    }
})

// Restart the game and play again
playAgainBtn.addEventListener("click", () => {
    // empty arrays
    correctLetters.splice(0)
    wrongLetters.splice(0)


  
    selectedWord = words[Math.floor(Math.random() * words.length)]

    displayWords();

    updateWrongLettersEl();

    popup.style.display = "none"
})

displayWords()