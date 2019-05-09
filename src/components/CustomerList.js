import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import EditCustomer from './EditCustomer';
import AddCustomer from './AddCustomer';
import DeleteCustomer from './DeleteCustomer';

import { CSVLink, CSVDownload } from "react-csv";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddTraining from './AddTraining';

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {customers: [], open: false, message: ''}
    }

    componentDidMount() {
        this.fetchCustomers();
    }

    fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(jsondata => this.setState({customers: jsondata.content}))
    };

    deleteCustomer = (link) => {
        //if () {
        fetch(link, {method: 'DELETE'})
        .then(response => this.fetchCustomers())
        .then(response => this.setState({open:true, message: 'Customer deleted'}))
        .catch(err => console.error(err))
        }
   // };

    addCustomer = (newCustomer) => { // github fetch post JSON
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
        .then(res => this.fetchCustomers())
        .then(response => this.setState({open:true, message: 'New Customer added'}))
        .catch(err => console.error(err));
    }

    editCustomer = (link, customer) => {
        fetch( link, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => this.fetchCustomers())
        .then(response => this.setState({open:true, message: 'Changes saved'}))
        .catch(err => console.error(err));
    }

    addTraining = (newTraining) => { // github fetch post JSON
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTraining)
        })
        .then(res => this.fetchCustomers())
        .then(response => this.setState({open:true, message: 'New Training saved'}))
        .catch(err => console.error(err));
    }

    handleClose = () => {
        this.setState({open: false})
    }

    render() {
        const columns = [
            {
                Header: 'First name',
                accessor: 'firstname',
                show: false
            },
            {
                Header: 'Last name',
                accessor: 'lastname',
                show: false
            },
            {
                Header: 'Name',
                accessor: 'name',
                Cell: props => (
                    <div>
                        <span>{props.original.firstname} </span>
                        <span>{props.original.lastname} </span>
                    </div>
                )
            },
            {
                Header: 'Street address',
                accessor: 'streetaddress',
                show: false
            },
            {
                Header: 'Postal code',
                accessor: 'postcode',
                show: false
            },
            {
                Header: 'City',
                accessor: 'city',
                show: false
            },
            {
                Header: 'Address',
                accessor: 'address',
                Cell: props => (
                    <div>
                        <span>{props.original.streetaddress}, </span>
                        <span>{props.original.postcode}, </span>
                        <span>{props.original.city} </span>
                    </div>
                )
            },
            {
                Header: 'Email',
                accessor: 'email'
            },
            {
                Header: 'Phone',
                accessor: 'phone'
            },
            {
                Header: '',
                filterable: false,
                sortable: false,
                width: 150,
                accessor: 'links[0].href',
                Cell: ({value}) => (
                 <AddTraining addTraining={this.addTraining} fetchCustomers={this.fetchCustomers} customer={value} />
                )

            },
            {
                Header: '',
                filterable: false,
                sortable: false,
                width: 100,
                accessor: 'links[0].href',
                Cell: ({value, row}) => (
                 <EditCustomer editCustomer={this.editCustomer} customer={row} link={value} />
                )

            },
            {
                Header: '',
                filterable: false,
                sortable: false,
                width: 100,
                accessor: 'links[0].href',
                Cell: ({value}) => (
                    <DeleteCustomer color="secondary" size="small" onClick={() => this.deleteCustomer(value)}>DELETE</DeleteCustomer>
                )
            }
        ]
        
        return (
            <div>
                <AddCustomer addCustomer={this.addCustomer} />
                <ReactTable
                    filterable={true}
                    data={this.state.customers}
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

export default CustomerList;