// adminHandler.js

// Define admin users
const adminUsers = [
  { name: 'TheAlpha', id: 'TheAlpha', blocked: false },
  { name: 'TheMonkey', id: 'TheMonkey', blocked: false },
  { name: 'TanTan', id: 'TanTan', blocked: false }
];

// Generate admin user controls dynamically
const adminContainer = document.querySelector('#adminModal');
adminUsers.forEach(user => {
  const userDiv = document.createElement('div');
  userDiv.className='user';
  userDiv.dataset.user=user.id;
  userDiv.innerHTML= `
    <span>${user.name}</span>
    <button class="blockBtn" data-user="${user.id}">Block</button>
    <button class="unblockBtn" data-user="${user.id}" style="display:none;">Unblock</button>
  `;
  adminContainer.appendChild(userDiv);
});

// Block/Unblock logic
document.querySelectorAll('.blockBtn').forEach(btn => {
  btn.onclick=()=> {
    const userId= btn.dataset.user;
    const user= adminUsers.find(u=>u.id===userId);
    if(user){ user.blocked=true; }
    const userDiv= document.querySelector(`.user[data-user="${userId}"]`);
    userDiv.style.opacity='0.3';
    btn.style.display='none';
    userDiv.querySelector('.unblockBtn').style.display='inline-block';
  };
});
document.querySelectorAll('.unblockBtn').forEach(btn => {
  btn.onclick=()=> {
    const userId= btn.dataset.user;
    const user= adminUsers.find(u=>u.id===userId);
    if(user){ user.blocked=false; }
    const userDiv= document.querySelector(`.user[data-user="${userId}"]`);
    userDiv.style.opacity='1';
    btn.style.display='none';
    userDiv.querySelector('.blockBtn').style.display='inline-block';
  };
});

// Admin popup trigger
const adminDot = document.getElementById('adminDot');
adminDot.onclick=()=> {
  document.getElementById('adminModal').classList.toggle('hidden');
};