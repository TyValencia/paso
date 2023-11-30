/*
Paso WebApp Demo
by Ty Valencia
CMSI3801, ENTR4380
Fall 2023
*/

/* Display header and footer ---------------------------------------------- */
function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
}

function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

loadHeader();
loadFooter();

/* Home owner data -------------------------------------------------------- */
fetch('data/clientData.json')
  .then(response => response.json())
  .then(houses => {
    displayHouses(houses);
  })
  .catch(error => console.error('Error:', error));

function displayHouses(houses) {
  const container = document.getElementById('house-list'); 
  houses.forEach(house => {
    const houseElement = document.createElement('div');
    houseElement.className = 'house-container';
    houseElement.innerHTML = `
      <img src="images/${house.image}" alt="${house.title}">
      <h3>${house.title}</h3>
      <p>Posted by ${house.host}</p>
      <p>${house.city}, ${house.country}</p>
      <p>${house.bedrooms} Bedrooms, ${house.bathrooms} Bathrooms for $${house.price}</p>
    `;
    container.appendChild(houseElement);
  });
}