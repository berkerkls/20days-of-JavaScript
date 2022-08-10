const search = document.getElementById("search"),
    submit = document.getElementById("submit"),
    random = document.getElementById("random"),
    resultEl = document.getElementById("result-heading"),
    mealsEl = document.getElementById("meals"),
    singleMeal= document.getElementById("single-meal") 



// Get single meal by ID
function getMealbyID(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0]

        addMealtoDOM(meal)
    })
}

// Get random meal
function getRandomMeal() {

    // Clear the page
    resultEl.innerHTML = ""
    mealsEl.innerHTML = ""


    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then( data => {
        
        const meal = data.meals[0]

        addMealtoDOM(meal)
    })
}

function addMealtoDOM(meal) {
    const ingredients = []

    for(let i = 1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
            break
        }
    }


    singleMeal.innerHTML = `
    <div class= "single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt= "${meal.strMeal}"> 
        <div class= "single-meal-info">
            ${meal.strCategory ? `<p> ${meal.strCategory}` : ""}
            ${meal.strArea ? `<p> ${meal.strArea}` : ""}
        </div>
        <div class= "main">
            <p> ${meal.strInstructions}</p>
            <h2> Ingredients </h2>
            <ul>
            ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
            </ul>
        </div>   
    </div>
    
    
    `
}



function searchMeal(e) {
    // Clear the result heading
    singleMeal.innerHTML = ""

    // Get the search word
    const searchedMeal = search.value

    // Check empty
    if(searchedMeal.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedMeal}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            resultEl.innerHTML = `<h2> Search results for '${searchedMeal}':`

            if(data.meals === null ) {
                resultEl.innerHTML = `<h2> No results found for ${searchedMeal}`
            } else  {
                mealsEl.innerHTML = data.meals.map(meal => 
                    `<div class= "meal"> 
                      <img src="${meal.strMealThumb}" alt= "${meal.strMeal}" />   
                      <div class="meal-info" data-mealID="${meal.idMeal}"> 
                        <h3>${meal.strMeal}</h3>
                      </div>                   
                    </div>
                    
                    `)
                .join("")
            }
        })

        // Clear search val
        search.value = ""
    }else {
        alert("You should submit a meal.")
    }

    e.preventDefault()
}


// Event Listeners
submit.addEventListener("submit", searchMeal)
random.addEventListener("click", getRandomMeal)

mealsEl.addEventListener("click", (e) => {
    const mealInfo = e.path.find(item => {
        if(item.classList) {
            return item.classList.contains("meal-info")
        } else {
           return false 
        }
    })
    
    if(mealInfo) {
        const mealID = mealInfo.getAttribute("data-mealid")

        getMealbyID(mealID)
    }
})