import { elementsLinkHandler } from "./funcs/elementsLink.js";
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

const galleryModalHandler = () => {
  const galleryModal = $.querySelector(".gallery__modal");
  const galleryModalCloseBtn = $.querySelector(".close__gallery_modal");
  const galleryModalBlur = $.querySelector(".modalBlur");
  const galleryItems = $.querySelectorAll(".gallery .gallery__item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      document.body.classList.add("gallery__modal_open");
    });
  });

  const galleryModalAnimationHandler = () => {
    if (galleryModal.className.includes("galleryModalCloseAnimation")) {
      galleryModal.className = "gallery__modal";
    } else {
      galleryModal.className = "gallery__modal galleryModalCloseAnimation";
      setTimeout(() => {
        document.body.classList.remove("gallery__modal_open");
        galleryModal.className = "gallery__modal ";
      }, 200);
    }
  };

  galleryModalCloseBtn.addEventListener("click", () => {
    galleryModalAnimationHandler();
  });
  galleryModalBlur.addEventListener("click", () => {
    galleryModalAnimationHandler();
  });
};

window.addEventListener("load", () => {
  mobileSideBarHandler();
  elementsLinkHandler();
  galleryModalHandler();
});
