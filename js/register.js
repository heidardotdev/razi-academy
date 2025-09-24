import { signUp, signIn } from "./funcs/auth.js";
import { getLocalStorage } from "./funcs/utils.js";

const $ = document;

const userFullNameInput = $.querySelector("#signup_userFullName");
const userNameInput = $.querySelector("#signup_username");
const passswordInput = $.querySelector("#signup_password");
const checkBoxInput = $.querySelector("#signup_checkbox");
const userFullNameInputMessage = $.querySelector("#userFullName_message");
const registerUserNameInputMessage = $.querySelector(
  "#register_username_message"
);
const signupPassswordMessage = $.querySelector("#signup__password_message");
const signUpEmptyInputsMessage = $.querySelector(".register__btn-box p");
const signInBtn = $.querySelector("#signIn__btn");
const registerLinks = $.querySelectorAll(".register__link");

/* -------------------------------------------------------------------------- */
/*                              input validation                              */
/* -------------------------------------------------------------------------- */

let isUserNameValid = false;
let isUserFullNameValid = false;
let isPasswordValid = false;

userFullNameInput.addEventListener("keyup", () => {
  const userFullNameRegex =
    /^(?!.*[0-9۰-۹])(?!.*[٬])(?!.*[٫])(?!.*[٪])(?!.*[،])(?!.*[a-zA-Z])[\u0600-\u06FF](?:[\u0600-\u06FF ]*[\u0600-\u06FF]){5,21}$/;

  if (userFullNameInput.value.length === 0) {
    userFullNameInputMessage.style.display = "none";
  } else {
    if (userFullNameRegex.test(userFullNameInput.value)) {
      isUserFullNameValid = true;
      userFullNameInputMessage.style.display = "none";
    } else {
      userFullNameInputMessage.style.display = "block";
      isUserFullNameValid = false;
    }
  }
});

userNameInput.addEventListener("keyup", () => {
  const userNameValidationRegex = /^[a-zA-Z][a-zA-Z0-9\-_.]{4,21}$/i;

  if (userNameInput.value.length === 0) {
    registerUserNameInputMessage.style.display = "none";
  } else {
    if (userNameValidationRegex.test(userNameInput.value)) {
      isUserNameValid = true;
      registerUserNameInputMessage.style.display = "none";
    } else {
      registerUserNameInputMessage.style.display = "block";
      isUserNameValid = false;
    }
  }
});
passswordInput.addEventListener("keyup", () => {
  const passwordValidationRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,15}$/i;
  if (passswordInput.value.length === 0) {
    signupPassswordMessage.style.display = "none";
  } else {
    if (passwordValidationRegex.test(passswordInput.value)) {
      isPasswordValid = true;
      signupPassswordMessage.style.display = "none";
    } else {
      signupPassswordMessage.style.display = "block";
      isPasswordValid = false;
    }
  }
});

window.addEventListener("change", () => {
  if (
    (isUserFullNameValid,
    isUserNameValid,
    isPasswordValid,
    checkBoxInput.checked)
  ) {
    signUpEmptyInputsMessage.style.display = "none";
  }
});

/* -------------------------------------------------------------------------- */
/*                                   sign Up                                  */
/* -------------------------------------------------------------------------- */
const signUpBtn = $.querySelector("#signup__btn");

window.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    signUpHandler();
  }
});

signUpBtn.addEventListener("click", (event) => {
  event.preventDefault();
  signUpHandler();
});

const signUpHandler = () => {
  if (
    isUserFullNameValid &&
    isUserNameValid &&
    isPasswordValid &&
    checkBoxInput.checked
  ) {
    signUp();
    signUpEmptyInputsMessage.style.display = "none";
  } else {
    signUpEmptyInputsMessage.style.display = "block";
  }
};

/* -------------------------------------------------------------------------- */
/*                                   sign In                                  */
/* -------------------------------------------------------------------------- */

const signInLinksHandler = () => {
  registerLinks.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      registerBody.classList.toggle("signIn");
    });
  });
};
signInLinksHandler();

const signInHandler = () => {
  if ((isUserNameValid, isPasswordValid)) {
    signUpEmptyInputsMessage.style.display = "none";
    signIn();
  } else {
    signUpEmptyInputsMessage.style.display = "block";
  }
};

window.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    signInHandler();
  }
});

signInBtn.addEventListener("click", (event) => {
  event.preventDefault();
  signInHandler();
});

