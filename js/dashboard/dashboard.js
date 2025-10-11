import { getAllUsers } from "../funcs/shared.js";
import {
  filterUsersByRole,
  updateUserFromAdminPanel,
  deleteUserFromAdminPanel,
} from "../shared.js";
import { getLocalStorage } from "../funcs/utils.js";

const $ = document;

const createNewItemHandler = () => {
  const createNewItemBtn = $.querySelector(".new__item");
  createNewItemBtn.addEventListener("click", () => {
    document.body.classList.add("createItem");
    tabContentBtnsBox.classList.add("course__coverBox__active");
  });
};

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
        if (item.getAttribute("id") == "users") {
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

const courseStepperHandler = () => {
  const NextStepBtn = $.querySelector("#NextStepBtn");
  const previousStepBtn = $.querySelector("#previousStepBtn");
  const cancelActionsBtn = $.querySelector("#cancelActionsBtn");
  const tabContentBtnsBox = $.querySelector(".tab__content__btns");

  const stepps = $.querySelectorAll(".step");
  let stepIndex = 0;
  NextStepBtn.addEventListener("click", () => {
    stepIndex++;
    stepps[stepIndex].className = "step step__active";

    if (tabContentBtnsBox.className.includes("course__coverBox__active")) {
      tabContentBtnsBox.classList.remove("course__coverBox__active");
    }
  });

  previousStepBtn.addEventListener("click", () => {
    stepIndex--;
    stepps[stepIndex + 1].className = "step";
    if (stepIndex === 0) {
      tabContentBtnsBox.classList.add("course__coverBox__active");
    }
  });

  cancelActionsBtn.addEventListener("click", () => {
    document.body.classList.remove("createItem");
    stepps.forEach((item) => {
      item.className = "step";
    });
    stepps[0].className = "step__active";
  });
};

const showAndUpdateUsers = () => {
  const usersTabContentItems = $.querySelector("#users .tab__content__items");

  usersTabContentItems.addEventListener("click", (event) => {
    const dashboardBlur = document.querySelector(".dashboard__blur");

    if (event.target.closest("#userEditBtn")) {
      event.target.closest(".user").classList.add("user__edit__active");
      event.target.closest(".user").style.zIndex = "4";
      dashboardBlur.style.display = "block";
      dashboardBlur.addEventListener("click", () => {
        dashboardBlur.style.display = "none";
        event.target.closest(".user").classList.remove("user__edit__active");
        event.target.closest(".user").style.zIndex = "unset";
      });
    }

    //delete user
    if (event.target.closest("#userDeleteBtn")) {
      deleteUserFromAdminPanel(event.target.closest(".user").dataset.id)
        .then(() => {
          usersTabContentItems.innerHTML = "";
          getAllUsers()
            .then((users) => {
              users.forEach((user) => {
                usersTabContentItems.insertAdjacentHTML(
                  "beforeend",
                  `
                
                <div  data-profile="${user.profile}" data-username="${
                    user.username
                  }" data-role="${user.role}" data-fullname="${
                    user.fullname
                  }" data-id="${user._id}" class="user glassmorphism_2">
                        <label for="userProfileInput">
                            <div draggable="false" class="userprofileinputlable">پروفایلی بارگزاری کنید</div>
                            <input type="file" id="userProfileInput">
                            <img src="/images/landing/teachers/programmer.webp" alt="profile" draggable="false"
                                class="user__profile_img">
                        </label>
                        <img src="${
                          user.profile
                            ? user.profile
                            : "/images/landing/teachers/programmer.webp"
                        }" alt="profile" draggable="false"
                            class="user__profile_img">

                        <div class="user__details">
                            <h3 class="userFullName">${user.fullname}</h3>
                            <input type="text" name="" value="${
                              user.fullname
                            }" id="userFullNameInput">

                            <div class="user__role_box">
                                <svg width="32" height="32">
                                    <use href="#${
                                      user.role == "user"
                                        ? "profile__linear"
                                        : user.role == "admin"
                                        ? "userTick__linear"
                                        : user.role == "courseteacher"
                                        ? "teacher__linear"
                                        : user.role == "teacher"
                                        ? "profileTick__linear"
                                        : user.role == "author"
                                        ? "userEdit__linear"
                                        : user.role == "presentor"
                                        ? "tagUser__linear"
                                        : user.role == "manager"
                                        ? "crown__linear"
                                        : false
                                    }"></use>
                                </svg>
                                <p class="user__role">${
                                  user.role == "user"
                                    ? "کاربر"
                                    : user.role == "admin"
                                    ? "ادمین"
                                    : user.role == "courseteacher"
                                    ? "مدرس"
                                    : user.role == "teacher"
                                    ? "هنرآموز"
                                    : user.role == "author"
                                    ? "نویسنده"
                                    : user.role == "presentor"
                                    ? "مجری"
                                    : user.role == "manager"
                                    ? "مدیر"
                                    : false
                                }</p>

                            </div>

                              <select  id="userRoleSelect">
                                <option   value="user">کاربر</option>
                                <option value="courseteacher">مدرس</option>
                                <option value="teacher">هنرآموز</option>
                                <option value="admin">ادمین</option>
                                <option value="author">نویسنده</option>
                                <option  value="presentor">مجری</option>
                            </select>

                        </div>

                        <div class="user__edit__btns">
                          <button id="user__btn_confirmChange">تایید</button>
                        <button id="user__btn_cancelChange">لغو</button>
                        
                        </div>

                      


               

                        <div class="user__controlls">
                            <button class="user__controll center-xy  glassmorphism">
                                <svg width="32" height="32">
                                    <use href="#trash__linear"></use>
                                </svg>

                            </button>
                            <button id="userEditBtn"  class="user__controll center-xy  glassmorphism"  >
                            
                                <svg width="32" height="32">
                                    <use href="#edit__linear"></use>
                                </svg>

                            </button>
                            <button class="user__controll center-xy  glassmorphism" id="userBanBtn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
                              <g id="slash" transform="translate(0.5 0.5)">
                                <g id="vuesax_linear_slash" data-name="vuesax/linear/slash">
                                  <g id="slash-2" data-name="slash">
                                    <path id="Vector" d="M20,10A10,10,0,1,0,10,20,10,10,0,0,0,20,10Z" transform="translate(2 2)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" stroke-dasharray="0 0"/>
                                    <path id="Vector-2" data-name="Vector" d="M14,0,0,14" transform="translate(4.9 5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" stroke-dasharray="0 0"/>
                                    <path id="Vector-3" data-name="Vector" d="M24,0V24H0V0Z" fill="none" stroke="#fff" stroke-width="1" opacity="0"/>
                                  </g>
                                </g>
                              </g>
                            </svg>


                            </button>
                        </div>

                
            `
                );
              });
            })

            .catch(() => {
              console.clear();
              return false;
            });
        })
        .catch(() => {
          console.clear();
          return false;
        });
    }

    // update user info
    if (event.target.closest("#user__btn_confirmChange")) {
      const userEl = event.target.closest(".user");
      const fullNameInput = userEl.querySelector("#userFullNameInput");
      const profileInput = userEl.querySelector("#userProfileInput");
      const roleSelector = userEl.querySelector("#userRoleSelect");
      const updateUserInfo = {
        _id: event.target.closest(".user").dataset.id,
        username: event.target.closest(".user").dataset.username,
        fullname: fullNameInput.value,
        profile: profileInput.value,
        role: roleSelector.value,
      };

      usersTabContentItems.innerHTML = "";
      updateUserFromAdminPanel(updateUserInfo._id, updateUserInfo)
        .then((res) => {
          getAllUsers()
            .then((users) => {
              users.forEach((user) => {
                usersTabContentItems.insertAdjacentHTML(
                  "beforeend",
                  `
                
                <div  data-profile="${user.profile}" data-username="${
                    user.username
                  }" data-role="${user.role}" data-fullname="${
                    user.fullname
                  }" data-id="${user._id}" class="user glassmorphism_2">
                        <label for="userProfileInput">
                            <div draggable="false" class="userprofileinputlable">پروفایلی بارگزاری کنید</div>
                            <input type="file" id="userProfileInput">
                            <img src="/images/landing/teachers/programmer.webp" alt="profile" draggable="false"
                                class="user__profile_img">
                        </label>
                        <img src="${
                          user.profile
                            ? user.profile
                            : "/images/landing/teachers/programmer.webp"
                        }" alt="profile" draggable="false"
                            class="user__profile_img">

                        <div class="user__details">
                            <h3 class="userFullName">${user.fullname}</h3>
                            <input type="text" name="" value="${
                              user.fullname
                            }" id="userFullNameInput">

                            <div class="user__role_box">
                                <svg width="32" height="32">
                                    <use href="#${
                                      user.role == "user"
                                        ? "profile__linear"
                                        : user.role == "admin"
                                        ? "userTick__linear"
                                        : user.role == "courseteacher"
                                        ? "teacher__linear"
                                        : user.role == "teacher"
                                        ? "profileTick__linear"
                                        : user.role == "author"
                                        ? "userEdit__linear"
                                        : user.role == "presentor"
                                        ? "tagUser__linear"
                                        : user.role == "manager"
                                        ? "crown__linear"
                                        : false
                                    }"></use>
                                </svg>
                                <p class="user__role">${
                                  user.role == "user"
                                    ? "کاربر"
                                    : user.role == "admin"
                                    ? "ادمین"
                                    : user.role == "courseteacher"
                                    ? "مدرس"
                                    : user.role == "teacher"
                                    ? "هنرآموز"
                                    : user.role == "author"
                                    ? "نویسنده"
                                    : user.role == "presentor"
                                    ? "مجری"
                                    : user.role == "manager"
                                    ? "مدیر"
                                    : false
                                }</p>

                            </div>

                              <select  id="userRoleSelect">
                                <option   value="user">کاربر</option>
                                <option value="courseteacher">مدرس</option>
                                <option value="teacher">هنرآموز</option>
                                <option value="admin">ادمین</option>
                                <option value="author">نویسنده</option>
                                <option  value="presentor">مجری</option>
                            </select>

                        </div>

                        <div class="user__edit__btns">
                          <button id="user__btn_confirmChange">تایید</button>
                        <button id="user__btn_cancelChange">لغو</button>
                        
                        </div>

                      


               

                        <div class="user__controlls">
                            <button class="user__controll center-xy  glassmorphism">
                                <svg width="32" height="32">
                                    <use href="#trash__linear"></use>
                                </svg>

                            </button>
                            <button id="userEditBtn"  class="user__controll center-xy  glassmorphism"  >
                            
                                <svg width="32" height="32">
                                    <use href="#edit__linear"></use>
                                </svg>

                            </button>
                            <button class="user__controll center-xy  glassmorphism" id="userBanBtn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
                              <g id="slash" transform="translate(0.5 0.5)">
                                <g id="vuesax_linear_slash" data-name="vuesax/linear/slash">
                                  <g id="slash-2" data-name="slash">
                                    <path id="Vector" d="M20,10A10,10,0,1,0,10,20,10,10,0,0,0,20,10Z" transform="translate(2 2)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" stroke-dasharray="0 0"/>
                                    <path id="Vector-2" data-name="Vector" d="M14,0,0,14" transform="translate(4.9 5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" stroke-dasharray="0 0"/>
                                    <path id="Vector-3" data-name="Vector" d="M24,0V24H0V0Z" fill="none" stroke="#fff" stroke-width="1" opacity="0"/>
                                  </g>
                                </g>
                              </g>
                            </svg>


                            </button>
                        </div>

                
            `
                );
              });
            })

            .catch(() => {
              console.clear();
              return false;
            });

          // location.reload();
        })
        .catch(() => {
          console.clear();
          return false;
        });

      userEl.classList.remove("user__edit__active");
      dashboardBlur.style.display = "none";
      userEl.style.zIndex = "unset";
    }

    //cancle updating
    if (event.target.closest("#user__btn_cancelChange")) {
      event.target.closest(".user").classList.remove("user__edit__active");
      dashboardBlur.style.display = "none";
      event.target.closest(".user").style.zIndex = "unset";
    }
  });

  // show all users

  getAllUsers()
    .then((users) => {
      users.forEach((user) => {
        usersTabContentItems.insertAdjacentHTML(
          "beforeend",
          `
                
                <div  data-profile="${user.profile}" data-username="${
            user.username
          }" data-role="${user.role}" data-fullname="${
            user.fullname
          }" data-id="${user._id}" class="user glassmorphism_2">
                        <label for="userProfileInput">
                            <div draggable="false" class="userprofileinputlable">پروفایلی بارگزاری کنید</div>
                            <input type="file" id="userProfileInput">
                            <img src="/images/landing/teachers/programmer.webp" alt="profile" draggable="false"
                                class="user__profile_img">
                        </label>
                        <img src="${
                          user.profile
                            ? user.profile
                            : "/images/landing/teachers/programmer.webp"
                        }" alt="profile" draggable="false"
                            class="user__profile_img">

                        <div class="user__details">
                            <h3 class="userFullName">${user.fullname}</h3>
                            <input type="text" name="" value="${
                              user.fullname
                            }" id="userFullNameInput">

                            <div class="user__role_box">
                                <svg width="32" height="32">
                                    <use href="#${
                                      user.role == "user"
                                        ? "profile__linear"
                                        : user.role == "admin"
                                        ? "userTick__linear"
                                        : user.role == "courseteacher"
                                        ? "teacher__linear"
                                        : user.role == "teacher"
                                        ? "profileTick__linear"
                                        : user.role == "author"
                                        ? "userEdit__linear"
                                        : user.role == "presentor"
                                        ? "tagUser__linear"
                                        : user.role == "manager"
                                        ? "crown__linear"
                                        : false
                                    }"></use>
                                </svg>
                                <p class="user__role">${
                                  user.role == "user"
                                    ? "کاربر"
                                    : user.role == "admin"
                                    ? "ادمین"
                                    : user.role == "courseteacher"
                                    ? "مدرس"
                                    : user.role == "teacher"
                                    ? "هنرآموز"
                                    : user.role == "author"
                                    ? "نویسنده"
                                    : user.role == "presentor"
                                    ? "مجری"
                                    : user.role == "manager"
                                    ? "مدیر"
                                    : false
                                }</p>

                            </div>

                              <select  id="userRoleSelect">
                                <option   value="user">کاربر</option>
                                <option value="courseteacher">مدرس</option>
                                <option value="teacher">هنرآموز</option>
                                <option value="admin">ادمین</option>
                                <option value="author">نویسنده</option>
                                <option  value="presentor">مجری</option>
                            </select>

                        </div>

                        <div class="user__edit__btns">
                          <button id="user__btn_confirmChange">تایید</button>
                        <button id="user__btn_cancelChange">لغو</button>
                        
                        </div>

                      


               

                        <div class="user__controlls">
                            <button id="userDeleteBtn" class="user__controll center-xy  glassmorphism">
                                <svg width="32" height="32">
                                    <use href="#trash__linear"></use>
                                </svg>

                            </button>
                            <button id="userEditBtn"  class="user__controll center-xy  glassmorphism"  >
                            
                                <svg width="32" height="32">
                                    <use href="#edit__linear"></use>
                                </svg>

                            </button>
                             <button id="userBanBtn" class="user__controll center-xy  glassmorphism" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
                              <g id="slash" transform="translate(0.5 0.5)">
                                <g id="vuesax_linear_slash" data-name="vuesax/linear/slash">
                                  <g id="slash-2" data-name="slash">
                                    <path id="Vector" d="M20,10A10,10,0,1,0,10,20,10,10,0,0,0,20,10Z" transform="translate(2 2)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" stroke-dasharray="0 0"/>
                                    <path id="Vector-2" data-name="Vector" d="M14,0,0,14" transform="translate(4.9 5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" stroke-dasharray="0 0"/>
                                    <path id="Vector-3" data-name="Vector" d="M24,0V24H0V0Z" fill="none" stroke="#fff" stroke-width="1" opacity="0"/>
                                  </g>
                                </g>
                              </g>
                            </svg>


                            </button>
                        </div>

                
            `
        );
      });
    })
    .catch(() => {
      console.clear();
      return false;
    });
};

const createNewUserFromAdminPanelHanler = () => {
  // const formData = new FormData();
  // formData.append("profile", "");
  // formData.append("username", userNameInput.value.trim());
  // formData.append("fullname", userFullNameInput.value.trim());
  // formData.append("password", passswordInput.value.trim());
  // formData.append("role", "user");

  const createNewUserBtn = $.querySelector("#createNewUserBtn");

  //blur hide/show handler
  createNewUserBtn.addEventListener("click", () => {
    const blur = $.querySelector(".dashboard__blur");
    blur.style.display = "block";
    blur.addEventListener("click", () => {
      blur.style.display = "none";
    });
  });
};

const adminDashboardRoutProtection = () => {
  if (JSON.parse(getLocalStorage("role")) !== "admin") {
    location.replace("/");
  }
};

window.addEventListener("load", () => {
  createNewItemHandler();
  sidebarHandler();
  courseStepperHandler();
  showAndUpdateUsers();
  filterUsersByRole();
  adminDashboardRoutProtection();
  createNewUserFromAdminPanelHanler();
});

export { showAndUpdateUsers };
