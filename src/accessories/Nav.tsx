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

import React from "react";
import { Link } from "react-router-dom";

class Nav extends React.Component {
    Nav() {
        return (
            <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/"><img src="pictures/pharmasave-logo.png"/></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link active" to="/">Home <span className="sr-only">(current)</span></Link>
                        <Link className="nav-item nav-link disabled" to="/Calendar">Schedule a Pickup</Link>
                        <Link className="nav-item nav-link disabled" to="/User">My Schedule</Link>
                        <Link className="nav-item nav-link" to="/Login">Log in</Link>
                    </div>
                </div>
            </nav>
        );
    }

    render() {
        return this.Nav()
    }
}

export default Nav;