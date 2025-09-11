

const successStatusModalTemplate = $.createElement("template")
successStatusModalTemplate.innerHTML = `

    <link rel="stylesheet" href="/components/success_status_modal/style.css">
    <link rel="stylesheet" href="../css/fonts.css">
    <link rel="stylesheet" href="../css/responsive.css">
    <link rel="stylesheet" href="../css/variables.css">
    <link rel="stylesheet" href="../css/defulat-style.css">
   

       
        




`

class successStatusModal extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(successStatusModalTemplate.content.cloneNode(true))


       

    }
}



export {
    successStatusModal,
    

}