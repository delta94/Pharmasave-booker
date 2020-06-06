/**
 * Defines the agenda component
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

/* eslint-disable @typescript-eslint/semi, max-lines */
import CustomDate from "../CustomDate"
import React from "react";
/* eslint-enable @typescript-eslint/semi */

interface SubmitModalProps {
    [index: string]: string | JSX.Element,
    display: string,
    text: string,
    type: string,
    time: string,
    day: string,
    form: JSX.Element
}


export default class SubmitModal extends React.Component<{}, SubmitModalProps> {

    public constructor (props: {}) {
        super(props)

        this.state = {
            display: "none",
            text: "",
            type: "",
            day: "",
            time: "",
            form: <></>,
        }
    }

    public mount = (
        text: string,
        type: string,
        time: string,
        day: string,
    ): void => {
        this.setState({
            text,
            display: "block",
            type,
            time,
            day
        })
    }

    public unmount = (): void => {
        this.setState({display: "none"})
    }

    private _sendReq = async (): Promise<void> => {
        // await AgendaUtils.makeNewEntry(
        //     props.day,
        //     CustomDate.to24Hour(props.time),
        //     `${props.type}`,
        // )
        // this.changeDay(dayString)
    }

    private _modal = (): JSX.Element => {


        return (
            <div className="modal" style={{display: this.state.display}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                New Booking for {this.state.type} at {this.state.time} on {CustomDate.addZeros(CustomDate.offsetZero(this.state.day))}
                            </h5>
                            <button type="button" className="close" onClick={this.unmount}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input placeholder="Bruh"></input>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary">Save changes</button>
                            <button type="button" className="btn btn-primary" onClick={this.unmount}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    public render = (): JSX.Element => <this._modal/>

}
