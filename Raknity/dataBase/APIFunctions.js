import { db } from "./configuration";
import { getDocs, doc, collection, getDoc } from "firebase/firestore";

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
    const allLocs = await getGovCities(id);
    const citiesList = allLocs.cities;
    let wantedData;
    for (let i = 0; i < citiesList.length; i++) {
        if (citiesList[i].cityName == cityName) {
            wantedData = citiesList[i];
        }
    }
    console.log(wantedData);
    return wantedData;
}

async function getlocpartitions(id, cityName, locationName) {
    const allpart = await getCityLocations(id, cityName);
    const partList = allpart.locations;
    let wantedData;
    for (let i = 0; i < partList.length; i++) {
        if (partList[i].locationName == locationName) {
            wantedData = partList[i];
        }
    }
    console.log(wantedData);
    return wantedData;
}

export { getGovts, getGovCities, getCityLocations, getlocpartitions };
