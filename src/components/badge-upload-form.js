import React, { Component } from 'react';
import { connect } from 'react-redux'
import './badge-upload-form.css';

class BadgeUploadFormUI extends Component {
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
      reader.onloadend = (upload) => {
        this.setState({
          file: upload.target.result,
        })
        this.uploadFile();
      };
      reader.readAsDataURL(file);
    }
  }

  uploadFile() {
    const formData = new FormData();
    formData.append("badge", this.state.file);
    fetch('http://localhost/badge/', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'type': 'formData',
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
    const { isOpen } = this.props;
    const { file } = this.state;

    if (!isOpen) {
      return null;
    }

    return (
      <div className="badge-upload-form">
        <input type="file" onChange={e => this.selectFile(e)} />
        <img className="image-preview" src={file} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isOpen: state.app.screen === 'BADGE_UPLOAD_FORM',
  }
}

export default connect(
  mapStateToProps,
)(BadgeUploadFormUI);

