import "./css/index.css"
import IMask from "imask"


const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")


function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    default: ["black", "grey"],
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

setCardType('visa')

//Card number
const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: "0000000000000000",
}

const cardNumberMask = IMask(cardNumber, cardNumberPattern)

//CVC number
const securityNumber = document.querySelector("#security-code")
const securityPattern = {
  mask: "0000",
}

const securityNumberMask = IMask(securityNumber, securityPattern)

//
const expitationDate = document.querySelector("#expiration-date")
const expitationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String((new Date().getFullYear()) + 5).slice(2),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
}

expitationDateMask = IMask(expitationDate, expitationDatePattern)




