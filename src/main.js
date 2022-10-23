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

const expitationDateMask = IMask(expitationDate, expitationDatePattern)

//Card number
const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardType: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2}\d{0,12})/,
      cardType: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    },
  ],

  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item){
      return number.match(item.regex)
    })

    console.log(foundMask)

    return foundMask
  },

  
}

const typeOFcard = IMask(cardNumber, cardNumberPattern)


const addButton = document.querySelector('#button')
addButton.addEventListener("click", () => {
  alert('Cartão adicionado!!')
})

document.querySelector('form').addEventListener("submit", (event) => {
  event.preventDefault()
})


const inputName = document.querySelector("#card-holder")
inputName.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")
  ccHolder.innerText = inputName.value.length === 0 ? 'FULANO DE TAL': inputName.value
  
})

securityNumberMask.on("accept", () => {
    updateSecurityCode(securityNumberMask.value);
})


function updateSecurityCode (code){
  const ccSecurity = document.querySelector(".cc-security .value")
  ccSecurity.innerHTML = code.length === 0? "123" : code
}


typeOFcard.on("accept", () => {
  const cardType = typeOFcard.masked.currentMask.cardType
  setCardType(cardType)
  updateCardNumber(typeOFcard.value)
})


function updateCardNumber(number){
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText = number.length === 0 ? "0000 0000 0000 0000" : number
}

expitationDateMask.on("accept", () => {
  UpdateexpirationDateCard(expitationDateMask.value)
})

function UpdateexpirationDateCard(date){
  const ccExpitationDate = document.querySelector(".cc-extra .value")
  ccExpitationDate.innerHTML = date.length === 0? "01/23" : date
}

