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

class GoogleSignInButton extends React.Component {
    buttonState(state: string, event: React.MouseEvent<HTMLImageElement, MouseEvent>) {
        (event.target as HTMLInputElement).setAttribute("src", `../pictures/btn_google_signin_dark_${state}_web.png`)
    }

    render() {
        return (
            <div className="google-sign-in">
                <img
                    alt="google-sign-in"
                    src="../pictures/btn_google_signin_dark_normal_web.png"
                    onMouseEnter={(e) => this.buttonState("focus", e)}
                    onMouseLeave={(e) => this.buttonState("normal", e)}
                />
            </div>
        );
    }
}

class Login extends React.Component<any, any> {
    constructor(props: object) {
        super(props)
        this.state = {
            display: "block"
        }
    }
    
    private form_components = {
        email: (
            <label>
                Email
                <input type="email" className="form-control" id="login-email" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </label>
        ),
        password: (
            <label>
                Password
                <input type="password" className="form-control" id="login-password" placeholder="Password"/>
            </label>
        ),
        buttons: (
            <div className="row">
                <div className="col-6">
                    <button type="submit" className="btn btn-secondary">Login</button>  
                </div>
                <div className="col-6">
                    <GoogleSignInButton/>
                </div>
            </div>
        )
    }

    render() {
        return (
            <form style={{display: this.state.display}} >
                <div className="form-group">
                    {this.form_components.email}
                </div>
                <div className="form-group">
                    {this.form_components.password}
                </div>
                <a href="#!">Forgot your password?</a>
                {this.form_components.buttons}
            </form>
        );
    }
}

class Reg extends React.Component<any, any> {
    constructor(props: object) {
        super(props)
        this.state = {
            display: "none"
        }
    }

    private form_components = {
        name: (
            <label>
                Full, legal name
                <input type="name" className="form-control" id="reg-name" aria-describedby="emailHelp" placeholder="Full, legal name"/>
            </label>
        ),
        email: (
            <label>
                Email
                <input type="email" className="form-control" id="reg-email" aria-describedby="emailHelp" placeholder="Email"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </label>
        ),
        password: (
            <label>
                Password
                <input type="password" className="form-control" id="reg-password" placeholder="Password"/>
            </label>
        ),
        password2: (
            <label>
                Confirm you Password
                <input type="password" className="form-control" id="reg-password-2" placeholder="Retype password"/>
            </label>
        ),
        buttons: (
            <div className="row">
                <div className="col-6">
                    <button type="submit" className="btn btn-secondary">Register</button>  
                </div>
                <div className="col-6">
                    <GoogleSignInButton/>
                </div>
            </div>
        )
    }

    render() {
        return (
            <form style={{display: this.state.display}}>
                <div className="form-group">
                    {this.form_components.name}
                </div>
                <div className="form-group">
                    {this.form_components.email}
                </div>
                <div className="form-group">
                    {this.form_components.password}
                </div>
                <div className="form-group">
                    {this.form_components.password2}
                </div>
                <div className="form-group">
                    <p> By signing up, you agree to our <Link to="/Legal">Terms and Conditions</Link> and <Link to="/Privacy-policy">Privacy Policy</Link></p>
                    <label id="tandc">
                    I have read, and agree to the <Link to="/Legal">Terms and Conditions</Link>
                        <input type="checkbox" className="form-check-input" id="tandc-check"></input>
                    </label>
                    <label id="ppolicy">
                        I have read, and agree to the <Link to="/Privacy-policy">Privacy Policy</Link>
                        <input type="checkbox" className="form-check-input" id="ppolicy-check"></input>
                    </label>
                </div>
                {this.form_components.buttons}
            </form>
        );
    }
}

export {
    GoogleSignInButton,
    Reg,
    Login
}