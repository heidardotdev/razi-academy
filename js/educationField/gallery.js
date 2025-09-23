const $ = document;

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
  galleryModalHandler();
});
