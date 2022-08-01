const main = document.getElementById("main")
const addUserBtn = document.getElementById("add-user")
const doubleBtn = document.getElementById("double")
const showMillionairesBtn = document.getElementById("show-millionaires")
const sortBtn = document.getElementById("sort")
const calculateWealthBtn = document.getElementById("calculate-wealth")


let data = [];


getRandomUser()
getRandomUser()
getRandomUser()

// Fetch Async Await
async function getRandomUser() {
    const res = await fetch("https://randomuser.me/api")
    const data = await res.json()

    const user = data.results[0]

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
   
 addUser(newUser)
}

function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2}
    })

    updateDom()
}

function sortByRichest() {
    data.sort((a,b) => {
       return b.money - a.money
    })

    updateDom()
}

function showMillionaires() {
    data = data.filter(item => {
        return item.money >= 1000000
    })

    updateDom()
}

function calculateMoney() {
    const wealth = data.reduce((acc, user) => {
        return (acc += user.money)
    },0)

    console.log(wealth)
    const wealthEl = document.createElement("div")
    wealthEl.innerHTML = `<h3>Total Wealth: <strong> $${formatMoney(wealth)} </strong> </h3>`

    main.appendChild(wealthEl)

}
  

function addUser(obj) {
    data.push(obj)

    updateDom()
}

  function updateDom(providedData = data) {
    // Clear main div
    main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>"

    providedData.forEach(function(item) {
        const element = document.createElement("div")
        element.classList.add("person")

        element.innerHTML = `<strong>${item.name}</strong> $${formatMoney(item.money)}`

        main.appendChild(element)
    })
  }

  function formatMoney (money) {
    return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
  }


// Event Listeners
addUserBtn.addEventListener("click", getRandomUser)
doubleBtn.addEventListener("click", doubleMoney) 
sortBtn.addEventListener("click", sortByRichest)
showMillionairesBtn.addEventListener("click", showMillionaires)
calculateWealthBtn.addEventListener("click", calculateMoney)

