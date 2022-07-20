const movieSelect = document.getElementById("movie")
const container = document.querySelector(".container")
const seats = document.querySelectorAll(".row .seat:not(.occupied)")
const count = document.getElementById("count")
const price = document.getElementById("total")

let ticketPrice = +movieSelect.value

populateUI()

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex)
    localStorage.setItem("selectedMoviePrice", moviePrice)
}

// Get data from local Storage and populate UI

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"))

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected")
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex")

    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex
    }


}

// Update Selected Count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat:not(.occupied).selected")
    
    const seatIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat)
    })

    localStorage.setItem("selectedSeats", JSON.stringify(seatIndex))

    const selectedSeatsCount = selectedSeats.length

    count.innerText = selectedSeatsCount
    price.innerText = selectedSeatsCount * ticketPrice

}

// Change Movie
movieSelect.addEventListener("change", (e) => {
    ticketPrice = e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount();
})

// Select seat event
container.addEventListener("click", (e) => {
    if(e.target.classList.contains("seat") && !e.target.classList.contains(".occupied")) {
        e.target.classList.toggle("selected")
    }

    updateSelectedCount()
})

// Inıtial count and total set
updateSelectedCount()