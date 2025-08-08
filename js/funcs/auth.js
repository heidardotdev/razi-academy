import { registrationSuccesssHandler, registrationDangerHandler,clearInputs } from "./utils.js"
const $ = document



// sing up start
const singUp = () => {


    const userFullNameInput = $.querySelector("#singup_userFullName")
    const userNameInput = $.querySelector("#singup_username")
    const passswordInput = $.querySelector("#singup_password")

    const newUser = {
        userFullName: userFullNameInput.value.trim(),
        userName: userNameInput.value.toLowerCase().trim(),
        password: passswordInput.value.trim()
    }

    fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })
        .then(res => {
            if (res.status === 201) {
                return res.json()

            }
        })
        .then(result => {
            clearInputs()
            registrationSuccesssHandler(`${result.userFullName} عزیز`)
        })
        .catch(() => {
            console.clear()
            registrationDangerHandler()
        })


}
// sing up end





export {
    singUp
}
