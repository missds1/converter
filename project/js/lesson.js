const somInput = document.querySelector("#som")
const usdInput = document.querySelector("#usd")
const eurInput = document.querySelector("#eur")

// const converter = (el, targetEl1, targetEl2) => {
//     el.oninput = () => {
//         const xhr = new XMLHttpRequest()
//         xhr.open("GET", "../data/converter.json")
//         xhr.setRequestHeader("Content-type", "application/json")
//         xhr.send()
//         xhr.onload = () => {
//             const data = JSON.parse(xhr.response)
//             if (el.id === 'som') {
//                 targetEl1.value = (el.value / data.usd).toFixed(2)
//                 targetEl2.value = (el.value / data.eur).toFixed(2)
//             }
//              if (el.id === 'usd') {
//                 targetEl1.value = (el.value * data.usd).toFixed(2)
//                 targetEl2.value = ((el.value * data.usd) / data.eur).toFixed(2)
//             }
//              if (el.id === 'eur') {
//                 targetEl1.value = (el.value * data.eur).toFixed(2)
//                 targetEl2.value = ((el.value * data.eur) / data.usd).toFixed(2)
//             }
//              if (el.value === "") {
//                 targetEl1.value = ""
//                 targetEl2.value = ""
//             }
//         }
//     }
// }

// converter(somInput, usdInput, eurInput)
// converter(usdInput, somInput, eurInput)
// converter(eurInput, somInput, usdInput)

const converter = (el, targetEl1, targetEl2) => {
    el.oninput = async () => {
        try {
            const response = await fetch("../data/converter.json");
            const data = await response.json();

            if (el.value === "") {
                targetEl1.value = "";
                targetEl2.value = "";
                return;
            }

            if (el.id === 'som') {
                targetEl1.value = (el.value / data.usd).toFixed(2);
                targetEl2.value = (el.value / data.eur).toFixed(2);
            } else if (el.id === 'usd') {
                targetEl1.value = (el.value * data.usd).toFixed(2);
                targetEl2.value = ((el.value * data.usd) / data.eur).toFixed(2);
            } else if (el.id === 'eur') {
                targetEl1.value = (el.value * data.eur).toFixed(2);
                targetEl2.value = ((el.value * data.eur) / data.usd).toFixed(2);
            }
        } catch (error) {
            console.error("Ошибка конвертера:", error);
        }
    };
};

converter(somInput, usdInput, eurInput);
converter(usdInput, somInput, eurInput);
converter(eurInput, somInput, usdInput);



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

// function slide () {
//     fetch(`https://jsonplaceholder.typicode.com/todos/${cardIndex}`)
//     .then((response) => response.json())
//     .then((data) => {
//         const {title, completed, id} = data
//         card.innerHTML = `
//         <p>${title}<p>
//         <p style="color: ${completed ? "green" : "red"}">
//         ${completed}<p>
//         <span>${id}<span>
//         `
//     })

// }

// btnNext.onclick = () => {
//   cardIndex++
//   if (cardIndex > 200) cardIndex = 1
//   slide()
// }

// btnPrev.onclick = () => {
//   cardIndex--
//   if (cardIndex < 1) cardIndex = 200
//   slide()
// }
// slide()

// fetch('https://jsonplaceholder.typicode.com/posts')
// .then((response) => response.json())
// .then((data) => console.log(data))
async function slide() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${cardIndex}`);
        const data = await response.json();
        const { title, completed, id } = data;

        card.innerHTML = `
            <p>${title}</p>
            <p style="color: ${completed ? "green" : "red"}">${completed}</p>
            <span>${id}</span>
        `;
    } catch (error) {
        console.error("Ошибка карточек:", error);
    }
}

btnNext.onclick = () => {
    cardIndex++;
    if (cardIndex > 200) cardIndex = 1;
    slide();
};

btnPrev.onclick = () => {
    cardIndex--;
    if (cardIndex < 1) cardIndex = 200;
    slide();
};

slide();



const tabContentBlocks = document.querySelectorAll(".tab_content_block")
const tabsParent = document.querySelector(".tab_content_items")
const tabs = document.querySelectorAll(".tab_content_item")
let currentIndex = 0

const hideTabContent = () => {
    tabContentBlocks.forEach((block) => {
        block.style.display = 'none'
    })
    tabs.forEach((tab) => {
        tab.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (blockIndex = 0) => {
    tabContentBlocks[blockIndex].style.display = 'block'
    tabs[blockIndex].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent()

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item'))
        tabs.forEach((tab, index) => {
            if (event.target === tab) {
                hideTabContent()
                showTabContent(index)
            }
            
    })
}
setInterval(() => {
    currentIndex++

    if (currentIndex >= tabContentBlocks.length) {
        currentIndex = 0
    }

    hideTabContent()
    showTabContent(currentIndex)

}, 3000)


const searchInput = document.querySelector('#searchInput')
const searchBtn = document.querySelector('#search')
const city = document.querySelector(".city")
const temp = document.querySelector(".temp")
const API_KEY = '6b3c4c3188f1c83408df733c82ba9a0b'
const API = 'https://api.openweathermap.org/data/2.5/weather'

// searchBtn.onclick = () => {
//     fetch(`${API}?q=${searchInput.value}&units=metric&appid=${API_KEY}`)
//     .then((response) => response.json())
//     .then((data) => {
//         city.innerHTML = data.name
//         temp.innerHTML = Math.round(data.main.temp)
        
//     })
// }

searchBtn.onclick = async () => {
    try {
        const response = await fetch(`${API}?q=${searchInput.value}&units=metric&appid=${API_KEY}`);
        const data = await response.json();

        if (data.cod === 200) {
            city.innerHTML = data.name;
            temp.innerHTML = Math.round(data.main.temp);
        } else {
            city.innerHTML = "Город не найден";
            temp.innerHTML = "";
        }
    } catch (error) {
        console.error("Ошибка погоды:", error);
    }
};

