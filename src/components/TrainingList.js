import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { CSVLink, CSVDownload } from "react-csv";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment';
import AddTraining from './AddTraining';

class TrainingList extends Component {
    constructor(props) {
        super(props);
        this.state = {trainings: [], open: false, message: ''}
    }

    componentDidMount() {
        this.fetchTrainings();
    }

    fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(jsondata => this.setState({trainings: jsondata}))
    };

    deleteTraining = (link) => {
        if (window.confirm("Are you sure?")) {
        fetch(link, {method: 'DELETE'})
        .then(response => this.fetchTrainings())
        .then(response => this.setState({open:true, message: 'Training deleted'}))
        .catch(err => console.error(err))
        }
    };

    handleClose = () => {
        this.setState({open: false})
    }

    render() {
        const columns = [
            {
                Header: 'Date',
                accessor: 'date',
                Cell: props => moment.utc(props.value).format('DD.MM.YYYY HH:mm')
            },
            {
                Header: 'Customer',
                accessor: 'customer',
                Cell: props => (
                    <div>
                        <span>{props.original.customer.firstname} </span>
                        <span>{props.original.customer.lastname} </span>
                    </div>
                )
            },
            {
                Header: 'Activity',
                accessor: 'activity'
            },
            {
                Header: 'Duration',
                accessor: 'duration'
            },
            {
                Header: '',
                filterable: false,
                sortable: false,
                width: 100,
                accessor: 'links[0].href',
                Cell: ({value}) => (
                    <Button color="secondary" size="small" onClick={() => this.deleteTraining(value)}>DELETE</Button>
                )
            }
        ]
        
        return (
            <div>
                <ReactTable
                    filterable={true}
                    data={this.state.trainings}
                    columns={columns} />             
                <Snackbar
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message={this.state.message}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                />
            </div>
        );
    }
}

export default TrainingList;