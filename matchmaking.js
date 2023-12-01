/*
Paso WebApp Demo
by Ty Valencia
CMSI3801, ENTR4380
Fall 2023
*/

/* Matchmaking Algorithm ---------------------------------------------- */

/* --- Get JSON data --- */ 
function fetchJsonData(url) {
    return fetch(url).then(response => response.json());
  }
  
/* --- Whenever a user updates their preferences --- */
async function newPreferences() {
    const allHomes = await fetchJsonData('data/homeownerData.json');
    const allUserPreferences = await fetchJsonData('data/userPreferences.json');
    let matchList = [];
  
    allUserPreferences.forEach(userPref => {
      allHomes.forEach(home => {
        if (matchesPreferences(userPref, home)) {
          matchList.push({ user: userPref.id, home: home.id });
        }
      });
    });
  
    if (matchList.length !== 0) {
      handleMatches(matchList);
    }
}
  
  /* --- Whenever a new home is registered --- */
  async function newHome() {
    const allUsers = await fetchJsonData('data/userData.json');
    const allHomes = await fetchJsonData('data/homeownerData.json');
    let matchList = [];
  
    allHomes.forEach(home => {
      allUsers.forEach(user => {
        const userPref = getUserPreference(user.id, allUserPreferences);
        if (matchesPreferences(userPref, home)) {
          matchList.push({ user: user.id, home: home.id });
        }
      });
    });
  
    if (matchList.length !== 0) {
      handleMatches(matchList);
    }
  }
  

function matchesPreferences(userPref, home) {
    return userPref.city === home.city && userPref.country === home.country 
    && userPref.bedrooms === home.bedrooms && userPref.bathrooms === home.bathrooms
    && userPref.priceLow <= home.price && userPref.priceHigh >= home.price;
}
  
function getUserPreference(userId, preferences) {
    return preferences.find(pref => pref.id === userId);
}
  
function handleMatches(matchList) {
    // Implement what you want to do with the matches
    // For example, send an email, update a database, etc.
}
  