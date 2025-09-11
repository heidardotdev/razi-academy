const $ = document







/* -------------------------------------------------------------------------- */
/*                             successStatusModal                             */
/* -------------------------------------------------------------------------- */

const dangerStatusModalTemplate = $.createElement("template")
dangerStatusModalTemplate.innerHTML = `

    <link rel="stylesheet" href="/components/danger_status_modal/style.css">
    <link rel="stylesheet" href="../css/fonts.css">
    <link rel="stylesheet" href="../css/responsive.css">
    <link rel="stylesheet" href="../css/variables.css">
    <link rel="stylesheet" href="../css/defulat-style.css">



       
        




`

class dangertatusModal extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(dangerStatusModalTemplate.content.cloneNode(true))






    }
}



export {
    dangertatusModal,


}