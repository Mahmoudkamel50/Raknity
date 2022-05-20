import { db } from "./configuration";
import {
  getDocs,
  doc,
  collection,
  updateDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { getUserById } from "./user";

async function getGovts() {
  const locCol = collection(db, "locations");
  const locSnapshot = await getDocs(locCol);
  const locList = locSnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  console.log(locList);
  return locList;
}

async function getGovCities(id) {
  const allCities = await getGovts();
  console.log(allCities);
  let wantedData;
  for (let i = 0; i < allCities.length; i++) {
    if (allCities[i].id == id) {
      wantedData = allCities[i];
    }
  }
  console.log(wantedData);
  return wantedData;
}

async function getCityLocations(id, cityName) {
  const allcities = await getGovCities(id);
  const citiesList = allcities.cities;
  let wantedData;
  for (let i = 0; i < citiesList.length; i++) {
    if (citiesList[i].cityName == cityName) {
      wantedData = citiesList[i];
    }
  }
  console.log(wantedData);
  return wantedData;
}

async function getURL(id, cityName, location) {
  const allLocs = await getCityLocations(id, cityName);
  const cityLocs = allLocs.locations;
  let wantedData;
  for (let i = 0; i < cityLocs.length; i++) {
    if (cityLocs[i].locationName == location) {
      wantedData = cityLocs[i].url;
      break;
    }
  }
  console.log(wantedData);
  return wantedData;
}

async function getlocpartitions(id, cityName, locationName) {
  const allLocs = await getCityLocations(id, cityName);
  const locList = allLocs.locations;
  let wantedData;
  for (let i = 0; i < locList.length; i++) {
    if (locList[i].locationName == locationName) {
      wantedData = locList[i];
    }
  }
  console.log(wantedData);
  return wantedData;
}

async function getAllSlots(id, cityName, locationName, partitionName) {
  const allParts = await getlocpartitions(id, cityName, locationName);
  const partList = allParts.partitions;
  let wantedData;
  for (let i = 0; i < partList.length; i++) {
    if (partList[i].partitionName == partitionName) {
      wantedData = partList[i];
    }
  }
  console.log(wantedData);
  return wantedData;
}

async function submition(id, citiesList, cityindex, locindex, userId) {
  try {
    let flag = false;
    let partName;
    let slotNum;
    for (let i = 0; i < citiesList[cityindex].locations[locindex].partitions.length; i++) {
      for (let j = 0; j < citiesList[cityindex].locations[locindex].partitions[i].slots.length; j++) {
        if (citiesList[cityindex].locations[locindex].partitions[i].slots[j].status == 'empty') {
          citiesList[cityindex].locations[locindex].partitions[i].slots[j].status = 'pending';
          citiesList[cityindex].locations[locindex].partitions[i].slots[j].occupiedBy = userId;
          partName = citiesList[cityindex].locations[locindex].partitions[i].partitionName;
          slotNum = j;
          flag = true;
          break;
        }
      }
      if (flag == true) {
        break;
      }
    }
    if (flag == true) {
      const docRef = doc(db, "locations", id);
      await updateDoc(docRef, {
        cities: citiesList
      })
    }
    return { flag, partName, slotNum };
  } catch (e) {
    console.error(e);
  }
}

function subscribe(callback) {
  const unsubscribe = onSnapshot(query(collection(db, "users")), (snapshot) => {
    const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
    snapshot.docChanges().forEach((change) => {
      if (callback) callback({ change, snapshot });
    });
  });
  return unsubscribe;
}

async function cancel(id, histindex, govt, cityname, locname, partname, slotindex) {

  try {
    const user = await getUserById(id);
    const history = user[0].history;
    history[histindex].status = "Cancelled";
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, {
      history: history,
    });
    const gov = await getGovCities(govt);
    for (let i = 0; i < gov.cities.length; i++) {
      if (gov.cities[i].cityName == cityname) {
        for (let j = 0; j < gov.cities[i].locations.length; j++) {
          if (gov.cities[i].locations[j].locationName == locname) {
            for (let k = 0; k < gov.cities[i].locations[j].partitions.length; k++) {
              if (gov.cities[i].locations[j].partitions[k].partitionName == partname) {
                gov.cities[i].locations[j].partitions[k].slots[slotindex].status = 'empty';
                gov.cities[i].locations[j].partitions[k].slots[slotindex].occupiedBy = '';
              }
            }
          }
        }
      }
    }
    const locRef = doc(db, "locations", govt);
    await updateDoc(locRef, {
      cities: gov.cities,
    });
  } catch (e) {
    console.error(e);
  }
}

