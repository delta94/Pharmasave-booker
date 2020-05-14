/**
 * Partial which defines forms for authentication
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
import { Link } from "react-router-dom";
import {
    makeButton, 
    makeEmailField,
} from "./_Form_components";

/**
 * Login form
 */
class Login extends React.Component<{}, {[key: string]: string}>  {
    constructor(props: object) {
        super(props)
        this.state = {
            display: "block"
        }
    }
    
    private formComponents = {
        password: (
            <label>
                Password
                <input type="password" className="form-control" id="login-password" placeholder="Password"/>
            </label>
        ),
    }

    public render = (): JSX.Element => {
        return (
            <form style={{display: this.state.display}} >
                <div className="form-group">
                    {makeEmailField("login")}
                </div>
                <div className="form-group">
                    {this.formComponents.password}
                </div>
                <a href="#!">Forgot your password?</a>
                {makeButton("Login")}
            </form>
        );
    }
}


/**
 * Registration form
 */
class Reg extends React.Component<{}, {[key: string]: string}>  {
    constructor(props: object) {
        super(props)
        this.state = {
            display: "none"
        }
    }

    private formComponents = {
        name: (
            <label>
                Full, legal name
                <input type="name" className="form-control" id="reg-name" aria-describedby="emailHelp" placeholder="Full, legal name"/>
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
        agreement: (
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
        ),
    }

    public render = (): JSX.Element => {
        return (
            <form style={{display: this.state.display}}>
                <div className="form-group">
                    {this.formComponents.name}
                </div>
                <div className="form-group">
                    {makeEmailField("reg")}
                </div>
                <div className="form-group">
                    {this.formComponents.password}
                </div>
                <div className="form-group">
                    {this.formComponents.password2}
                </div>
                {this.formComponents.agreement}
                {makeButton("Register")}
            </form>
        );
    }
}

export {
    Reg,
    Login,
};
