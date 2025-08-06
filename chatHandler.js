// chatHandler.js

const chatMessagesDiv = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSend');

let chatMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');

function loadChat() {
  chatMessagesDiv.innerHTML='';
  chatMessages.forEach(msg => {
    const div=document.createElement('div');
    div.textContent=msg;
    chatMessagesDiv.appendChild(div);
  });
}
function saveChat() {
  localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
}

// Load existing messages
loadChat();

chatSendBtn.onclick=()=> {
  const msg= chatInput.value.trim();
  if(!msg) return;
  chatMessages.push(msg);
  saveChat();
  const div=document.createElement('div');
  div.textContent=msg;
  chatMessagesDiv.appendChild(div);
  chatInput.value='';
};
chatInput.onkeydown=(e)=> {
  if(e.key==='Enter') chatSendBtn.click();
};