async function deductFromWallet(id, timeDiff, wallet) {
  try {
    console.log(timeDiff);
    const timeDiffMin = timeDiff / 60;
    const timeDiffHrs = timeDiffMin / 60;
    const EGP_PER_HOUR = 7;
    const finalPrice = EGP_PER_HOUR * timeDiffHrs;
    wallet = wallet - finalPrice;
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, {
      wallet: wallet,
    });
  } catch (e) {
    console.error(e);
  }
}

async function checkinslotbyId(id) {
  try {
    let flag = false;
    const govs = await getGovts();
    let govId;
    let citieslist;

    for (let i = 0; i < govs.length; i++) {
      for (let j = 0; j < govs[i].cities.length; j++) {
        for (let k = 0; k < govs[i].cities[j].locations.length; k++) {
          for (let l = 0; l < govs[i].cities[j].locations[k].partitions.length; l++) {
            for (let m = 0; m < govs[i].cities[j].locations[k].partitions[l].slots.length; m++) {
              if (govs[i].cities[j].locations[k].partitions[l].slots[m].occupiedBy == id) {
                govs[i].cities[j].locations[k].partitions[l].slots[m].status = "Checked In";
                flag = true;
                govId = govs[i].id;
                citieslist = govs[i].cities;
                break;
              }
            }
            if (flag == true) {
              break;
            }
          }
          if (flag == true) {
            break;
          }
        }
        if (flag == true) {
          break;
        }
      }
      if (flag == true) {
        break;
      }
    }

    const docRef = doc(db, "locations", govId);
    await updateDoc(docRef, {
      cities: citieslist
    });

    const user = await getUserById(id);
    const history = user[0].history;
    history[history.length - 1].status = "Checked In";
    console.log(history.length - 1);
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      history: history,
    });

  }
  catch (e) {
    console.error(e);
  }
}

async function checkoutslotbyId(id) {
  try {
    let flag = false;
    const govs = await getGovts();
    let govId;
    let citieslist;

    for (let i = 0; i < govs.length; i++) {
      for (let j = 0; j < govs[i].cities.length; j++) {
        for (let k = 0; k < govs[i].cities[j].locations.length; k++) {
          for (let l = 0; l < govs[i].cities[j].locations[k].partitions.length; l++) {
            for (let m = 0; m < govs[i].cities[j].locations[k].partitions[l].slots.length; m++) {
              if (govs[i].cities[j].locations[k].partitions[l].slots[m].occupiedBy == id) {
                govs[i].cities[j].locations[k].partitions[l].slots[m].status = "empty";
                govs[i].cities[j].locations[k].partitions[l].slots[m].occupiedBy = "";
                flag = true;
                govId = govs[i].id;
                citieslist = govs[i].cities;
                break;
              }
            }
            if (flag == true) {
              break;
            }
          }
          if (flag == true) {
            break;
          }
        }
        if (flag == true) {
          break;
        }
      }
      if (flag == true) {
        break;
      }
    }

    const docRef = doc(db, "locations", govId);
    await updateDoc(docRef, {
      cities: citieslist
    });

    const user = await getUserById(id);
    const history = user[0].history;
    history[history.length - 1].status = "Checked out";
    console.log(history.length - 1);
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      history: history,
    });

  }
  catch (e) {
    console.error(e);
  }
}

export { getGovts, getGovCities, getCityLocations, getlocpartitions, getAllSlots, submition, subscribe, deductFromWallet, cancel, getURL, checkinslotbyId, checkoutslotbyId };
