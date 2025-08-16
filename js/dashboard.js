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