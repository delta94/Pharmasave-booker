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

import {auth} from "../firebase";
import {Link, NavLink} from "react-router-dom";
import React from "react";

/**
 * The navbar component
 */
class Nav extends React.Component<{}, {[key: string]: string | boolean}> {

    public constructor (props: {}) {
        super(props)
        this.state = {
            loggedIn: false
        }
    }

    private logoutBtn: React.RefObject<HTMLAnchorElement> = React.createRef()

    private loginBtn: React.RefObject<HTMLAnchorElement> = React.createRef()

    private userNav: React.RefObject<HTMLAnchorElement>[] =
        [React.createRef(), React.createRef()]

    private navbarComponents = {
        home: (
            <NavLink
                exact
                className = "nav-item nav-link"
                activeClassName = "active"
                to = "/">Home <span className="sr-only">(current)</span>
            </NavLink>
        ),
        calendar: (
            <NavLink
                className = "nav-item nav-link disabled"
                activeClassName = "active"
                to = "/Calendar"
                ref = {this.userNav[0]}
            >Schedule a Pickup
            </NavLink>
        ),
        user: (
            <NavLink
                className = "nav-item nav-link disabled"
                activeClassName = "active"
                to="/User"
                ref = {this.userNav[1]}
            >My Schedule
            </NavLink>
        ),
        auth: (
            <NavLink
                className = "nav-item nav-link"
                activeClassName = "active"
                to = "/Login"
                ref = {this.loginBtn}
            >Log in
            </NavLink>
        ),
        logout: (
            <Link
                style = {{cursor: "pointer"}}
                className = "nav-item nav-link"
                onClick = {() => {
                    auth.signOut()
                }}
                to = "/"
                ref = {this.logoutBtn}
            >
                Logout
            </Link>
        ),
    }

    private navbarNav = (
        <div className="navbar-nav">
            {this.navbarComponents.home}
            {this.navbarComponents.calendar}
            {this.navbarComponents.user}
            {this.navbarComponents.auth}
            {this.navbarComponents.logout}
        </div>
    );

    /**
     * Authentication checking
     * @returns {void} void
     */
    public componentDidMount = (): void => {
        auth.onAuthStateChanged((user) => {
            if (Boolean(user)) {
                if (this.logoutBtn.current) {
                    this.logoutBtn.current.style.display = "block"
                }
                if (this.loginBtn.current) {
                    this.loginBtn.current.style.display = "none"
                }
                for (const unav of this.userNav) {
                    if (unav.current) {
                        unav.current.classList.remove("disabled")
                    }
                }
            } else {
                if (this.logoutBtn.current) {
                    this.logoutBtn.current.style.display = "none"
                }
                if (this.loginBtn.current) {
                    this.loginBtn.current.style.display = "block"
                }
                for (const unav of this.userNav) {
                    if (unav.current) {
                        unav.current.classList.add("disabled")
                    }
                }
            }
        })
    }

    private navbarClassNames =
        "navbar sticky-top navbar-expand-lg navbar-light override-bg-default"

    /**
     * The navbar component
     * @returns {JSX.Element} navbar element
     */
    private nav = (): JSX.Element => {
        return (
            <nav className = {this.navbarClassNames}>
                <Link className="navbar-brand" to="/">
                    <img src="pictures/pharmasave-logo.png" alt="logo"/>
                </Link>
                <button
                    className = "navbar-toggler"
                    type = "button"
                    data-toggle = "collapse"
                    data-target = "#navbarNav"
                    aria-controls = "navbarNav"
                    aria-expanded = "false"
                    aria-label = "Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav">
                        {this.navbarNav}
                    </div>
                </div>
            </nav>
        );
    }

    /**
     * @returns {JSX.Element} navbar element
     */
    public render = (): JSX.Element => {
        return this.nav()
    }

}

export default Nav;
