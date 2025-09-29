import { getAllUsers } from "../funcs/shared.js";
import { filterUsersByRole } from "../shared.js";
import { getLocalStorage, isSignedIn } from "../funcs/utils.js";

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

const showAllUsers = () => {
  const usersTabContentItems = $.querySelector("#users .tab__content__items");

  usersTabContentItems.addEventListener("click", (event) => {
    const updateUserInfo = {
      _id: event.target.closest(".user").dataset.id,
      username: event.target.closest(".user").dataset.username,
      fullname: document.querySelector("#userFullNameInput").value,
      profile: document.querySelector("#userProfileInput").value,
      role: document.querySelector("#userRoleSelect").value,
    };

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

    if (event.target.closest("#user__btn_cancelChange")) {
      event.target.closest(".user").classList.remove("user__edit__active");
      dashboardBlur.style.display = "none";
      event.target.closest(".user").style.zIndex = "unset";
    }

    if (event.target.closest("#user__btn_confirmChange")) {
      event.target.closest(".user").classList.remove("user__edit__active");
      dashboardBlur.style.display = "none";
      event.target.closest(".user").style.zIndex = "unset";
      console.log(updateUserInfo);
    }
  });

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
                        <img src="/images/landing/teachers/programmer.webp" alt="profile" draggable="false"
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
                            <button class="user__controll center-xy  glassmorphism">
                                <svg width="32" height="32">
                                    <use href="#userEdit__linear"></use>
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

const adminDashboardRoutProtection = () => {
  if (JSON.parse(getLocalStorage("role")) !== "admin") {
    location.replace("/");
  }
};

window.addEventListener("load", () => {
  createNewItemHandler();
  sidebarHandler();
  courseStepperHandler();
  showAllUsers();
  filterUsersByRole();
  adminDashboardRoutProtection();
});

export { showAllUsers };
