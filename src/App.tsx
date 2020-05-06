/*
    Carriage Crossing Pharmacy Booker
    Copyright (C) 2020 Luke Zhang, Ethan Lim

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

import React from "react";
import Calendar from "./calendar/Calendar";
import Home from "./home/Home";
import Login from "./login/Login";
import User from "./user/User";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Footer from "./accessories/Footer";
import Nav from "./accessories/Nav";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Nav/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/Calendar" component={Calendar}/>
                    <Route path="/User" component={User}/>
                    <Route path="/Login" component={Login}/>
                </Switch>
                <Footer/>
            </Router>
        );
    }
}

export default App;