"use client";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhsjfZA9iWUShxC9iVhNJh2Hte68ZlKtA",
  authDomain: "exclusive-5fb7d.firebaseapp.com",
  projectId: "exclusive-5fb7d",
  storageBucket: "exclusive-5fb7d.appspot.com",
  messagingSenderId: "72602142726",
  appId: "1:72602142726:web:fceca6e44a1703b8c05b87",
  measurementId: "G-S6Y40NWFHC"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const storage = getStorage(app)
export const db = getFirestore(app);