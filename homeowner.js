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
const auth = firebase.auth();
const db = firebase.firestore();

function getHomeownerData(userEmail) {
    db.collection('userData').where('email', '==', userEmail).get().then((querySnapshot) => {
      if (!querySnapshot.empty) {
        var userData = querySnapshot.docs[0].data();
        var firstName = userData.firstName;
        var lastName = userData.lastName;
  
        db.collection('homeownerData').where('email', '==', userEmail).get().then((querySnapshot) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              var homeownerDataRef = db.collection('homeownerData').doc(doc.id);
              
              var data = doc.data();
  
              document.getElementById('guests').value = data.guests || '';
              document.getElementById('bedrooms').value = data.bedrooms || '';
              document.getElementById('bathrooms').value = data.bathrooms || '';
              document.getElementById('city').value = data.city || '';
              document.getElementById('country').value = data.country || '';
              document.getElementById('address').value = data.address || '';
              document.getElementById('title').value = data.title || '';
              document.getElementById('description').value = data.description || '';
              document.getElementById('price').value = data.price || '';
              document.getElementById('image').value = data.image || '';
  
              document.getElementById('homeownerForm').addEventListener('submit', function(event) {
                event.preventDefault();
  
                var guests = document.getElementById('guests').value;
                var bedrooms = document.getElementById('bedrooms').value;
                var bathrooms = document.getElementById('bathrooms').value;
                var city = document.getElementById('city').value;
                var country = document.getElementById('country').value;
                var address = document.getElementById('address').value;
                var title = document.getElementById('title').value;
                var description = document.getElementById('description').value;
                var price = document.getElementById('price').value;
                var image = document.getElementById('image').value;
  
                homeownerDataRef.set({
                  guests: guests,
                  bedrooms: bedrooms,
                  bathrooms: bathrooms,
                  city: city,
                  country: country,
                  address: address,
                  title: title,
                  description: description,
                  price: price,
                  image: image,
                  email: userEmail,
                  hostFirstName: firstName,
                  hostLastName: lastName,
                }).then(function() {
                  window.location.href = 'landingpage.html';
                });
              });
            });
          } else {
            console.log('No matching email in homeownerData. Creating new document.');
            db.collection('homeownerData').add({
              email: userEmail
            }).then((docRef) => {
              getHomeownerData(userEmail);
            }).catch((error) => {
              console.error('Error adding document: ', error);
            });
          }
        }).catch((error) => {
          console.error('Error reading from database:', error);
        });
      } else {
        console.log('No matching email in userData.');
      }
    }).catch((error) => {
      console.error('Error reading from database:', error);
    });
  }
  
  auth.onAuthStateChanged(function(user) {
    if (user) {
      var userEmail = user.email;
      getHomeownerData(userEmail);
    }
  });