// surfHandler.js
import { openModal } from './modules.js';

export function initSurf() {
  const surfBtn = document.getElementById('surfBtn');
  const urlInput = document.getElementById('urlInput');

  surfBtn.onclick = () => {
    const url = urlInput.value.trim();
    if (!url) return;
    openModal(url);
  };
}