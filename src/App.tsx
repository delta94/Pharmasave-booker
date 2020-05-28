/**
 * Application
 */

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
/* eslint-disable @typescript-eslint/semi */
import {
    Route,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import Auth from "./login/Login";
import Calendar from "./calendar/Calendar";
import Footer from "./accessories/Footer";
import Home from "./home/Home";
import Legal from "./legal/Legal"
import Nav from "./accessories/Nav";
import PrivacyPolicy from "./legal/Privacy-policy"
import React from "react";
import User from "./user/User";
/* eslint-enable @typescript-eslint/semi */


export default class App extends React.Component<{}, {[key: string]: string}> {
    
    public render = (): JSX.Element => (
        <Router>
            <Nav/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/Calendar" component={Calendar}/>
                <Route path="/User" component={User}/>
                <Route path="/Login" component={Auth}/>
                <Route path="/Legal" component={Legal}/>
                <Route
                    path = "/Privacy-policy"
                    component = {PrivacyPolicy}
                />
            </Switch>
            <Footer/>
        </Router>
    )

}
