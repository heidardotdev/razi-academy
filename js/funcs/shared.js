import { userTokenHandler } from "./auth.js";
import { isSignedIn } from "./utils.js";

const $ = document


const menuBtn = $.querySelector(".menu__btn")



/* -------------------------------------------------------------------------- */
/*                            menu btn text handler                           */
/* -------------------------------------------------------------------------- */

const menuBtnTextHandler = () => {

    const isUserSignedIn = isSignedIn()

    if (!isUserSignedIn) {
        menuBtn.innerHTML = `
        
            <svg width="35" height="35" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.1504 15.975C15.0629 15.9625 14.9504 15.9625 14.8504 15.975C12.6504 15.9 10.9004 14.1 10.9004 11.8875C10.9004 9.62498 12.7254 7.78748 15.0004 7.78748C17.2629 7.78748 19.1004 9.62498 19.1004 11.8875C19.0879 14.1 17.3504 15.9 15.1504 15.975Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M23.4252 24.225C21.2002 26.2625 18.2502 27.5 15.0002 27.5C11.7502 27.5 8.8002 26.2625 6.5752 24.225C6.7002 23.05 7.4502 21.9 8.7877 21C12.2127 18.725 17.8127 18.725 21.2127 21C22.5502 21.9 23.3002 23.05 23.4252 24.225Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>

            <span class="menu__btn-text">حساب کاربری</span>

                
        
        `
    }else{

        userTokenHandler().then(res => {
                    menuBtn.innerHTML = `
        
            <svg width="35" height="35" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.1504 15.975C15.0629 15.9625 14.9504 15.9625 14.8504 15.975C12.6504 15.9 10.9004 14.1 10.9004 11.8875C10.9004 9.62498 12.7254 7.78748 15.0004 7.78748C17.2629 7.78748 19.1004 9.62498 19.1004 11.8875C19.0879 14.1 17.3504 15.9 15.1504 15.975Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M23.4252 24.225C21.2002 26.2625 18.2502 27.5 15.0002 27.5C11.7502 27.5 8.8002 26.2625 6.5752 24.225C6.7002 23.05 7.4502 21.9 8.7877 21C12.2127 18.725 17.8127 18.725 21.2127 21C22.5502 21.9 23.3002 23.05 23.4252 24.225Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>

            <span class="menu__btn-text>${res.userFullName}</span>

                
        
        `
        })
    }

}



export{
    menuBtnTextHandler
}