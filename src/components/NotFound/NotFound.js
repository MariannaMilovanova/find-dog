import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class NotFound extends Component {
    render() {
        return (
            <div className="container text-center">
                <h1>This is a 404 page!</h1>
                <hr/>
                <Link to="/">Back To Home View</Link>
            </div>
        );
    }
}