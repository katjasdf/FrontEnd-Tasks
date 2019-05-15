import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Icon } from 'antd';
import "antd/dist/antd.css";

class DeleteDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  //deleteCustomer = () => {
    //this.props.deleteCustomer(this.props.customer);
    //this.handleClose();
  //}

  onDelete = () => {
    this.props.deleteAction();
    this.handleClose();
  }

  render() {
    return (
      <div>
        <Button color="secondary" onClick={this.handleClickOpen}>
          <Icon type="delete" />
        </Button>
        <Dialog
          className="dialog"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If you delete a customer, all planned trainings will be also deleted.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} className="secondarybutton">
              Cancel
            </Button>
            <Button onClick={this.onDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteDialog;