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

document.getElementById("signinForm").addEventListener("submit", function(event){
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        window.location.href = 'landingpage.html'; // Redirect to the homepage
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Error: ", error);
    });
});