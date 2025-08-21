import { mobileSideBarHandler } from "./funcs/sideBar.js";
import { elementsLinkHandler } from "./funcs/elementsLink.js";
import { menuBtnTextHandler } from "./funcs/shared.js";
import { showLastCourses } from "./shared.js";

/* -------------------------- Mobile SideBar Start -------------------------- */
mobileSideBarHandler()
/* --------------------------- Mobile SideBar End --------------------------- */


/* ----------------------- elements Link Handler Start ---------------------- */
elementsLinkHandler()
/* ------------------------ elements Link Handler End ----------------------- */


/* -------------------------------------------------------------------------- */
/*                            menu Btn Text Handler                           */
/* -------------------------------------------------------------------------- */

window.addEventListener("load", () => {
    menuBtnTextHandler()
    showLastCourses()
    

})















