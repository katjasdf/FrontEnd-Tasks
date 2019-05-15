import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Icon } from 'antd';
import "antd/dist/antd.css";

class AddTraining extends Component {
    state = { // määrittää lomakkeen tilan ja kentät
        open: false, firstname: '', lastname: '', date: '', duration: '', activity: ''
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

      saveTraining = () => {
          const newTraining = {
            date: this.state.date + ":00.000",
            duration: this.state.duration,
            activity: this.state.activity,
            customer: this.props.customer
          }

        this.props.addTraining(newTraining);
        this.handleClose();

      }

    render() {
        return (
                <div>
        <Button className="iconbutton" onClick={this.handleClickOpen}>
          <Icon className="icon" type="plus-circle" />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New training</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="date"
              type="datetime-local"
              value={this.state.date}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="duration"
              value={this.state.duration}
              onChange={this.handleChange}
              label="Duration"
              fullWidth
            />
            <TextField
              margin="dense"
              name="activity"
              value={this.state.activity}
              onChange={this.handleChange}
              label="Activity"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} className="secondarybutton">
              Cancel
            </Button>
            <Button onClick={this.saveTraining} className="button">
              Save
            </Button>
          </DialogActions>
        </Dialog>
                
            </div>
        );
    }
}

export default AddTraining;