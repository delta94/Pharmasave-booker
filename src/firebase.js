/*
    Carriage Crossing Pharmacy Booker
    Copyright (C) 2020 Luke Zhang, Ethan Lim

    https://luke-zhang-04.github.io/
    https://github.com/ethanlim04

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCDtmIH9q9hf0Yw-8CVW-3Bf2e0HGPRCk8",
    authDomain: "carriage-crossing-pharmacy.firebaseapp.com",
    databaseURL: "https://carriage-crossing-pharmacy.firebaseio.com",
    projectId: "carriage-crossing-pharmacy",
    storageBucket: "carriage-crossing-pharmacy.appspot.com",
    messagingSenderId: "663905550795",
    appId: "1:663905550795:web:e812497f884f32fd95364e",
    measurementId: "G-LSVBP608QP"
};

firebase.initializeApp(firebaseConfig);
export default firebase;