import { db } from "./configuration";
import { getDocs, doc, collection, updateDoc } from "firebase/firestore";

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

async function submition(id, citiesList, cityindex, locindex, partindex, slotindex) {
    try {

        citiesList[cityindex].locations[locindex].partitions[partindex].slots[slotindex] = true;
        const docRef = doc(db, "locations", id);
        await updateDoc(docRef, {
            cities: citiesList
        }).then(console.log('slot updated!'))
    } catch (e) {
        console.error(e);
    }
}




export { getGovts, getGovCities, getCityLocations, getlocpartitions, getAllSlots, submition };
