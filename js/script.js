import { elementsLinkHandler } from "./funcs/elementsLink.js";
import { getLocalStorage, isSignedIn } from "./funcs/utils.js";
const $ = document;

const mobileSideBarHandler = () => {
  const mobileSideBar = $.querySelector("aside");
  const mobileHambergerBtn = $.querySelector(".mobile-menu");
  const blurElem = $.querySelector(".blur");
  const navBar = $.querySelector("nav");
  const navBarAccountBtn = $.querySelector(".menu-left__box .menu__btn");
  const mobileSideBarLogo = $.querySelector(".mobile-menu__top-box-logo");

  const showMobileSideBar = () => {
    mobileSideBar.style.right = "0";
    blurElem.style.display = "block";
    navBar.style.backgroundColor = "transparent";
    navBarAccountBtn.style.display = "none";
  };

  const hideMobileSideBar = () => {
    mobileSideBar.style.right = "-1000px";
    blurElem.style.display = "none";
    navBar.style.backgroundColor = "var(--dark-color)";
    navBarAccountBtn.style.display = "flex";
  };

  mobileHambergerBtn.addEventListener("click", () => {
    showMobileSideBar();
  });

  blurElem.addEventListener("click", () => {
    hideMobileSideBar();
  });

  mobileSideBarLogo.addEventListener("click", () => {
    location.href = "/";
  });
};

const navBtnTextHandler = () => {
  const menuBtnText = $.querySelector(".menu__btn-text");
  isSignedIn()
    ? (menuBtnText.textContent = JSON.parse(getLocalStorage("fullname")))
    : (menuBtnText.textContent = "حساب کاربری");
};

window.addEventListener("load", () => {
  navBtnTextHandler();
  mobileSideBarHandler();
  elementsLinkHandler();
});
