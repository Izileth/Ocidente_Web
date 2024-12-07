/*Ajuste na responsividade através de Javascript*/

const styleElement = {
    sm: "600px",
    md: "900px",
    bg: "1100px",
}

const styleSize = {
    sm: "(max-width: ${styleElement.sm})", 
    md: "(max-width: ${styleElement.md})",
    bg: "(max-width: ${styleElement.bg})",
}

export default styleSize