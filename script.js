// script.js

// Save chat messages to localStorage
function saveMessage(msg) {
  const msgs = JSON.parse(localStorage.getItem('chatMessages') || '[]');
  msgs.push(msg);
  localStorage.setItem('chatMessages', JSON.stringify(msgs));
}

// Load chat messages from localStorage
function loadMessages() {
  const msgs = JSON.parse(localStorage.getItem('chatMessages') || '[]');
  const chatMessages = document.getElementById('chatMessages');
  if (chatMessages) {
    chatMessages.innerHTML = '';
    msgs.forEach(msg => {
      const div = document.createElement('div');
      div.textContent = msg;
      chatMessages.appendChild(div);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // Load chat history
  loadMessages();

  // Setup stealth toggle
  const stealthToggle = document.getElementById('stealthModeToggle');
  if (stealthToggle) {
    updateStealthMode(stealthToggle.checked);
    stealthToggle.addEventListener('change', (e) => {
      updateStealthMode(e.target.checked);
    });
  }

  // Handle Surf button
  const surfBtn = document.getElementById('surfBtn');
  const urlInput = document.getElementById('urlInput');
  if (surfBtn && urlInput) {
    surfBtn.addEventListener('click', () => {
      const url = urlInput.value.trim();
      if (url) {
        openIframeWithFallback(url);
      }
    });
  }

  // Admin Dot click
  const adminDot = document.getElementById('adminDot');
  const adminModal = document.getElementById('adminModal');
  const closeAdminBtn = document.getElementById('closeAdmin');

  if (adminDot && adminModal) {
    adminDot.addEventListener('click', () => {
      adminModal.classList.remove('hidden');
      // Initialize admin user states
      updateAdminUserButtons();
    });
  }
  if (closeAdminBtn) {
    closeAdminBtn.onclick = () => {
      adminModal.classList.add('hidden');
    };
  }

  // Wipe chat history
  const wipeBtn = document.getElementById('wipeHistoryBtn');
  if (wipeBtn) {
    wipeBtn.onclick = () => {
      localStorage.removeItem('chatMessages');
      loadMessages();
      alert('Chat history wiped!');
    };
  }

  // Chat send
  const chatSendBtn = document.getElementById('chatSend');
  const chatInput = document.getElementById('chatInput');
  if (chatSendBtn && chatInput) {
    chatSendBtn.onclick = () => {
      sendChatMessage();
    };
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        sendChatMessage();
      }
    });
  }

  // Admin user block/unblock buttons
  document.querySelectorAll('.blockBtn').forEach(btn => {
    btn.onclick = () => {
      const user = btn.dataset.user;
      toggleUserBlock(user, true);
    };
  });
  document.querySelectorAll('.unblockBtn').forEach(btn => {
    btn.onclick = () => {
      const user = btn.dataset.user;
      toggleUserBlock(user, false);
    };
  });
});

// Send chat message
function sendChatMessage() {
  const input = document.getElementById('chatInput');
  if (input && input.value.trim() !== '') {
    const msg = input.value.trim();
    saveMessage(msg);
    loadMessages();
    input.value = '';
  }
}

// Update stealth mode visuals
function updateStealthMode(isStealth) {
  const root = document.documentElement;
  const favicon = document.getElementById('favicon');
  const orb = document.getElementById('centralOrb');
  const adminDot = document.getElementById('adminDot');
  const navRight = document.querySelector('.nav-right');

  if (isStealth) {
    root.setAttribute('data-stealth', 'true');
    if (navRight) navRight.style.display = 'none';
    if (favicon) favicon.href = 'stealth/favicons/stealth.ico'; // stealth icon
    if (orb) orb.style.display = 'none'; // hide orb
    if (adminDot) adminDot.style.display = 'block'; // show adminDot
  } else {
    root.setAttribute('data-stealth', 'false');
    if (navRight) navRight.style.display = 'flex';
    if (favicon) favicon.href = 'stealth/favicons/stealth.ico'; // default icon
    if (orb) orb.style.display = 'block';
    if (adminDot) adminDot.style.display = 'none';
  }
}

// Open URL in iframe with fallback safety
function openIframeWithFallback(url) {
  const container = document.getElementById('iframeContainer');
  const modal = document.getElementById('iframeModal');

  if (!container || !modal) return;

  container.innerHTML = '';

  const iframe = document.createElement('iframe');

  let iframeLoaded = false;

  try {
    iframe.src = url;
  } catch (e) {
    showFallback();
    return;
  }

  iframe.onload = () => {
    iframeLoaded = true;
  };

  container.appendChild(iframe);

  // Fallback timeout
  setTimeout(() => {
    if (!iframeLoaded) {
      showFallback();
    }
  }, 5000);

  modal.classList.remove('hidden');

  const closeBtn = document.getElementById('closeIframe');
  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.classList.add('hidden');
      container.innerHTML = '';
    };
  }

  function showFallback() {
    container.innerHTML = '<iframe src="fallback.html" style="width:100%; height:80vh; border:none;"></iframe>';
  }
}

// Admin user management (block/unblock)
function toggleUserBlock(username, block) {
  const userDiv = document.querySelector(`.user[data-user="${username}"]`);
  if (userDiv) {
    const blockBtn = userDiv.querySelector('.blockBtn');
    const unblockBtn = userDiv.querySelector('.unblockBtn');

    if (block) {
      // Block user
      if (blockBtn) blockBtn.style.display = 'none';
      if (unblockBtn) unblockBtn.style.display = 'inline-block';
      // Optional: add visual indication of block
      userDiv.style.opacity = '0.5';
    } else {
      // Unblock user
      if (blockBtn) blockBtn.style.display = 'inline-block';
      if (unblockBtn) unblockBtn.style.display = 'none';
      userDiv.style.opacity = '1';
    }
  }
}

// Update admin user buttons based on stored state (if persistent)
function updateAdminUserButtons() {
  // Example: Hardcoded users, you could extend this to store state
  ['TheAlpha', 'TheMonkey', 'TanTan'].forEach(user => {
    const userDiv = document.querySelector(`.user[data-user="${user}"]`);
    if (userDiv) {
      // For demonstration, assume all are unblocked initially
      // You can extend this to save states in localStorage
      toggleUserBlock(user, false);
    }
  });
}