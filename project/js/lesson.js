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