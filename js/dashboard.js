import { getAllCourses } from "./funcs/shared.js";
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


// get and show all courses

const coursesContainer = $.querySelector("#coursesCountainer")
coursesContainer.innerHTML = ""


const getAndShowAllCourses = () => {
    getAllCourses().then(courses => {
        courses.map(course => {
            coursesContainer.insertAdjacentHTML("beforeend", `
                <div class="tab__content__item glassmorphism_2">
                            <div class="tab__content__item_cover">

                                <img src="${course.cover}" alt="${course.title}"
                                    class="tab__content__item_img" draggable="false">
                            </div>
                            <div class="tab__content_infos_controllers">

                                <div class="tab__content__item_infos">
                                    <h4 class="tab__content__item_title">${course.title}</h4>
                                    <div class="tab__content__item_profile">
                                        <svg width="32" height="32">
                                            <use href="#profile__linear"></use>
                                        </svg>
                                        <p class="tab__content__item_profile_text">${course.courseTeacherID.userFullName}</p>
                                    </div>
                                    <div class="tab__content__item_tag">
                                        ${course.courseCategoryID.title}
                                    </div>
                                </div>
                                <div class="tab__content__item_controllers">
                                    <button class="tab__content__item_controller glassmorphism_2">
                                        <svg width="32" height="32">
                                            <use href="#trash__linear"></use>
                                        </svg>
                                    </button>
                                    <button class="tab__content__item_controller glassmorphism_2">
                                        <svg width="32" height="32">
                                            <use href="#edit__linear"></use>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                `)
        })



    }).catch(console.clear())
}


window.addEventListener("load", () => {
    getAndShowAllCourses()


})




// controll stepper btns

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




// create new item btn 

const createNewItemBtn = $.querySelector(".new__item")
createNewItemBtn.addEventListener("click", () => {
    document.body.classList.add("createItem")
    tabContentBtnsBox.classList.add("course__coverBox__active")


})


