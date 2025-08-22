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
      getAllCourses().then(courses =>{
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
                                    
                            
                                </div>
                                                        <a href="course-details.html" class="btn">
                            جزئیات دوره
                            <svg class="popular-course__go-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                                <path stroke="#ffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 11l8.2-8.2M22 6.8V2h-4.8M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2">
                                </path>
                            </svg>


                        </a>
                            </div>
                        </div>
                `)
        })
        
        
        
    }).catch(console.clear())
}


window.addEventListener("load", () => {
    getAndShowAllCourses()
  
        
})


