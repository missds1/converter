const gmailInput = document.querySelector('#gmail_input')
const gmailBtn = document.querySelector('#gmail_button')
const gmailRes = document.querySelector('#gmail_result')

const gmailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.com$/;

gmailBtn.onclick = () => {
    if (gmailRegex.test(gmailInput.value)) {
        gmailRes.innerText = 'OK';
        gmailRes.style.color = 'green';
  } else {
        gmailRes.innerText = 'NOT OK';
        gmailRes.style.color = 'red';
  }
}

const child = document.querySelector('.child_block');

let x = 0,
    y = 0;


const moveBlock = () => {
    child.style.left = x + "px"
    child.style.top = y + 'px'
  if (x<=450 && y<=0) {
    x++
    requestAnimationFrame(moveBlock)
  } else if (x>=450 && y<=450) {
    y++
    requestAnimationFrame(moveBlock)
  }else if (x>=0 && y>=450) {
    x--
    requestAnimationFrame(moveBlock)
  }else if (y>=0 && x<=450) {
    y--
    requestAnimationFrame(moveBlock)
  }
 
  
};

moveBlock();


const timer = document.querySelector('#seconds')
const btnStart = document.querySelector('#start')
const btnStop = document.querySelector('#stop')
const btnRestart = document.querySelector('#reset')
let num 
let interval
let numRes

const countdown = (time) => {
  if (num === undefined) {
      num = time
  }
  numRes = time

  timer.innerHTML = num
 
  clearInterval(interval)
  
  interval = setInterval(() => {
    num++
    
    timer.innerHTML = num
    
    if (num <= 0) {
      clearInterval(interval)
      interval = null
    }
  }, 100);

};

btnStart.addEventListener('click', () => countdown(0))
btnStop.addEventListener('click', () => {
  clearInterval(interval)
})
btnRestart.addEventListener('click', () => {
  clearInterval(interval)
  num = numRes
  timer.innerHTML = num
})