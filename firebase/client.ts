// Import the functions you need from the SDKs you need

import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8ofDFt3veYQE1HB5DtNu8iT1vmp_21uY",
  authDomain: "serenaai-3bb19.firebaseapp.com",
  databaseURL:
    "https://serenaai-3bb19-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "serenaai-3bb19",
  storageBucket: "serenaai-3bb19.firebasestorage.app",
  messagingSenderId: "854143464515",
  appId: "1:854143464515:web:1238332cae6d319d56d0f6",
  measurementId: "G-V04V1HVBEC",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
