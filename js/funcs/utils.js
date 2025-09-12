const $ = document


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
    return localStorage.setItem(key, JSON.stringify(value))

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










export {
    clearInputs,
    saveInLocalStorage,
    getLocalStorage,
    getToken,
    isSignedIn
}