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

class Login extends React.Component {
    render() {
        return (
            <form>
                <div className="form-group">
                    <label>
                        Email
                        <input type="email" className="form-control" id="login-email" aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Password
                        <input type="password" className="form-control" id="login-password" placeholder="Password"/>
                    </label>
                </div>
                <a href="#">Forgot your password?</a>
                <div className="row">
                    <div className="col-6">
                        <button type="submit" className="btn btn-secondary">Login</button>  
                    </div>
                    <div className="col-6">
                        <div className="google-sign-in"><img alt="google-sign-in" src="../pictures/btn_google_signin_dark_normal_web.png"/></div>
                    </div>
                </div>
            </form>
        );
    }
}

class Auth extends React.Component {
    render() {
        return (
            <div className="auth-container container">
                <div className="back-container"></div>
                <div className="form-container">
                    <h1 className="container">Login</h1>
                    <Login/>
                </div>
            </div>
        );
    }
}

export default Auth;