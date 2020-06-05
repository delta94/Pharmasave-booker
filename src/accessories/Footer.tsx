/**
 * Defines the footer component
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
 * This program is distributed in the hope that it will be useful
 * but WITHOUT ANY WARRANTY; without even the implied warranty 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public Licence
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

/* eslint-disable @typescript-eslint/semi */
import {Link} from "react-router-dom";
import React from "react";
/* eslint-disable @typescript-eslint/semi */


/**
 * Footer component
 */
export default class Footer extends React.Component {

    /**
     * @returns {JSX.Element} footer component
     */
    private static _footer = (): JSX.Element => (
        <footer className="page-footer font-small blue pt-4">
            <div className="container-fluid text-center text-md-left">
                <div className="row">
                    <Footer._footerParts.logo/>
                    <hr className="clearfix w-100 d-md-none pb-3" />
                    <Footer._footerParts.nav/>
                    <Footer._footerParts.contact/>
                    <Footer._footerParts.credits/>
                </div>
            </div>
            <Footer._footerParts.copyright/>
        </footer>
    )
    
    private static _footerParts = {
        nav: (): JSX.Element => (
            <div className="col-lg-3 col-md-3 col-sm-12">
                <h5 className="text-uppercase">Navagation</h5>
                <ul className="list-unstyled">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link
                            to = "/Calendar"
                            className = "btn-link disabled"
                        >
                            Book a Pickup
                        </Link>
                    </li>
                    <li>
                        <Link
                            to = "/User"
                            className = "btn-link disabled"
                        >
                            Your Scheduled Pickups
                        </Link>
                    </li>
                    <li>
                        <Link to="/Login">Login</Link>
                    </li>
                </ul>
            </div>
        ),
        contact: (): JSX.Element => (
            <div className="col-lg-3 col-md-3 col-sm-12">
                <h5 className="text-uppercase">Contact</h5>
                <ul className="list-unstyled">
                    <li>
                        <p>
                            <span className="material-icons">call</span>
                              (519) 885-5555
                        </p>
                    </li>
                    <li>
                        <p>
                            <span className="material-icons">print</span>
                              (519) 885-5554
                        </p>
                    </li>
                    <li>
                        <a
                            href = "https://goo.gl/maps/jABcwNoBWiG9ahBo6"
                            target = "_blank"
                            rel = "noopener noreferrer"
                        >
                            <span className="material-icons">business</span>
                              105 Oak Park Dr #4, Waterloo, ON N2K 0B3
                        </a>
                    </li>
                </ul>
            </div>
        ),
        credits: (): JSX.Element => (
            <div className="col-lg-3 col-md-3 col-sm-12">
                <h5 className="text-uppercase">Image Credits</h5>
                <ul className="list-unstyled">
                    <li>
                        {/* eslint-disable-next-line */}
                        <a className="unsplash-credit" href="https://unsplash.com/@adamsky1973?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Adam Nieścioruk"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span>Adam Nieścioruk</span></a>
                    </li>
                    <li>
                        {/* eslint-disable-next-line */}
                        <a className="btn btn-secondary" href="https://material.io/resources/icons/?search=arrow&icon=keyboard_arrow_right&style=baseline">Google Material Icons</a>
                    </li>
                </ul>
            </div>
        ),
        copyright: (): JSX.Element => (
            <div className="footer-copyright text-center py-3">
                © 2020 Copyright:{" "}
                <a href="https://luke-zhang-04.github.io/">Luke Zhang</a>,
                {" "}
                <a href="https://github.com/ethanlim04">Ethan Lim</a>,{" "}
                and Pharmasave Carriage Crossing Pharamcy
                <ul className="list-unstyled">
                    <li>
                        <Link to="/Legal">Terms and Conditions</Link>
                    </li>
                    <li>
                        <Link to="/Privacy-policy">Privacy Policy</Link>
                    </li>
                </ul>
            </div>
        ),
        logo: (): JSX.Element => (
            <div className="col-lg-3 col-md-3 col-sm-12">
                <h5 id="image-header" className="text-uppercase">
                    Carriage Crossing Pharmacy
                </h5>
                <img src="pictures/pharmasave-logo.png" alt="pharmasave logo"/>
            </div>
        ),
    }

    /**
     * @returns {JSX.Element} footer component
     */
    public render = (): JSX.Element => <Footer._footer/>

}
