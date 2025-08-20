import { userTokenHandler } from "./auth.js";
import { isSignedIn } from "./utils.js"

const $ = document

/* -------------------------------------------------------------------------- */
/*                            menu Btn Text Handler                           */
/* -------------------------------------------------------------------------- */

const menuBtnTextHandler = () => {
    const isUserSignedIn = isSignedIn()
    const menuBtn = $.querySelector(".menu__btn")
    const menuBtnText = $.querySelector(".menu__btn-text")

    if (!isUserSignedIn) {
        menuBtn.setAttribute("href", "register.html")
        return false

    }

    menuBtn.setAttribute("href", "dashboard.html")

    userTokenHandler().then(res => {
        menuBtnText.textContent = `${res.userFullName}`

    }).catch(() => {
        console.clear()
        return false

    })



}



/* -------------------------------------------------------------------------- */
/*                                   courses                                  */
/* -------------------------------------------------------------------------- */

const getAllCourses = async() => {
    const res = await fetch("http://localhost:5000/api/courses")
    const result = await res.json()

    return result
}

export {
    menuBtnTextHandler,
    getAllCourses
}