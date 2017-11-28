import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Camera from 'material-ui-icons/Camera';
import FileUpload from 'material-ui-icons/FileUpload';
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

  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  selectFile(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files && e.target.files[0];
    if (file) {
      reader.onloadend = upload => this.setState({
        file: upload.target.result,
      }, this.uploadFile);
      reader.readAsDataURL(file);
    }
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('badge', this.state.file);
    fetch('http://localhost/badge/', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        type: 'formData',
      },
      body: formData,
    }).then((response) => {
      // TODO proper response handling - display badge info etc.
      console.log(`The badge was ${response.ok === true ? '' : 'NOT'} uploaded successfully`);
    }).catch(() => {
      // TODO proper handling
      console.log('Error');
    });
  }

  render() {
    const { classes } = this.props;
    const { file } = this.state;

    return (
      <div className={classes.badgeUploadForm}>
        <Button
          className={classes.button}
          raised
          id="raised-button-file"
          component="label"
          color="primary"
          label="Ticket"
        >
          {file
            ? [
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

        <img className={classes.imagePreview} src={file} />
      </div>
    );
  }
}

export default withStyles(styles)(BadgeUploadForm);
