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





window.addEventListener("load", () => {
    sidebarHandler()
    stepperHandler()

})






