import { userTokenHandler } from "./auth.js";
import { isSignedIn } from "./utils.js"

const $ = document

/* -------------------------------------------------------------------------- */
/*                            menu Btn Text Handler                           */
/* -------------------------------------------------------------------------- */

const menuBtnTextHandler = () =>  {
    const isUserSignedIn = isSignedIn()

    if(!isUserSignedIn){
        return false
    }

    const menuBtn = $.querySelector(".menu__btn")
    menuBtn.setAttribute("href", "dashboard.html")

    const menuBtnText = $.querySelector(".menu__btn-text")
    userTokenHandler().then(res => {
        menuBtnText.textContent = `${res.userFullName}`
        
    })



}

export{
    menuBtnTextHandler
}