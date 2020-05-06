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

class Home extends React.Component {
    splash() {
        return (
            <div className="splash">
                <img src="pictures/cover.png" alt="Cover"/>
            </div>
        )
    }

    updateDimensions() {
        //Size a relative div so absolute image isn't overtop of everything
        const navBarCurrent = document.querySelector(".navbar")
        const windowWidth = window.innerWidth
        if (navBarCurrent) {
            const navBarHeight = navBarCurrent.clientHeight
            let splash = document.querySelector(".splash")
            if (splash) {
                let ratio = 7559/11811; //height:width ratio
                (splash as HTMLElement).style.height = (windowWidth*ratio-navBarHeight).toString() + "px";
            }
        }
    }

    componentDidMount() {
        this.updateDimensions()
        window.addEventListener("resize", this.updateDimensions.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this))
    }

    render() {
        return (
            <div>{this.splash()}</div>
        );
    }
}

export default Home;