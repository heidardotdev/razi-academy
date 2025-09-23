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
  const myAccountBtn = $.querySelector("#myAccountBtn");
  const menuBtnText = $.querySelector(".menu__btn-text");
  const menuBtn = $.querySelector(".menu__btn");
  if (isSignedIn()) {
    menuBtnText.textContent = JSON.parse(getLocalStorage("fullname"));
    menuBtn.setAttribute(
      "href",
      JSON.stringify(getLocalStorage("role")) === "admin"
        ? "dashboard.html"
        : "user-dashboard.html"
    );
    myAccountBtn.remove();
  } else {
    menuBtnText.textContent = "حساب کاربری";
    menuBtn.setAttribute("href", "register.html");
  }
};

window.addEventListener("load", () => {
  navBtnTextHandler();
  mobileSideBarHandler();
  elementsLinkHandler();
});
