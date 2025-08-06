// cloak.js
export function toggleStealth() {
  const stealth = document.body.getAttribute('data-stealth')==='true';
  if (stealth) {
    document.body.setAttribute('data-stealth','false');
    document.title='VOID Ultra';
    document.getElementById('favicon').href='stealth/favicons/stealth.ico';
  } else {
    document.body.setAttribute('data-stealth','true');
    document.title='Stealth Mode Active';
    document.getElementById('favicon').href='stealth/favicons/stealth.ico';
  }
}