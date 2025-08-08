import { singUp } from "./funcs/auth.js";



const $ = document

const userFullNameInput = $.querySelector("#singup_userFullName")
const userNameInput = $.querySelector("#singup_username")
const passswordInput = $.querySelector("#singup_password")
const checkBoxInput = $.querySelector("#singup_checkbox")
const userFullNameInputMessage = $.querySelector("#userFullName_message")
const registerUserNameInputMessage = $.querySelector("#register_username_message")
const singupPassswordMessage = $.querySelector("#singup__password_message")
const singupEmptyInputsMessage = $.querySelector(".register__btn-box p")












// sing up start
const singUpBtn = $.querySelector("#singup__btn")

window.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        singUpHandler()

    }
})

 singUpBtn.addEventListener("click", event => {
   event.preventDefault()
    singUpHandler()


 })

const singUpHandler = () => {
    if (isUserFullNameValid && isUserNameValid && isPasswordValid && checkBoxInput.checked) {
        singUp()
        singupEmptyInputsMessage.style.display = "none"
    } else {
        singupEmptyInputsMessage.style.display = "block"

    }

}
// sing up end




//input validation start

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
        singupPassswordMessage.style.display = "none"

    } else {
        if (passwordValidationRegex.test(passswordInput.value)) {
            isPasswordValid = true
            singupPassswordMessage.style.display = "none"

        } else {
            singupPassswordMessage.style.display = "block"
            isPasswordValid = false


        }

    }

})

window.addEventListener("change", () => {
    if (isUserFullNameValid, isUserNameValid, isPasswordValid, checkBoxInput.checked) {
        singupEmptyInputsMessage.style.display = "none"
    }
})

//input validation end




// show pass start

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

// show pass end







