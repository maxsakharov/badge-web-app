/* eslint-disable no-nested-ternary */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Camera from 'material-ui-icons/Camera';
import FileUpload from 'material-ui-icons/FileUpload';
import Autorenew from 'material-ui-icons/Autorenew';
import Done from 'material-ui-icons/Done';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  badgeUploadForm: {
    minHeight: 300,
    padding: 20,
  },
  imagePreview: {
    margin: 10,
    width: '80%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class BadgeUploadForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    file: null,
    fileSrc: null,
    uploading: false,
    uploaded: false,
  }

  getCurrentPositionSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    const formData = new FormData();
    formData.append('badge', this.state.file);
    formData.append('name', 'current parking permit');
    formData.append('lat', latitude);
    formData.append('long', longitude);

    fetch('http://52.4.240.117:8080/badge', {
      method: 'POST',
      body: formData,
    }).then((response) => {
      // TODO proper response handling - display badge info etc.
      console.log(`The badge was ${response.ok === true ? '' : 'NOT'} uploaded successfully`);
    }).catch(() => {
      // TODO proper handling
      console.log('Error');
    }).then(() => {
      this.setState({
        uploading: false,
        uploaded: true,
      });
    });
  }

  error = error => console.log(error);

  uploadFile = (e) => {
    e.preventDefault();

    this.setState({
      uploading: true,
    }, () => {
      navigator.geolocation.getCurrentPosition(this.getCurrentPositionSuccess, this.error);
    });
  }

  selectFile = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files && e.target.files[0];
    if (file) {
      reader.onloadend = upload => this.setState({
        file,
        fileSrc: upload.target.result,
      });
      reader.readAsDataURL(file);
    }
  }

  render() {
    const { classes } = this.props;
    const { fileSrc, uploading, uploaded } = this.state;

    return (
      <div className={classes.badgeUploadForm}>
        {uploaded
          ? (
            <Button
              className={classes.button}
              raised
              id="raised-button-file"
              component="label"
              color="primary"
              label="Ticket"
              onClick={fileSrc ? this.uploadFile : () => {}}
            >
              {[
                <span key="label">Uploaded</span>,
                <Done key="icon" className={classes.rightIcon} />,
              ]}
            </Button>
          )
          : (
            <Button
              className={classes.button}
              raised
              id="raised-button-file"
              component="label"
              color="primary"
              label="Ticket"
              onClick={fileSrc ? this.uploadFile : () => {}}
            >
              {fileSrc
                ?
                  uploading
                    ? [
                      <span key="label">Uploading...</span>,
                      <Autorenew key="icon" className={classes.rightIcon} />,
                    ]
                    : [
                      <span key="label">Upload Ticket</span>,
                      <FileUpload key="icon" className={classes.rightIcon} />,
                    ]
                : [
                  <span key="label">Select Ticket</span>,
                  <Camera key="icon" className={classes.rightIcon} />,
                  <input
                    key="file"
                    accept="image/*"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={e => this.selectFile(e)}
                  />,
                ]
              }
            </Button>
          )
        }
        <img className={classes.imagePreview} src={fileSrc} />
      </div>
    );
  }
}

export default withStyles(styles)(BadgeUploadForm);
