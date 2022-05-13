import { db } from "./configuration";
import { getDocs, doc, collection } from "firebase/firestore";

async function getGovts() {
    const locCol = collection(db, 'locations');
    const locSnapshot = await getDocs(locCol);
    const locList = locSnapshot.docs.map((doc) => {
        return { id:doc.id, ...doc.data()};
    });
    console.log(locList);
    return locList;
}

export { getGovts };