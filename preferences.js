/*
Paso WebApp Demo
by Ty Valencia
CMSI3801, ENTR4380
Fall 2023
*/

import { matchUsersAndHomes } from './matchmaking.js';

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

function getUserPreferences(db, userEmail) {
    db.collection('userPreferences').where('email', '==', userEmail).get().then((querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          var userPreferencesRef = db.collection('userPreferences').doc(doc.id);
          
          var data = doc.data();
  
          document.getElementById('bathrooms').value = data.bathrooms || '';
          document.getElementById('bedrooms').value = data.bedrooms || '';
          document.getElementById('city').value = data.city || '';
          document.getElementById('country').value = data.country || '';
          document.getElementById('guests').value = data.guests || '';
          document.getElementById('priceHigh').value = data.priceHigh || '';
          document.getElementById('priceLow').value = data.priceLow || '';
  
          document.getElementById('preferencesForm').addEventListener('submit', function(event) {
            event.preventDefault();
  
            var bathrooms = document.getElementById('bathrooms').value;
            var bedrooms = document.getElementById('bedrooms').value;
            var city = document.getElementById('city').value;
            var country = document.getElementById('country').value;
            var guests = document.getElementById('guests').value;
            var priceHigh = document.getElementById('priceHigh').value;
            var priceLow = document.getElementById('priceLow').value;
  
            userPreferencesRef.set({
                bathrooms: bathrooms,
                bedrooms: bedrooms,
                city: city,
                country: country,
                guests: guests,
                priceHigh: priceHigh,
                priceLow: priceLow,
                email: userEmail 
            }).then(function() {
                matchUsersAndHomes(db);
                setTimeout(function() {
                    window.location.href = 'index.html';
                }, 1000); // To load results
            });
            });
          });
      } else {
        console.log('No matching email in userPreferences. Creating new document.');
        db.collection('userPreferences').add({
          email: userEmail
        }).then((docRef) => {
          getUserPreferences(db, userEmail);
        }).catch((error) => {
          console.error('Error adding document: ', error);
        });
      }
    }).catch((error) => {
      console.error('Error reading from database:', error);
    });
  }
  
  auth.onAuthStateChanged(function(user) {
    if (user) {
      var userEmail = user.email;
      getUserPreferences(db, userEmail);
    }
  });