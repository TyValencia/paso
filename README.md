# Paso WebApp 
By Ty Valencia <br>
CMSI3801 and ENTR4370 <br>
LMU Fall 2023 <br>
<br>
TO RUN THE WEBSITE, go to [this website](https://tyvalencia.github.io/pasohomes/) or run the index.html file on a local server such as on VS Code. 
The signin/signup feature is functional and stored in a Cloud Firestore in [Firebase](https://console.firebase.google.com/u/0/project/paso-6529c/firestore/data/~2FhomeownerData~2FUTmZjF66MgjPYG3TU75j). <be>
Firebase stores user information, preferences, houses registered, and matches. <br>
All houses that are registered can be viewed by scrolling down and clicking on "Check Available Houses" [(implementation here)](https://github.com/TyValencia/pasohomes/blob/main/browse.js)<br>
<br>
Notable functions: <br>
matchUsersAndHomes() in [matchmaking.js](https://github.com/TyValencia/pasohomes/blob/main/matchmaking.js) is the main algorithm for searching the database and matching users. <br>
handleMatches() takes those matches and puts them in a new collection in the database. <br>
firebase.auth().onAuthStateChanged(function(user) {...}) observes whether the user's signed-in or not in<br>
<br>
Notable variable assignments: <br>
const db = firebase.firestore() queries the Firebase API <br>
let matchExists = await db.collection('matches') checks if there is already a match in the database <br>
<be>
Notable classes: <br>
.header-button stylizes the buttons on top <br>
.form-page segments and applies styles to signin/signup pages <br>
<br>
Notable libaries used: <br>
Firebase API used to read and collect data <br>
Google Maps API used to display a map in the browse page (home locations will be displayed on there in the future) <br>
Twilio and MailChimp will be used in the future to connect matches (Matches are stored in Firebase, and a print statement shows up for a second after changing your preferences showing if there's a match. In the future, this is where they will be implemented)
