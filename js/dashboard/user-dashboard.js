const $ = document;



const sidebarHandler = () => {
  const menuBtnElem = $.querySelector(".menu__btn");
  const sidebar = $.querySelector(".sidebar");
  const blurElem = $.querySelector(".blur");

  menuBtnElem.addEventListener("click", () => {
    sidebar.style.display = "block";
    sidebar.style.right = "0";

    blurElem.style.display = "block";
    blurElem.addEventListener("click", () => {
      blurElem.style.display = "none";
      sidebar.style.right = "-1000rem";
      sidebar.style.display = "none";
    });
  });

  const sidebarItems = $.querySelectorAll(".sidebar__item");

  sidebarItems.forEach((item) => {
    const tabContentHandler = () => {
      const tabContents = document.querySelectorAll(".tab__content");
      const itemId = item.getAttribute("id");

      tabContents.forEach((item) => {
        if (item.getAttribute("id") == itemId) {
          item.classList.add("tab__content_Active");
        } else {
          item.classList.remove("tab__content_Active");
        }
      });
    };

    item.addEventListener("click", (event) => {
      event.preventDefault();

      sidebarItems.forEach((item) => {
        if (item.className.includes("sidebar__item_active")) {
          item.className = "sidebar__item";
        }
      });

      item.classList.add("sidebar__item_active");
      tabContentHandler();
    });

    if (item.className.includes("sidebar__item_active")) {
      tabContentHandler();
    }
  });
};



window.addEventListener("load", () => {
  sidebarHandler();

});

