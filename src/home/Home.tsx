/**
 * Defines components for homepage
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

import {Link} from "react-router-dom";

import React from "react";

/**
 * Home component
 */
class Home extends React.Component {

    private splash = {
        splash: (
            <div className="splash">
                <img src="pictures/cover.png" alt="Cover"/>
            </div>
        ),
        splashText: (
            <div className="splash-text">
                <h1>Wellness</h1>
                <h2>Starts here.</h2>
                <h3>Register or login to to book a pickup</h3>
                <Link className="btn btn-primary" to="login">Login or Register 
                    <span className="material-icons">keyboard_arrow_right</span>
                </Link>
                <Link className="btn btn-primary" to="calendar">Book a Pickup 
                    <span className="material-icons">keyboard_arrow_right</span>
                </Link>
            </div>
        ),
    }
    
    public constructor (props: {}) {
        super(props)
        this.state = {
            imageLoaded: false,
        }
    }

    /**
     * When page size is changed
     * @returns {void} void
     */
    private updateDimensions = (): void => {
        // Size a relative div so absolute image isn't overtop of everything
        const navBarCurrent = document.querySelector(".navbar"),
            windowWidth = window.innerWidth

        if (navBarCurrent) {
            const navBarHeight = navBarCurrent.clientHeight,
                splash = document.querySelector(".splash")

            if (splash) {
                // eslint-disable-next-line
                const ratio = 7559 / 11811; // Height:width ratio

                (splash as HTMLElement).style.height = `${(
                    windowWidth * ratio - navBarHeight
                ).toString()}px`;
            }
        }
    }

    /**
     * Updates on window resize
     * @returns {void} void
     */
    public componentDidMount = (): void => {
        this.updateDimensions()
        window.addEventListener("resize", this.updateDimensions.bind(this))
    }

    /**
     * @returns {void} void
     */
    public componentWillUnmount = (): void => {
        window.removeEventListener("resize", this.updateDimensions.bind(this))
    }

    /**
     * Renders homepage
     * @returns {JSX.Element} homepage
     */
    public render = (): JSX.Element => {
        return (
            <div className="splash-container">
                {this.splash.splash}
                {this.splash.splashText}
            </div>
        );
    }

}

export default Home;
