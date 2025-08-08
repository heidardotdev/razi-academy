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
    return JSON.parse(localStorage.getItem())
}




/* -------------------------------------------------------------------------- */
/*                           registration components                          */
/* -------------------------------------------------------------------------- */

const registrationSuccesssHandler = (registerResult) => {
    window.customElements.define("status-modal-success", successStatusModal)
    registerBody.insertAdjacentHTML("afterbegin", `
        <status-modal-success>
        <h3 slot="regestration__Title" class="status__modal_title" id="regestration__Title">${registerResult}</h3>
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
    getToken
}