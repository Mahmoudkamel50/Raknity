import { addDoc, collection, getDocs, getFirestore, setDoc, doc, query, where, updateDoc, arrayUnion, waitForPendingWrites, Timestamp } from "firebase/firestore";
import { app, db } from "./configuration";

const firestoreDB = getFirestore(app);


async function getUsers() {
    const usersCol = collection(firestoreDB, "users");
    const userSnapshot = await getDocs(usersCol);
    return userSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
    });
}

export async function getUserById(id) {
    const usersRef = collection(firestoreDB, "users");
    const q = query(usersRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
    });
}

async function addUser(user) {
    await setDoc(doc(firestoreDB, "users", user.id), user);
}

async function getUserHistory(id) {
    const user = await getUserById(id);
    console.log(user);
    const userHistory = user[0].history;
    console.log(userHistory);
    return userHistory;
}

async function addToUserHistory(id, govt, ctNmae, locName, partName, slotIndex, url) {
    try {
        const docRef = doc(db, "users", id);
        await updateDoc(docRef, {
            history: arrayUnion({
                government: govt,
                cityName: ctNmae,
                locationName: locName,
                partitionName: partName,
                slot: slotIndex,
                status: "pending",
                bookingTime: new Date(),
                url: url
            })
        })
        console.log('added to history');
    } catch (e) {
        console.error(e);
    }
}

async function checkPendingHistory(id) {
    let val = false;
    const history = await getUserHistory(id);
    for (let i = 0; i < history.length; i++) {
        if (history[i].status == "pending" || history[i].status == "Checked In") {
            val = true;
            break;
        }        
    }
    return val;
}

export { getUsers, addUser, getUserHistory, addToUserHistory, checkPendingHistory };