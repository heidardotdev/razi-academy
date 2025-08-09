const $ = document





const InfoIcon = `

            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM12 8v5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.995 16h.009" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>


`


const dangerIcon = `

            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 9v5M12 21.41H5.94c-3.47 0-4.92-2.48-3.24-5.51l3.12-5.62L8.76 5c1.78-3.21 4.7-3.21 6.48 0l2.94 5.29 3.12 5.62c1.68 3.03.22 5.51-3.24 5.51H12v-.01Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.995 17h.009" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>


`




/* -------------------------------------------------------------------------- */
/*                             successStatusModal                             */
/* -------------------------------------------------------------------------- */

const successStatusModalTemplate = $.createElement("template")
successStatusModalTemplate.innerHTML = `

    <link rel="stylesheet" href="/components/success_status_modal/style.css">
    <link rel="stylesheet" href="../css/fonts.css">
    <link rel="stylesheet" href="../css/responsive.css">
    <link rel="stylesheet" href="../css/variables.css">
    <link rel="stylesheet" href="../css/defulat-style.css">
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
            <slot name="regestration__Title" class="status__modal_title" id="regestration__Title"></slot>
            <slot name="status__modal_text" class="status__modal_text"></slot>
            <p class="status__modal_timelinetext">انتقال به داشبورد پس از ۵ ثانیه</p>
        </div>

        <div class="status__modal_btns">
            <a href="/" class="status__modal_btn">رازی آکادمی</a>
            <a href="dashboard.html" class="status__modal_btn status__modal_btn_important">داشبورد</a>
        </div>


        <span class="status__modal_timeline"></span>


    </div>


       
        




`

class successStatusModal extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(successStatusModalTemplate.content.cloneNode(true))


        const timeLineElem = this.shadowRoot.querySelector(".status__modal_timeline")
        const timeLineElemText = this.shadowRoot.querySelector(".status__modal_timelinetext")
        let timeLineElemTime = 5
        let timeLineElemWidth = 0

        const timer = setInterval(() => {
            timeLineElemWidth += 20
            
            if(timeLineElemWidth === 100){
                clearInterval(timer)
                location.href = "dashboard.html"
            }


            timeLineElemText.innerHTML = `انتقال به داشبورد پس از ${--timeLineElemTime} ثانیه`
            timeLineElem.style.width = `calc(100% - ${timeLineElemWidth}%)`
        }, 1000);

    }
}



export {
    successStatusModal,
    

}