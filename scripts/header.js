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

firebase.auth().onAuthStateChanged(function(user) {
    var buttonContainer = document.getElementById("buttonContainer");

    if (user) {
        // User is signed in, replace the Sign In and Sign Up buttons with the Update Your Preferences button
        buttonContainer.innerHTML = `
            <button id="homeownerButton" class="header-button" onclick="location.href='../pages/homeowner.html'">Register your home</button>
            <button id="preferencesButton" class="header-button" onclick="location.href='../pages/preferences.html'">Update preferences</button>
        `;
    } else {
        // No user is signed in, replace the Update Your Preferences button with the Sign In and Sign Up buttons
        buttonContainer.innerHTML = `
            <button id="signinButton" class="header-button" onclick="location.href='../pages/signin.html'">SIGN IN</button>
            <button id="signupButton" class="header-button" onclick="location.href='../pages/signup.html'">SIGN UP</button>
        `;
    }
});