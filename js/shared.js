import { getAllCourses } from "./funcs/shared.js";
const $ = document


const showLastCourses = () => {
    getAllCourses().then(courses => {
        const lastCoursesContainer = $.querySelector("#last-courses")
        courses.slice(0,8).map(course => {
            lastCoursesContainer.insertAdjacentHTML("beforeend", `
                
                <div class="course">
                    <img src="${course.cover}" alt="${course.title}" class="course__cover">
                    <div class="course-box">
                        <div class="course-box__items">
                            <div class="course-conent">
                                <h2 class="course-info__title">${course.title}</h2>
                                <p class="course-info__caption">${course.description}</p>
                            </div>
                            <div class="course__detail  items-center-justify-between">
                                <div class="course-teacher-box">
                                    <svg class="course-teacher__icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                                        <path d="m14.44 19.05 1.52 1.52L19 17.53M12.16 10.87c-.1-.01-.22-.01-.33 0a4.42 4.42 0 0 1-4.27-4.43A4.428 4.428 0 0 1 11.99 2c2.45 0 4.44 1.99 4.44 4.44 0 2.4-1.9 4.35-4.27 4.43ZM11.99 21.81c-1.82 0-3.63-.46-5.01-1.38-2.42-1.62-2.42-4.26 0-5.87 2.75-1.84 7.26-1.84 10.01 0" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                    <h4 class="course-teacher__fullname">${course.courseTeacherID.userFullName}</h4>
                                </div>
                                <div class="course-rate">
                                    <span class="course-rate__number">5</span>
                                    <svg class="course-rate__icon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.6672 1.87183L16.8678 6.27299C17.1679 6.87315 17.9681 7.47331 18.635 7.57334L22.6193 8.24018C25.17 8.67363 25.7702 10.5074 23.9364 12.3413L20.8355 15.4587C20.3187 15.9756 20.0187 16.9925 20.1854 17.726L21.0689 21.577C21.7691 24.6112 20.152 25.7948 17.468 24.2111L13.7337 21.9938C13.0501 21.5937 11.9499 21.5937 11.2663 21.9938L7.51535 24.1944C4.83131 25.7781 3.21422 24.5945 3.9144 21.5604L4.79797 17.7093C4.96468 16.9925 4.6646 15.9756 4.14779 15.4421L1.06365 12.3579C-0.77017 10.5241 -0.170011 8.67363 2.38066 8.25685L6.36505 7.59001C7.03189 7.47331 7.8321 6.88982 8.13218 6.28966L10.3328 1.8885C11.5164 -0.512131 13.4836 -0.512132 14.6672 1.87183Z" fill="#F59E0B"></path>
                                    </svg>

                                </div>
                            </div>
                        </div>
                        <a href="course-details.html" class="btn">
                            جزئیات دوره
                            <svg class="popular-course__go-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                                <path stroke="#FF8A65" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 11l8.2-8.2M22 6.8V2h-4.8M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2">
                                </path>
                            </svg>


                        </a>
                    </div>
                </div>

                `)

        })


        



    })

}

const showAllCourses = () => {
        getAllCourses().then(courses => {
        const lastCoursesContainer = $.querySelector("#last-courses")
        courses.map(course => {
            lastCoursesContainer.insertAdjacentHTML("beforeend", `
                
                <div class="course">
                    <img src="${course.cover}" alt="${course.title}" class="course__cover">
                    <div class="course-box">
                        <div class="course-box__items">
                            <div class="course-conent">
                                <h2 class="course-info__title">${course.title}</h2>
                                <p class="course-info__caption">${course.description}</p>
                            </div>
                            <div class="course__detail  items-center-justify-between">
                                <div class="course-teacher-box">
                                    <svg class="course-teacher__icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                                        <path d="m14.44 19.05 1.52 1.52L19 17.53M12.16 10.87c-.1-.01-.22-.01-.33 0a4.42 4.42 0 0 1-4.27-4.43A4.428 4.428 0 0 1 11.99 2c2.45 0 4.44 1.99 4.44 4.44 0 2.4-1.9 4.35-4.27 4.43ZM11.99 21.81c-1.82 0-3.63-.46-5.01-1.38-2.42-1.62-2.42-4.26 0-5.87 2.75-1.84 7.26-1.84 10.01 0" stroke="#FF8A65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                    <h4 class="course-teacher__fullname">${course.courseTeacherID.userFullName}</h4>
                                </div>
                                <div class="course-rate">
                                    <span class="course-rate__number">5</span>
                                    <svg class="course-rate__icon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.6672 1.87183L16.8678 6.27299C17.1679 6.87315 17.9681 7.47331 18.635 7.57334L22.6193 8.24018C25.17 8.67363 25.7702 10.5074 23.9364 12.3413L20.8355 15.4587C20.3187 15.9756 20.0187 16.9925 20.1854 17.726L21.0689 21.577C21.7691 24.6112 20.152 25.7948 17.468 24.2111L13.7337 21.9938C13.0501 21.5937 11.9499 21.5937 11.2663 21.9938L7.51535 24.1944C4.83131 25.7781 3.21422 24.5945 3.9144 21.5604L4.79797 17.7093C4.96468 16.9925 4.6646 15.9756 4.14779 15.4421L1.06365 12.3579C-0.77017 10.5241 -0.170011 8.67363 2.38066 8.25685L6.36505 7.59001C7.03189 7.47331 7.8321 6.88982 8.13218 6.28966L10.3328 1.8885C11.5164 -0.512131 13.4836 -0.512132 14.6672 1.87183Z" fill="#F59E0B"></path>
                                    </svg>

                                </div>
                            </div>
                        </div>
                        <a href="course-details.html" class="btn">
                            جزئیات دوره
                            <svg class="popular-course__go-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                                <path stroke="#FF8A65" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 11l8.2-8.2M22 6.8V2h-4.8M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2">
                                </path>
                            </svg>


                        </a>
                    </div>
                </div>

                `)

        })


        



    })

}

export {
    showLastCourses, 
    showAllCourses
}
