import React from 'react';
import Dialog from 'material-ui/Dialog';
import DialogTitle from 'material-ui/Dialog/DialogTitle';
import DialogContent from 'material-ui/Dialog/DialogContent';
import DialogActions from 'material-ui/Dialog/DialogActions';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class DialogExampleSimple extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <RaisedButton label="Dialog" onTouchTap={this.handleToggle} />
        <Dialog
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <DialogTitle>Use Google's location service?</DialogTitle>
          <DialogContent>
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContent>
          <DialogActions>
            <FlatButton
              label="No"
              primary={true}
              onTouchTap={this.handleClose}
            />
            <FlatButton
              label="Yes"
              primary={true}
              onTouchTap={this.handleClose}
            />
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
