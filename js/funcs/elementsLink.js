const $ = document



const elementsLinkHandler = () => {

    /* ------------------------ popular Course Elem Start ----------------------- */
    const popularCourseElems = $.querySelectorAll(".popular-course")
    popularCourseElems.forEach(item => {
        item.addEventListener("click", () => {
            location.href = "course.html"
        })
    })
    /* ------------------------- popular Course Elem End ------------------------ */


    /* -------------------- presentation Category Item Start -------------------- */
    const presentationCategoryItems = $.querySelectorAll(".presentations-category-item")
    presentationCategoryItems.forEach(item => {
        item.addEventListener("click", () => {
            location.href = "all-presentations.html"
        })
    })

    /* --------------------- presentation Category Item End --------------------- */


    /* ------------------------- presentaion Item Start ------------------------- */
    const presentaionItems = $.querySelectorAll(".all_presentations_presentations-category-item")

    presentaionItems.forEach(item => {
        item.addEventListener("click", () => {
            location.href = "presentation.html"
        })
    })

    /* -------------------------- presentaion Item End -------------------------- */


    /* ------------------------- article Category Start ------------------------- */
    const articleCategoryItems = $.querySelectorAll(".article")
    articleCategoryItems.forEach(item => {
        item.addEventListener("click", () => {
            location.href = "all-articles.html"
        })
    })
    /* -------------------------- article Category End -------------------------- */


    /* --------------------------- article Item Start --------------------------- */
    const articleItems = $.querySelectorAll(".all_articles_article")
    articleItems.forEach(item => {
        item.addEventListener("click", () => {
            location.href = "article.html"
        })
    })
    /* ---------------------------- article Item End ---------------------------- */

    /* -------------------------- course Category Start ------------------------- */
    const courseCategoryItems = $.querySelectorAll(".course-category")
    courseCategoryItems.forEach(item => {
        item.addEventListener("click", () => {
            location.href = "course-subcategory.html"
        })
    })
    /* --------------------------- course Category End -------------------------- */

}







export {
    elementsLinkHandler

}