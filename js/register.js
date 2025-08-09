import { signUp, signIn } from "./funcs/auth.js";



const $ = document

const userFullNameInput = $.querySelector("#signup_userFullName")
const userNameInput = $.querySelector("#signup_username")
const passswordInput = $.querySelector("#signup_password")
const checkBoxInput = $.querySelector("#signup_checkbox")
const userFullNameInputMessage = $.querySelector("#userFullName_message")
const registerUserNameInputMessage = $.querySelector("#register_username_message")
const signupPassswordMessage = $.querySelector("#signup__password_message")
const signUpEmptyInputsMessage = $.querySelector(".register__btn-box p")
const registerBody = $.querySelector("#register_body")
const signInBtn = $.querySelector("#signIn__btn")
const registerLinks = $.querySelectorAll(".register__link")





/* -------------------------------------------------------------------------- */
/*                              input validation                              */
/* -------------------------------------------------------------------------- */

let isUserNameValid = false
let isUserFullNameValid = false
let isPasswordValid = false

userFullNameInput.addEventListener("keyup", () => {
    const userFullNameRegex = /^(?!.*[0-9۰-۹])(?!.*[٬])(?!.*[٫])(?!.*[٪])(?!.*[،])(?!.*[a-zA-Z])[\u0600-\u06FF](?:[\u0600-\u06FF ]*[\u0600-\u06FF]){5,21}$/

    if (userFullNameInput.value.length === 0) {
        userFullNameInputMessage.style.display = "none"
    } else {
        if (userFullNameRegex.test(userFullNameInput.value)) {
            isUserFullNameValid = true
            userFullNameInputMessage.style.display = "none"

        } else {
            userFullNameInputMessage.style.display = "block"
            isUserFullNameValid = false

        }
    }



})
userNameInput.addEventListener("keyup", () => {
    const userNameValidationRegex = /^[a-zA-Z][a-zA-Z0-9\-_.]{4,21}$/i




    if (userNameInput.value.length === 0) {
        registerUserNameInputMessage.style.display = "none"

    } else {

        if (userNameValidationRegex.test(userNameInput.value)) {
            isUserNameValid = true
            registerUserNameInputMessage.style.display = "none"


        } else {
            registerUserNameInputMessage.style.display = "block"
            isUserNameValid = false


        }
    }


})
passswordInput.addEventListener("keyup", () => {
    const passwordValidationRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,15}$/i
    if (passswordInput.value.length === 0) {
        signupPassswordMessage.style.display = "none"

    } else {
        if (passwordValidationRegex.test(passswordInput.value)) {
            isPasswordValid = true
            signupPassswordMessage.style.display = "none"

        } else {
            signupPassswordMessage.style.display = "block"
            isPasswordValid = false


        }

    }

})

window.addEventListener("change", () => {
    if (isUserFullNameValid, isUserNameValid, isPasswordValid, checkBoxInput.checked) {
        signUpEmptyInputsMessage.style.display = "none"
    }
})











/* -------------------------------------------------------------------------- */
/*                                   sign Up                                  */
/* -------------------------------------------------------------------------- */
const signUpBtn = $.querySelector("#signup__btn")

window.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        signUpHandler()

    }
})

signUpBtn.addEventListener("click", event => {
    event.preventDefault()
    signUpHandler()


})

const signUpHandler = () => {
    if (isUserFullNameValid && isUserNameValid && isPasswordValid && checkBoxInput.checked) {
        signUp()
        signUpEmptyInputsMessage.style.display = "none"
    } else {
        signUpEmptyInputsMessage.style.display = "block"

    }

}




/* -------------------------------------------------------------------------- */
/*                                   sign In                                  */
/* -------------------------------------------------------------------------- */

const signInLinksHandler = () => {

    registerLinks.forEach(item => {
        item.addEventListener("click", event => {
            event.preventDefault()
            registerBody.classList.toggle("signIn")
        })
    })





}
signInLinksHandler()

const signInHandler = () => {
    if (isUserNameValid, isPasswordValid) {
        signUpEmptyInputsMessage.style.display = "none"
        signIn()
    } else {
        signUpEmptyInputsMessage.style.display = "block"
    }

}

window.addEventListener("keyup", event => {
    if (event.key === "Enter") {
        signInHandler()
    }
})

signInBtn.addEventListener("click", event => {
    event.preventDefault()
    signInHandler()

})

window.addEventListener("change", () => {
    if (isUserNameValid, isPasswordValid) {
        signUpEmptyInputsMessage.style.display = "none"
    } else {
        signUpEmptyInputsMessage.style.display = "block"

    }
})










/* -------------------------------------------------------------------------- */
/*                           show and hide password                           */
/* -------------------------------------------------------------------------- */

const showPasswordBtn = $.querySelector("#show__password")
const hidePasswordBtn = $.querySelector("#hide__password")

showPasswordBtn.addEventListener("click", () => {
    passswordInput.setAttribute("type", "text")
    showPasswordBtn.style.display = "none"
    hidePasswordBtn.style.display = "block"
})

hidePasswordBtn.addEventListener("click", () => {
    passswordInput.setAttribute("type", "password")
    showPasswordBtn.style.display = "block"
    hidePasswordBtn.style.display = "none"
})








