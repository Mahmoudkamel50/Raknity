import { db } from "./configuration";
import { getDocs, doc, collection, getDoc } from "firebase/firestore";

async function getGovts() {
    const locCol = collection(db, 'locations');
    const locSnapshot = await getDocs(locCol);
    const locList = locSnapshot.docs.map((doc) => {
        return { id:doc.id, ...doc.data()};
    });
    console.log(locList);
    return locList;
}

async function getCities(id) {
    const allCities = await getGovts();
    console.log(allCities);
    let wantedData;
    for (let i = 0; i < allCities.length; i++) {
        if (allCities[i].id == id) {
            wantedData = allCities[i];
            console.log(wantedData);
        }
    }
    return wantedData;
}

async function getGovt(id) {
    const locCol = collection(db, "locations");
    const doc = await getDoc(locCol, id);
    console.log(doc);
    return doc;
}

export { getGovts , getCities, getGovt};