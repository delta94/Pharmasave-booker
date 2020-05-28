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

/* eslint-disable @typescript-eslint/semi */
import {Link, NavLink} from "react-router-dom";
import {AuthContext} from "../Auth";
import React from "react";
import {auth} from "../firebase";
/* eslint-enable @typescript-eslint/semi */


/**
 * The navbar component
 */
export default class Nav extends React.Component<{}, {[key: string]: string | boolean}> {

    public constructor (props: {}) {
        super(props)
        this.state = {
            loggedIn: false
        }
    }

    private _logoutBtn: React.RefObject<HTMLAnchorElement> = React.createRef()

    private _loginBtn: React.RefObject<HTMLAnchorElement> = React.createRef()

    private _userNav: React.RefObject<HTMLAnchorElement>[] =
        [React.createRef(), React.createRef()]
    
    public static contextType = AuthContext

    private _loggedInState = (): string => {
        if (this.state) {
            return this.state.loggedIn ? "" : "disabled"
        }
        return ""
    }
    
    /**
     * Creates a buttons for exclusively users
     * @param {string} to - link location
     * @param {number} refIndex - _userNav reference
     * @param {string} name - name of button
     * @returns {JSX.Element} user button
     */
    private _userBtns = (
        to: string, refIndex: number, name: string
    ): JSX.Element => (
        <NavLink
            className = {
                `nav-item nav-link 
                ${this._loggedInState()}`
            }
            activeClassName = "active"
            to = {`/${to}`}
            ref = {this._userNav[refIndex]}
        >
            {name}
        </NavLink>
    )

    private _navbarComponents = {
        home: (
            <NavLink
                exact
                className = "nav-item nav-link"
                activeClassName = "active"
                to = "/">Home <span className="sr-only">(current)</span>
            </NavLink>
        ),
        auth: (
            <NavLink
                className = "nav-item nav-link"
                activeClassName = "active"
                to = "/Login"
                ref = {this._loginBtn}
            >Log in
            </NavLink>
        ),
        logout: (
            <Link
                style = {{cursor: "pointer"}}
                className = "nav-item nav-link"
                onClick = {(): void => {
                    auth.signOut()
                }}
                to = "/"
                ref = {this._logoutBtn}
            >
                Logout
            </Link>
        ),
    }

    private _navbarNav = (
        <div className="navbar-nav">
            {this._navbarComponents.home}
            {this._userBtns("Calendar", 0, "Schedule a Pickup")}
            {this._userBtns("User", 1, "My Schedule")}
            {this._navbarComponents.auth}
            {this._navbarComponents.logout}
        </div>
    )

    /**
     * Configure navbar with auth
     * @param {boolean} isAuthenticated - if a user is signed in
     * @returns {void} void
     */
    private _navConfig = (isAuthenticated: boolean): void => {
        if (this._logoutBtn.current) {
            this._logoutBtn.current.style.display =
                isAuthenticated ? "block" : "none"
        }
        if (this._loginBtn.current) {
            this._loginBtn.current.style.display =
                isAuthenticated ? "none" : "block"
        }
        for (const unav of this._userNav) {
            if (unav.current) {
                if (isAuthenticated) {
                    unav.current.classList.remove("disabled")
                } else {
                    unav.current.classList.add("disabled")
                }
            }
        }
        this.setState({loggedIn: isAuthenticated})
    }

    /**
     * Authentication checking
     * @returns {void} void
     */
    public componentDidMount = (): void => {
        auth.onAuthStateChanged((user) => {
            this._navConfig(Boolean(user))
        })
    }

    private _navbarClassNames =
        "navbar sticky-top navbar-expand-lg navbar-light override-bg-default"

    /**
     * The navbar component
     * @returns {JSX.Element} navbar element
     */
    private _nav = (): JSX.Element => (
        <nav className = {this._navbarClassNames}>
            <Link className="navbar-brand" to="/">
                <img src="pictures/pharmasave-logo.png" alt="logo"/>
            </Link>
            <button
                className = "navbar-toggler"
                type = "button"
                data-toggle = "collapse"
                data-target = "#_navbarNav"
                aria-controls = "_navbarNav"
                aria-expanded = "false"
                aria-label = "Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="_navbarNav">
                <div className="navbar-nav">
                    {this._navbarNav}
                </div>
            </div>
        </nav>
    )

    /**
     * @returns {JSX.Element} navbar element
     */
    public render = (): JSX.Element => this._nav()

}
