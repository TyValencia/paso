# Paso WebApp 
![Logo](images/paso_logo_3.png)
### by Ty Valencia for CMSI3801 and ENTR4370

## Description
This is my work on Paso Homes - a 100% online platform where customers can rent living spaces by the month. The website will contain data from homeowners that the customers can look up and connect with. All houses that are registered can be viewed by scrolling down and clicking on "Check Available Houses.""

## Notable Features
 - matchUsersAndHomes() in [matchmaking.js](https://github.com/TyValencia/pasohomes/blob/main/matchmaking.js) is the main algorithm for searching the database and matching users. 
 - handleMatches() takes those matches and puts them in a new collection in the database. 
 - firebase.auth().onAuthStateChanged(function(user) {...}) observes whether the user's signed-in or not in. 

# Notable Assignments
 - const db = firebase.firestore() queries the Firebase API 
 - let matchExists = await db.collection('matches') checks if there is already a match in the database 

## Notable Classes
 - .header-button stylizes the buttons on top 
 - .form-page segments and applies styles to signin/signup pages 

## Notable Libraries Used
 - Firebase API used to read and collect data 
 - Google Maps API used to display a map in the browse page (home locations will be displayed on there in the future) 
 - Twilio and MailChimp will be used in the future to connect matches (Matches are stored in Firebase, and a print statement shows up for a second after changing your preferences showing if there's a match. In the future, this is where they will be implemented)
