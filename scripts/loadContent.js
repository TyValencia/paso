/*
Paso WebApp Demo
by Ty Valencia
CMSI3801, ENTR4380
Fall 2023
*/

/* Display header and footer ---------------------------------------------- */
function getRootPath() {
    return window.location.pathname.includes('pages/') ? '../' : '';
}

function loadHeader() {
  fetch(`${getRootPath()}pages/header.html`)
      .then(response => response.text())
      .then(data => {
          const header = document.getElementById('header');
          header.innerHTML = data;

          const firebaseAppScript = document.createElement('script');
          firebaseAppScript.src = 'https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js';
          header.appendChild(firebaseAppScript);

          const firebaseAuthScript = document.createElement('script');
          firebaseAuthScript.src = 'https://www.gstatic.com/firebasejs/8.6.1/firebase-auth.js';
          header.appendChild(firebaseAuthScript);

          const firebaseFirestoreScript = document.createElement('script');
          firebaseFirestoreScript.src = 'https://www.gstatic.com/firebasejs/8.6.1/firebase-firestore.js';
          firebaseFirestoreScript.onload = function() {
              const script = document.createElement('script');
              script.src = `${getRootPath()}scripts/header.js`; 
              header.appendChild(script);
          };
          header.appendChild(firebaseFirestoreScript);
      })
      .catch(error => console.error('Error loading header:', error));
}
function loadFooter() {
    fetch(`${getRootPath()}pages/footer.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadHeader();
    loadFooter();
});