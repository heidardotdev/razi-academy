import { registrationSuccesssHandler, registrationDangerHandler, clearInputs, saveInLocalStorage, getToken } from "./utils.js"
const $ = document



/* -------------------------------------------------------------------------- */
/*                              sign Up Function                              */
/* -------------------------------------------------------------------------- */
const signUp = () => {


    const userFullNameInput = $.querySelector("#signup_userFullName")
    const userNameInput = $.querySelector("#signup_username")
    const passswordInput = $.querySelector("#signup_password")

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
            registrationSuccesssHandler(`${result.userFullName} عزیز`, "ثبت نام شما با موفقیت انجام شد")
            saveInLocalStorage("user", { token: result.token })
        })
        .catch(() => {
            console.clear()
            registrationDangerHandler()
        })


}


/* -------------------------------------------------------------------------- */
/*                              sign In Function                              */
/* -------------------------------------------------------------------------- */

const signIn = () => {

    const userNameInput = $.querySelector("#signup_username")
    const passswordInput = $.querySelector("#signup_password")

    const userInfo = {
        userName: userNameInput.value.toLowerCase().trim(),
        password: passswordInput.value
    }

    fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
    }).then(res => {
        if (res.ok) {

            return res.json()
        }
    }).then(result => {
        clearInputs()
        registrationSuccesssHandler(`${result.userFullName} عزیز `, "با موفقیت وارد شدید")
        saveInLocalStorage("user", { token: result.token })
    })
        .catch(() => {
            registrationDangerHandler()
        })

}



/* -------------------------------------------------------------------------- */
/*                             user Token Handler                             */
/* -------------------------------------------------------------------------- */

const userTokenHandler = async() => {
    const token = getToken()

    if(!token){
        return false
    }else{
        const res = await fetch("http://localhost:5000/api/users/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const result = await res.json()
        return result
    }


}













export {
    signUp,
    signIn,
    userTokenHandler
}
