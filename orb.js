// orb.js
// Controls orb glow, ripple, hover glow, and pulse effects

export function initOrb() {
  const orb = document.getElementById('centralOrb');
  const adminDot = document.getElementById('adminDot');

  // Hover glow
  orb.addEventListener('mouseenter', () => {
    orb.style.boxShadow = '0 0 25px #00aaff';
  });
  orb.addEventListener('mouseleave', () => {
    orb.style.boxShadow = '0 0 15px #00aaff';
  });

  // Ripple pulse animation (via CSS keyframes)
  // Additional pulse effect
  setInterval(() => {
    orb.animate([
      { boxShadow: '0 0 15px #00aaff' },
      { boxShadow: '0 0 20px #00aaff' },
      { boxShadow: '0 0 15px #00aaff' }
    ], {
      duration: 3000,
      iterations: 1
    });
  }, 3000);

  // Admin Dot pulse glow
  setInterval(() => {
    adminDot.animate([
      { boxShadow: '0 0 8px #00aaff' },
      { boxShadow: '0 0 16px #00aaff' },
      { boxShadow: '0 0 8px #00aaff' }
    ], {
      duration: 2000,
      iterations: 1
    });
  }, 5000);
}