/**
 * Carriage Crossing Pharmacy Booker
 * Copyright (C) 2020 Luke Zhang, Ethan Lim
 * 
 * https://luke-zhang-04.github.io/
 * https://github.com/ethanlim04
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be usefu
 * but WITHOUT ANY WARRANTY; without even the implied warranty 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public Licence
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
/* eslint-disable semi */
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import AuthProvider from "./Auth";
import LogRocket from "logrocket";
import React from "react";
import ReactDOM from "react-dom";
/* eslint-enable semi */

LogRocket.init("8ywdga/pharmasave-booker")

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById("root"),
)

/**
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister()
