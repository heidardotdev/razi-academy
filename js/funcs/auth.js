import {
    registrationSuccesssHandler,
    registrationDangerHandler,


} from "../register.js";
import {
    clearInputs,
    saveInLocalStorage,
    getToken
} from "./utils.js";
const $ = document




const signUp = () => {


    const userFullNameInput = $.querySelector("#signup_userFullName")
    const userNameInput = $.querySelector("#signup_username")
    const passswordInput = $.querySelector("#signup_password")

    const formData = new FormData()
    formData.append("profile", "")
    formData.append("username", userNameInput.value.trim())
    formData.append("fullname", userFullNameInput.value.trim())
    formData.append("password", passswordInput.value.trim())
    formData.append("role", "user")

    fetch(`http://localhost:5000/api/users/signup`, {
        method: "POST",
        body: formData,
    })
        .then(res => {
            if (res.status === 201) {
                return res.json()

            }
        })
        .then(result => {
            clearInputs()
            registrationSuccesssHandler(`${result.fullname} عزیز`, "ثبت نام شما با موفقیت انجام شد")
            saveInLocalStorage("user", { token: result.token })
        })
        .catch(() => {
            console.clear()
            registrationDangerHandler()
        })


}



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
        saveInLocaWlStorage("user", { token: result.token })
    })
        .catch(() => {
            registrationDangerHandler()
        })

}




const userTokenHandler = async () => {
    const token = getToken()

    if (!token) {
        return false
    } else {
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
