/**
 * Carriage Crossing Pharmacy Booker
 * Copyright (C) 2020 Luke Zhang, Ethan Lim
 * 
 * https://luke-zhang-04.github.io/
 * https://github.com/ethanlim04
 * This program is free software: you can redistribute it and/or modif
 * it under the terms of the GNU General Public License as published b
 * the Free Software Foundation, either version 3 of the License, o
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be usefu
 * but WITHOUT ANY WARRANTY; without even the implied warranty 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See t
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public Licen
 * 
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
/* eslint-disable one-var, semi */
import "firebase/auth";
import "firebase/firestore";
import firebase from "firebase/app";
/* eslint-enable semi */

const googleProvider = new firebase.auth.GoogleAuthProvider()

const firebaseConfig = {
    apiKey: "AIzaSyCDtmIH9q9hf0Yw-8CVW-3Bf2e0HGPRCk8",
    authDomain: "carriage-crossing-pharmacy.firebaseapp.com",
    databaseURL: "https://carriage-crossing-pharmacy.firebaseio.com",
    projectId: "carriage-crossing-pharmacy",
    storageBucket: "carriage-crossing-pharmacy.appspot.com",
    messagingSenderId: "663905550795",
    appId: "1:663905550795:web:e812497f884f32fd95364e",
    measurementId: "G-LSVBP608QP",
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth(),
    firestore = firebase.firestore(),
    
    signInWithGoogle = () => {
        auth.signInWithPopup(googleProvider)
    }
