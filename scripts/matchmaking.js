/*
Paso WebApp Demo
by Ty Valencia
CMSI3801, ENTR4380
Fall 2023
*/

/* Matchmaking Algorithm ---------------------------------------------- */

export async function matchUsersAndHomes(db) {
  const homesSnapshot = await db.collection('homeownerData').get();
  const usersSnapshot = await db.collection('userData').get();
  const userPreferencesSnapshot = await db.collection('userPreferences').get();

  console.log('matchmaking started');

  let matchList = [];

  for (let homeDoc of homesSnapshot.docs) {
    const homeData = homeDoc.data();

    for (let userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
    
      const userPreferencesDoc = userPreferencesSnapshot.docs.find(doc => doc.data().email === userData.email);
      if (!userPreferencesDoc) {
        continue; // Skip to the next user
      }
    
      const userPreferences = userPreferencesDoc.data();
      if (matchesPreferences(userPreferences, homeData)) {
        matchList.push({ user: userDoc.id, home: homeDoc.id });
      }
    }
  }

  if (matchList.length !== 0) {
    handleMatches(matchList);
  } else {
    console.log('No matches found.');
  }
}

function matchesPreferences(userPreferences, home) {
  for (let key in userPreferences) {
    if (key !== 'email' && key !== 'priceLow' && key !== 'priceHigh' && userPreferences[key] !== "" && String(userPreferences[key]) !== String(home[key])) {
      return false;
    }
  }

  if (Number(home.price) < Number(userPreferences.priceLow) || Number(home.price) > Number(userPreferences.priceHigh)) {
    return false;
  }

  return true;
}

function handleMatches(matchList) {
  const db = firebase.firestore();

  matchList.forEach(async match => {
    let matchExists = await db.collection('matches')
      .where('homeownerID', '==', match.home)
      .where('userID', '==', match.user)
      .get();

    if (matchExists.empty) {
      db.collection('matches').add({
        homeownerID: match.home,
        userID: match.user
      })
      .then((docRef) => {
        console.log(`Match added with ID: ${docRef.id}`);
      })
      .catch((error) => {
        console.error(`Error adding match: ${error}`);
      });
    } else {
      console.log('Match already exists in the database.');
    }
  });
}