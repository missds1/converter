const somInput = document.querySelector("#som")
const usdInput = document.querySelector("#usd")
const eurInput = document.querySelector("#eur")

const converter = (el, targetEl1, targetEl2) => {
    el.oninput = () => {
        const xhr = new XMLHttpRequest()
        xhr.open("GET", "../data/converter.json")
        xhr.setRequestHeader("Content-type", "application/json")
        xhr.send()
        xhr.onload = () => {
            const data = JSON.parse(xhr.response)
            if (el.id === 'som') {
                targetEl1.value = (el.value / data.usd).toFixed(2)
                targetEl2.value = (el.value / data.eur).toFixed(2)
            }
             if (el.id === 'usd') {
                targetEl1.value = (el.value * data.usd).toFixed(2)
                targetEl2.value = ((el.value * data.usd) / data.eur).toFixed(2)
            }
             if (el.id === 'eur') {
                targetEl1.value = (el.value * data.eur).toFixed(2)
                targetEl2.value = ((el.value * data.eur) / data.usd).toFixed(2)
            }
             if (el.value === "") {
                targetEl1.value = ""
                targetEl2.value = ""
            }
        }
    }
}

converter(somInput, usdInput, eurInput)
converter(usdInput, somInput, eurInput)
converter(eurInput, somInput, usdInput)


const phoneInput = document.querySelector('#phone_input')
const phoneBtn = document.querySelector('#phone_button')
const phoneRes = document.querySelector('#phone_result')

const regExp = /\+996 [5729]\d{2} \d{2}-\d{2}-\d{2}/

phoneBtn.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneRes.innerText = 'OK'
        phoneRes.style.color = 'green'
    } else {
        phoneRes.innerText = 'NOT OK'
        phoneRes.style.color = 'red'
    }
}

const card = document.querySelector(".card")
const btnNext = document.querySelector("#btn-next")
const btnPrev = document.querySelector('#btn-prev')
let cardIndex = 1

function slide () {
    fetch(`https://jsonplaceholder.typicode.com/todos/${cardIndex}`)
    .then((response) => response.json())
    .then((data) => {
        const {title, completed, id} = data
        card.innerHTML = `
        <p>${title}<p>
        <p style="color: ${completed ? "green" : "red"}">
        ${completed}<p>
        <span>${id}<span>
        `
    })

}

btnNext.onclick = () => {
  cardIndex++
  if (cardIndex > 200) cardIndex = 1
  slide()
}

btnPrev.onclick = () => {
  cardIndex--
  if (cardIndex < 1) cardIndex = 200
  slide()
}
slide()

fetch('https://jsonplaceholder.typicode.com/posts')
.then((response) => response.json())
.then((data) => console.log(data))
