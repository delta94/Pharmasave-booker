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
 * This program is distributed in the hope that it will be usefu
 * but WITHOUT ANY WARRANTY; without even the implied warranty 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public Licence
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
/* eslint-disable semi */
import React from "react";
import {auth} from "./firebase";
/* eslint-enable semi */

export const AuthContext = React.createContext({user: null})

export default class AuthProvider extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            user: null
        }
    }

    componentDidMount = () => {
        auth.onAuthStateChanged((user) => {
            this.setState({user})
        })
    }

    render = () => (
        <AuthContext.Provider value={this.state.user}>
            {this.props.children ? this.props.children : <div></div>}
        </AuthContext.Provider>
    )

}
