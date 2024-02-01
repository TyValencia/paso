/*
Paso WebApp Demo
by Ty Valencia
CMSI3801, ENTR4380
Fall 2023
*/

const firebaseConfig = {
    apiKey: "AIzaSyCd5MzlOjjihklGRohw_7DL5EPYwBIhsZ0",
    authDomain: "paso-6529c.firebaseapp.com",
    projectId: "paso-6529c",
    storageBucket: "paso-6529c.appspot.com",
    messagingSenderId: "782304436248",
    appId: "1:782304436248:web:1365c4267de10275db236d"
};

firebase.initializeApp(firebaseConfig);

async function createHouseHTML(house) {
    if (!house) {
        console.error('House object is undefined');
        return '';
    }

    var image = house.image || '';
    var title = house.title || '';
    var city = house.city || '';
    var country = house.country || '';
    var bedrooms = house.bedrooms || '';
    var bathrooms = house.bathrooms || '';
    var price = house.price || '';

    var imageUrl = image.startsWith('http') ? image : `images/${image}`;

    return `
        <div class="house-item">
            <div class="house-container">
                <img src="${imageUrl}" alt="${title}">
                <h3>${title}</h3>
                <p>Posted by ${house.hostFirstName} ${house.hostLastName}</p>
                <p>${city}, ${country}</p>
                <p>${bedrooms} Bedrooms, ${bathrooms} Bathrooms for $${price}</p>
            </div>
        </div>
    `;
}

async function displayHouses(houses) {
    const housesHTML = await Promise.all(houses.map(createHouseHTML));
    var housesContainer = document.getElementById('housesContainer');
    if (housesContainer) {
        housesContainer.innerHTML = housesHTML.join('');
    } else {
        console.error('Element with ID "housesContainer" does not exist');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    firebase.firestore().collection('homeownerData').get()
        .then(querySnapshot => {
            const houses = querySnapshot.docs.map(doc => doc.data());
            displayHouses(houses);
        })
        .catch(error => console.error('Error:', error));
});
