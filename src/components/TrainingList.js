import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DeleteDialog from './DeleteDialog';

import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment';


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
        fetch('https://customerrest.herokuapp.com/api/trainings/' + link, {method: 'DELETE'})
        .then(response => this.fetchTrainings())
        .then(response => this.setState({open:true, message: 'Training deleted'}))
        .catch(err => console.error(err))
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
                id: 'customer',
                Header: 'Customer',
                accessor: row => row.customer.firstname + ' ' + row.customer.lastname
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
                Header: 'Delete',
                filterable: false,
                sortable: false,
                width: 100,
                accessor: 'id',
                Cell: ({value}) => (
                    <DeleteDialog deleteAction={() => this.deleteTraining(value)}></DeleteDialog>
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