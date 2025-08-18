const $ = document

// sidebar items



const sidebarItems = $.querySelectorAll(".sidebar__item")
sidebarItems.forEach(item => {

    item.addEventListener("click", event => {
        event.preventDefault()



        sidebarItems.forEach(item => {


            if (item.className.includes("sidebar__item_active")) {
                item.className = "sidebar__item"


            }





        })



        item.classList.add("sidebar__item_active")







    })





})



//menu btn handler

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