window.addEventListener("change", () => {
  if ((isUserNameValid, isPasswordValid)) {
    signUpEmptyInputsMessage.style.display = "none";
  } else {
    signUpEmptyInputsMessage.style.display = "block";
  }
});

/* -------------------------------------------------------------------------- */
/*                           show and hide password                           */
/* -------------------------------------------------------------------------- */

const showPasswordBtn = $.querySelector("#show__password");
const hidePasswordBtn = $.querySelector("#hide__password");

showPasswordBtn.addEventListener("click", () => {
  passswordInput.setAttribute("type", "text");
  showPasswordBtn.style.display = "none";
  hidePasswordBtn.style.display = "block";
});

hidePasswordBtn.addEventListener("click", () => {
  passswordInput.setAttribute("type", "password");
  showPasswordBtn.style.display = "block";
  hidePasswordBtn.style.display = "none";
});

// register status modals

const statusModalTimer = (userLocation, timeLineText) => {
  let timeLineElemTime = 5;
  let timeLineElemWidth = 0;

  const timer = setInterval(() => {
    timeLineElemWidth += 20;

    if (timeLineElemWidth === 100) {
      clearInterval(timer);
      location.href = userLocation;
    }

    let timeLineElem = document.querySelector(".status__modal_timeline");
    let timeLineElemText = document.querySelector(
      ".status__modal_timelinetext"
    );
    timeLineElemText.innerHTML = `${timeLineText} ${--timeLineElemTime} ثانیه`;
    timeLineElem.style.width = `calc(100% - ${timeLineElemWidth}%)`;
  }, 1000);
};

const registerBody = document.querySelector("#register_body");
const registrationSuccesssHandler = (fullname, message) => {
  statusModalTimer(
    getLocalStorage("role") == "admin"
      ? "dashboard.html"
      : "user-dashboard.html",
    "انتقال به داشبورد پس از "
  );

  const successStatusModalTemplate = `

 <div class="bg_galassmorphism__dark"></div>
 <div class="status__modal bg_glassmorphism_2 ">
        <div class="status__modal_tag">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10Z" stroke="#ffffff"
                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="m7.75 12 2.83 2.83 5.67-5.66" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round"></path>
            </svg>
            <span class="status__modal_tagـtext">عملیات موفقیت آمیز</span>
        </div>

        <div class="status__modal__message">
            <h3 name="regestration__Title" class="status__modal_title" id="regestration__Title">${fullname}</h3>
            <p name="status__modal_text" class="status__modal_text">${message}</p>
            <p class="status__modal_timelinetext">انتقال به داشبورد پس از ۵ ثانیه</p>
        </div>

        <div class="status__modal_btns">
            <a href="/" class="status__modal_btn">رازی آکادمی</a>
            <a href="${
              getLocalStorage("role") == "admin"
                ? "dashboard.html"
                : "user-dashboard.html"
            }"  class="status__modal_btn status__modal_btn_important">داشبورد</a>
        </div>


        <span class="status__modal_timeline"></span>


    </div>

`;

  registerBody.innerHTML = successStatusModalTemplate;
};

const registrationDangerHandler = () => {
  statusModalTimer("register.html", "لغو پس از");

  const dangerStatusModalTemplate = `


    <div class="bg_galassmorphism__dark"></div>
 <div class="status__modal bg_glassmorphism_2 ">
        <div class="status__modal_tag">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 9v5M12 21.41H5.94c-3.47 0-4.92-2.48-3.24-5.51l3.12-5.62L8.76 5c1.78-3.21 4.7-3.21 6.48 0l2.94 5.29 3.12 5.62c1.68 3.03.22 5.51-3.24 5.51H12v-.01Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.995 17h.009" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            <span class="status__modal_tagـtext">تلاش دوباره</span>
        </div>

        <div class="status__modal__message">
            <h3 name="regestration__Title" class="status__modal_title" id="regestration__Title">عزیز یه جای کار میلنگه</h3>
            <p class="status__modal_text">دوباره سعی کنین :) </p>
            <p class="status__modal_timelinetext">لغو پس از ۵ ثانیه</p>
        </div>

        <div class="status__modal_btns">
            <a href="/" class="status__modal_btn">رازی آکادمی</a>
            <a href="register.html" class="status__modal_btn status__modal_btn_important">لغو</a>
        </div>


        <span class="status__modal_timeline"></span>


    </div>
`;

  registerBody.innerHTML = dangerStatusModalTemplate;
};

export { registrationSuccesssHandler, registrationDangerHandler };
