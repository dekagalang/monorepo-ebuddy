import { Request, Response } from "express";
import { User } from "../entities/user";
import { itemsCollection } from "../repository/userCollection";
import admin from "firebase-admin";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { firebaseConfig } from "../config/firebaseConfig";

firebase.initializeApp(firebaseConfig);

export const addUser = async (req: Request, res: Response) => {
  const { name, age }: User = req.body;
  try {
    const docRef = await itemsCollection.add({ name, age });
    res.status(201).send(`User added with ID: ${docRef.id}`);
  } catch (error) {
    res.status(500).send(`Error adding user: ${error}`);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, age }: User = req.body;
  try {
    const docRef = await itemsCollection.doc("zK20B0N08KZrVMwxwxJj");
    await docRef.update({ name, age });

    const snapshot = await itemsCollection.get();
    const users: User[] = [];
    snapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() } as User);
    });

    res.status(200).json({ message: "Item updated successfully", data: users });
  } catch (error) {
    res.status(500).send(`Error updating user: ${error}`);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const snapshot = await itemsCollection.get();
    const users: User[] = [];
    snapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() } as User);
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(`Error retrieving users: ${error}`);
  }
};

export const generateToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).send({ error: "User ID (uid) is required" });
  }

  try {
    const customToken = await admin.auth().createCustomToken(uid);
    res.status(200).send({ token: customToken });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error creating custom token", details: error });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  try {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    const idToken = await user?.getIdToken();

    res.status(200).send({ user, token: `Bearer ${idToken}` });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error creating custom token", details: error });
  }
};
