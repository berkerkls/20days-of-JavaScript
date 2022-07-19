/**
 checkRequired([username,email,password,password2])
    checkLenght(username, 3, 15)
    checkLenght(password, 6, 15)
    checkEmail(email)
    checkPasswordMatch(password, password2) 
 */


const form = document.getElementById("form")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const password2 = document.getElementById("password2")


// Show Error
function showError(input, message) {
    const formValidator = input.parentElement
    formValidator.className = "form-validator error"
    const small = formValidator.querySelector("small")
    small.innerText = message
}

// Show Success
function showSuccess(input) {
    const formValidator = input.parentElement
    formValidator.className = "form-validator success"
}

// Check if it is required
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if(input.value.trim() === "") {
            showError(input, `${getCapitalized(input)} is required`)
        }
    })
}

// getCapitalized 
function getCapitalized(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Check Length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getCapitalized(input)} must be higher than ${min} character`)
    } else {
        showSuccess(input)
    }
}
// Check Email
function checkEmail(input) {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(re.test(input.value.trim())){
        showSuccess(input)
    } else {
        showError(input, "Email is not valid")
    }
}

// Check Password Match
function checkPasswordMatch(input, input2) {
    if(input.value !== input2.value) {
        showError(input2, "Passwords do not match")
    }
}
 
// Event listener
form.addEventListener("submit", (e) => {
    e.preventDefault()
    checkRequired([username, email, password, password2])
    checkLength(username, 3, 15)
    checkLength(password, 6, 15)
    checkEmail(email)
    checkPasswordMatch(password, password2) 
})