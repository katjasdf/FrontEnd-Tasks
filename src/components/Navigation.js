import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Navigator extends Component {
    render() {
        return (

            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <button class="navbar-toggler navbar-toggler-right" type="button"
                    data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
            </button>
                <Link class="navbar-brand" to ="/">Personal Trainer Co.</Link>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <Link class="nav-link" to="/CustomerList">Customers</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/TrainingList">Trainings</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/Calendar">Calendar</Link>
                    </li>
                </ul >
                </div>
                </nav>

            </div>
        );
    }
}

export default Navigator;