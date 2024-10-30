import { db } from "./firebase";
import { collection, getDocs, DocumentData } from "firebase/firestore";

export const fetchData = async (): Promise<DocumentData[]> => {
  const querySnapshot = await getDocs(collection(db, "yourCollection"));
  const data: DocumentData[] = [];

  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};

export const callFunction = async (): Promise<any> => {
  const response = await fetch(
    "http://localhost:5001/ebuddy-dfdc5/us-central1/helloWorld"
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
};
