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

  const moveBlock = (px) => {
    if (px < 450) {
      child.style.left = px + 'px';
      requestAnimationFrame(() => moveBlock(px + 1));
    }
  };
 moveBlock(0);