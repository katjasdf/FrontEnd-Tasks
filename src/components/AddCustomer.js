import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Icon } from 'antd';
import "antd/dist/antd.css";

class AddCustomer extends Component {
    state = { // määrittää lomakkeen tilan ja kentät
        open: false, firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
      };
    
      handleClickOpen = () => { 
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

      handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
      };

      saveCustomer = () => {
          const newCustomer = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            streetaddress: this.state.streetaddress,
            postcode: this.state.postcode,
            city: this.state.city,
            email: this.state.email,
            phone: this.state.phone
          }

        this.props.addCustomer(newCustomer);
        this.handleClose();

      }

    render() {
        return (
                <div>
        <Button className="addButton" variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add new customer <Icon className="icon" type="user-add" />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New customer</DialogTitle>
          <DialogContent>
          <TextField
              autoFocus // määrittä mihin aletaan kirjoittaa
              margin="dense"
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleChange}
              label="Firstname"
              fullWidth
            />
            <TextField
              margin="dense"
              name="lastname"
              value={this.state.lastname}
              onChange={this.handleChange}
              label="Lastname"
              fullWidth
            />
            <TextField
              margin="dense"
              name="streetaddress"
              value={this.state.streetaddress}
              onChange={this.handleChange}
              label="Street Address"
              fullWidth
            />
            <TextField
              margin="dense"
              name="postcode"
              value={this.state.postcode}
              onChange={this.handleChange}
              label="Postal code"
              fullWidth
            />
            <TextField
              margin="dense"
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
              label="City"
              fullWidth
            />
            <TextField
              margin="dense"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              label="Email"
              fullWidth
            />
            <TextField
              margin="dense"
              name="phone"
              value={this.state.phone}
              onChange={this.handleChange}
              label="Phone"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} className="secondarybutton">
              Cancel
            </Button>
            <Button onClick={this.saveCustomer} className="button">
              Save
            </Button>
          </DialogActions>
        </Dialog>
                
            </div>
        );
    }
}

export default AddCustomer;