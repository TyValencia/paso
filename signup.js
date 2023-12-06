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

document.getElementById("signupForm").addEventListener("submit", function(event){
    event.preventDefault();

    var userData = {
        firstName: document.getElementById("fname").value,
        lastName: document.getElementById("lname").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        password: document.getElementById("password").value
    };

    firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
    .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        // ...
        return firebase.firestore().collection("userData").add(userData);
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        window.location.href = 'landingpage.html'; // Redirect to the homepage
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        console.error("Error: ", error);
    });
});