import { getAllUsers } from "./funcs/shared.js"


const $ = document



const createNewItemBtn = $.querySelector(".new__item")
createNewItemBtn.addEventListener("click", () => {
    document.body.classList.add("createItem")
    tabContentBtnsBox.classList.add("course__coverBox__active")


})


const sidebarHandler = () => {

    const menuBtnElem = $.querySelector(".menu__btn")
    const sidebar = $.querySelector(".sidebar")
    const blurElem = $.querySelector(".blur")

    menuBtnElem.addEventListener("click", () => {
        sidebar.style.display = "block"
        sidebar.style.right = "0"


        blurElem.style.display = "block"
        blurElem.addEventListener("click", () => {
            blurElem.style.display = "none"
            sidebar.style.right = "-1000rem"
            sidebar.style.display = "none"

        })
    })


    const sidebarItems = $.querySelectorAll(".sidebar__item")

    sidebarItems.forEach(item => {




        const tabContentHandler = () => {
            const tabContents = document.querySelectorAll(".tab__content")
            const itemId = item.getAttribute("id")


            tabContents.forEach(item => {
                if (item.getAttribute("id") == itemId) {
                    item.classList.add("tab__content_Active")
                } else {
                    item.classList.remove("tab__content_Active")

                }


            })

        }








        item.addEventListener("click", event => {
            event.preventDefault()



            sidebarItems.forEach(item => {


                if (item.className.includes("sidebar__item_active")) {
                    item.className = "sidebar__item"


                }





            })




            item.classList.add("sidebar__item_active")
            tabContentHandler()












        })







        if (item.className.includes("sidebar__item_active")) {
            tabContentHandler()















        }







    })


}


const stepperHandler = () => {


    const NextStepBtn = $.querySelector("#NextStepBtn")
    const previousStepBtn = $.querySelector("#previousStepBtn")
    const cancelActionsBtn = $.querySelector("#cancelActionsBtn")
    const tabContentBtnsBox = $.querySelector(".tab__content__btns")

    const stepps = $.querySelectorAll(".step")
    let stepIndex = 0
    NextStepBtn.addEventListener("click", () => {


        stepIndex++
        stepps[stepIndex].className = "step step__active"

        if (tabContentBtnsBox.className.includes("course__coverBox__active")) {
            tabContentBtnsBox.classList.remove("course__coverBox__active")
        }






    })



    previousStepBtn.addEventListener("click", () => {
        stepIndex--
        stepps[stepIndex + 1].className = "step"
        if (stepIndex === 0) {
            tabContentBtnsBox.classList.add("course__coverBox__active")


        }




    })




    cancelActionsBtn.addEventListener("click", () => {
        document.body.classList.remove("createItem")
        stepps.forEach(item => {
            item.className = "step"
        })
        stepps[0].className = "step__active"


    })









}


const showAllUsers = () => {

    getAllUsers().then(users => {
        users.forEach(user => {
            
            const usersTabContentItems = $.querySelector("#users .tab__content__items")
            usersTabContentItems.insertAdjacentHTML("beforeend", `
                
                <div class="user glassmorphism_2">
                        <img src="/images/landing/teachers/programmer.webp" alt="profile" draggable="false"
                            class="user__profile_img">

                        <div class="user__details">
                            <h3 class="userFullName">${user.fullname}</h3>
                            <div class="user__role_box">
                                <svg width="32" height="32">
                                    <use href="#profile__linear"></use>
                                </svg>
                                <p class="user__role">کاربر</p>

                            </div>

                        </div>

                        <div class="user__controlls">
                            <button class="user__controll center-xy  glassmorphism">
                                <svg width="32" height="32">
                                    <use href="#trash__linear"></use>
                                </svg>

                            </button>
                            <button class="user__controll center-xy  glassmorphism">
                                <svg width="32" height="32">
                                    <use href="#edit__linear"></use>
                                </svg>

                            </button>
                            <button class="user__controll center-xy  glassmorphism">
                                <svg width="32" height="32">
                                    <use href="#userEdit__linear"></use>
                                </svg>

                            </button>
                        </div>
                
            `)



        })
    })

}




window.addEventListener("load", () => {
    sidebarHandler()
    stepperHandler()
    showAllUsers()











})






