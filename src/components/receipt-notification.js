import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import { showParkingReceipt } from '../actions/actions';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class ReceiptNotificaton extends Component {
  static propTypes = {
    viewReceipt: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  state = {
    receiptAvailable: false,
  };

  componentDidMount() {
    setInterval(this.checkReceipt, 5000);
  }

  checkReceipt = () => {
    const { receiptAvailable } = this.state;
    if (!receiptAvailable) {
      fetch('//s3.amazonaws.com/badge-files-dev/receipts/receipt.jpg')
        .then((response) => {
          if (response.ok) {
            if (response.ok) {
              this.setState({
                receiptAvailable: true,
              });
            } else if (receiptAvailable) {
              this.setState({
                receiptAvailable: false,
              });
            }
          }
        });
    }
  }

  hideNotification = () => {
    this.setState({
      receiptAvailable: false,
    });

    fetch('//badges/receipts/', { method: 'DELETE' });
  }

  render() {
    const { receiptAvailable } = this.state;
    if (!receiptAvailable) {
      return null;
    }

    const { classes } = this.props;
    return (<Snackbar
      open
      message={<span id="message-id">Parking Receipt Available</span>}
      action={[
        <Button key="view-receipt" color="contrast" onClick={this.props.viewReceipt}>View</Button>,
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={this.hideNotification}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />);
  }
}

const mapDispatchToProps = dispatch => ({
  viewReceipt: () => dispatch(showParkingReceipt()),
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(ReceiptNotificaton));
