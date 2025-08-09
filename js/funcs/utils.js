import { successStatusModal } from "/components/success_status_modal/script.js";
import { dangertatusModal } from "/components/danger_status_modal/script.js";


const $ = document
const registerBody = $.querySelector("#register_body")


/* -------------------------------------------------------------------------- */
/*                            clear inputs handler                            */
/* -------------------------------------------------------------------------- */

const clearInputs = () => {
    const inputs = $.querySelectorAll("input")

    inputs.forEach(item => {
        item.value = ""
        item.checked = false
    })
}


/* -------------------------------------------------------------------------- */
/*                             local storage funcs                            */
/* -------------------------------------------------------------------------- */

const saveInLocalStorage = (key, value) => {
    return localStorage.setItem(key,JSON.stringify(value))

}

const getLocalStorage = (key) => {
    return localStorage.getItem(key)
    

}



const getToken = () => {
    const userToken = JSON.parse(localStorage.getItem("user"))
    return userToken ? userToken.token : null
}

const isSignedIn = () => {
    const userToken = JSON.parse(localStorage.getItem("user"))
    return userToken ? true : false
}









/* -------------------------------------------------------------------------- */
/*                           registration components                          */
/* -------------------------------------------------------------------------- */

const registrationSuccesssHandler = (registerResultTitle, registerResultText ) => {
    window.customElements.define("status-modal-success", successStatusModal)
    registerBody.insertAdjacentHTML("afterbegin", `
        <status-modal-success>
        <h3 slot="regestration__Title" class="status__modal_title" id="regestration__Title">${registerResultTitle}</h3>
        <p slot="status__modal_text" class="status__modal_text">${registerResultText}</p>
        
        </status-modal-success>

        `)

}

const registrationDangerHandler = () => {
    window.customElements.define("status-modal-danger", dangertatusModal)
    registerBody.insertAdjacentHTML("afterbegin", `
        
        <status-modal-danger>
        </status-modal-danger>

        `)

}


export {
    registrationSuccesssHandler,
    registrationDangerHandler, 
    clearInputs,
    saveInLocalStorage,
    getLocalStorage,
    getToken,
    isSignedIn
}