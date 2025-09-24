import {
  registrationSuccesssHandler,
  registrationDangerHandler,
} from "../register.js";
import { clearInputs, saveInLocalStorage } from "./utils.js";
const $ = document;

const signUp = () => {
  const userFullNameInput = $.querySelector("#signup_userFullName");
  const userNameInput = $.querySelector("#signup_username");
  const passswordInput = $.querySelector("#signup_password");

  const formData = new FormData();
  formData.append("profile", "");
  formData.append("username", userNameInput.value.trim());
  formData.append("fullname", userFullNameInput.value.trim());
  formData.append("password", passswordInput.value.trim());
  formData.append("role", "user");

  fetch(`http://localhost:5000/api/users/signup`, {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      if (res.status === 201) {
        return res.json();
      }
    })
    .then((result) => {
      clearInputs();
      registrationSuccesssHandler(
        `${result.fullname} عزیز`,
        "ثبت نام شما با موفقیت انجام شد"
      );
      saveInLocalStorage("user", { token: result.token });
      saveInLocalStorage("fullname", result.fullname);
      saveInLocalStorage("role", result.role);
    })
    .catch(() => {
      console.clear();
      registrationDangerHandler();
    });
};

const signIn = () => {
  const userNameInput = $.querySelector("#signup_username");
  const passswordInput = $.querySelector("#signup_password");

  const userInfo = {
    username: userNameInput.value.toLowerCase().trim(),
    password: passswordInput.value.trim(),
  };

  fetch("http://localhost:5000/api/users/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((user) => {
      saveInLocalStorage("user", { token: user.token });
      saveInLocalStorage("fullname", user.fullname);
      saveInLocalStorage("role", user.role);

      clearInputs();
      registrationSuccesssHandler(
        `${user.fullname} عزیز `,
        "با موفقیت وارد شدید"
      );
<<<<<<< HEAD
    })
    .catch(() => {
=======
      console.log(user);
    })
    .catch((err) => {
>>>>>>> c57e868a534964093d153d04cc2d6ca283741a7b
      console.clear();
      registrationDangerHandler();
      throw err;
    });
};

export { signUp, signIn };
