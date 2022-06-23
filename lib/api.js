import { initializeApp } from "firebase/app";
import { deleteDoc, getFirestore, getDoc, getDocs, setDoc, doc, collection, query } from 'firebase/firestore';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBd5YhHKvIp7dAO6hFUcUYfIiCBZMaFhvY",
    authDomain: "fajita3000-ef81f.firebaseapp.com",
    projectId: "fajita3000-ef81f",
    storageBucket: "fajita3000-ef81f.appspot.com",
    messagingSenderId: "16747614615",
    appId: "1:16747614615:web:7c7964809562175d7d74d2"
});

export default firebaseApp;

const db = getFirestore();



export async function createFajita(fajita) {
    let fajitaRef = doc(collection(db, "fajitas"))
    fajita.id = fajitaRef.id;
    setDoc(fajitaRef, fajita)
    return fajita
}

export async function getAllFajitas() {
    const q = query(collection(db, "fajitas"));
    const querySnapshot = await getDocs(q);
    let fajitas = [];
    querySnapshot.forEach((doc) => {
        fajitas.push(doc.data())
    });

    return fajitas
}

export async function getFajitaById(fajitaId) {
    const docRef = doc(db, "fajitas", fajitaId);
    const docSnap = await getDoc(docRef);
    docSnap.fajitaId = fajitaId;
    return docSnap.data();
}


export async function deleteFajita(fajitaId) {
    await deleteDoc(doc(db, "fajitas", fajitaId))
}