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

class Footer extends React.Component {
    private footerParts = {
        nav: (
            <div className="col-lg-3 col-md-3 col-sm-12">
                <h5 className="text-uppercase">Navagation</h5>
                <ul className="list-unstyled">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/Calendar" className="btn-link disabled">Book a Pickup</Link>
                    </li>
                    <li>
                        <Link to="/User" className="btn-link disabled">Your Scheduled Pickups</Link>
                    </li>
                    <li>
                        <Link to="/Login">Login</Link>
                    </li>
                </ul>
            </div>
        ),
        contact: (
            <div className="col-lg-3 col-md-3 col-sm-12">
                <h5 className="text-uppercase">Contact</h5>
                <ul className="list-unstyled">
                    <li>
                        <Link to="#!">TBD</Link>
                    </li>
                    <li>
                        <Link to="#!">TBD</Link>
                    </li>
                    <li>
                        <Link to="#!">TBD</Link>
                    </li>
                    <li>
                        <Link to="#!">TBD</Link>
                    </li>
                </ul>
            </div>
        ),
        credits: (
            <div className="col-lg-3 col-md-3 col-sm-12">
                <h5 className="text-uppercase">Image Credits</h5>
                <ul className="list-unstyled">
                    <li>
                        <a className="unsplash-credit" href="https://unsplash.com/@adamsky1973?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Adam Nieścioruk"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span>Adam Nieścioruk</span></a>
                    </li>
                    <li>
                        <a className="btn btn-secondary" href="https://material.io/resources/icons/?search=arrow&icon=keyboard_arrow_right&style=baseline">Google Material Icons</a>
                    </li>
                </ul>
            </div>
        ),
        copyright: (
            <div className="footer-copyright text-center py-3">© 2020 Copyright:
                <Link to="https://github.com/Luke-zhang-04"> Luke Zhang</Link>, <Link to="https://github.com/ethanlim04">Ethan Lim</Link>, and Pharmasave Carriage Crossing Pharamcy
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
        logo: (
            <div className="col-lg-3 col-md-3 col-sm-12">
                <h5 id="image-header" className="text-uppercase">Carriage Crossing Pharmacy</h5>
                <img src="pictures/pharmasave-logo.png" alt="pharmasave logo"/>
            </div>
        )
    }

    Footer() {
        return (
            <footer className="page-footer font-small blue pt-4">
                <div className="container-fluid text-center text-md-left">
                    <div className="row">
                        {this.footerParts.logo}
                        <hr className="clearfix w-100 d-md-none pb-3" />
                        {this.footerParts.nav}
                        {this.footerParts.contact}
                        {this.footerParts.credits}
                    </div>
                </div>
                {this.footerParts.copyright}
            </footer>
        );
    }

    render() {
        return this.Footer()
    }
}

export default Footer;