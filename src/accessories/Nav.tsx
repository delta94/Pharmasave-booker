/**
 * Defines the navbar component
 */

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

import React from "react";
import { NavLink, Link } from "react-router-dom";
import firebaseApp from "../firebase";

/**
 * The navbar component
 */
class Nav extends React.Component {
    private NavbarNav = (
        <div className="navbar-nav">
            <NavLink
                exact
                className = "nav-item nav-link"
                activeClassName = "active"
                to = "/">Home <span className="sr-only">(current)</span>
            </NavLink>
            <NavLink
                className = "nav-item nav-link disabled"
                activeClassName = "active"
                to = "/Calendar">Schedule a Pickup
            </NavLink>
            <NavLink
                className = "nav-item nav-link disabled"
                activeClassName = "active"
                to="/User">My Schedule
            </NavLink>
            <NavLink
                className = "nav-item nav-link"
                activeClassName = "active"
                to = "/Login">Log in
            </NavLink>
        </div>
    )

    /**
     * The navbar component
     */
    Nav() {
        return (
            <nav className="navbar sticky-top navbar-expand-lg navbar-light override-bg-default">
                <Link className="navbar-brand" to="/"><img src="pictures/pharmasave-logo.png" alt="logo"/></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav">
                        <NavLink
                            exact
                            className = "nav-item nav-link"
                            activeClassName = "active"
                            to = "/">Home <span className="sr-only">(current)</span>
                        </NavLink>
                        <NavLink
                            className = "nav-item nav-link disabled"
                            activeClassName = "active"
                            to = "/Calendar">Schedule a Pickup
                        </NavLink>
                        <NavLink
                            className = "nav-item nav-link disabled"
                            activeClassName = "active"
                            to="/User">My Schedule
                        </NavLink>
                        <NavLink
                            className = "nav-item nav-link"
                            activeClassName = "active"
                            to = "/Login">Log in
                        </NavLink>
                        <Link
                            style = {{cursor: "pointer"}}
                            className = "nav-item nav-link"
                            onClick = {() => {firebaseApp.auth().signOut()}}
                            to = "/"
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            </nav>
        );
    }

    /**
     * Render
     */
    render() {
        return this.Nav()
    }
}

export default Nav;