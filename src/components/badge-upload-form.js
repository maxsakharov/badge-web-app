import React, { Component } from 'react';
import './badge-upload-form.css';

export default class BadgeUploadForm extends Component {
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
    const { file } = this.state;

    return (
      <div className="badge-upload-form">
        <input type="file" onChange={e => this.selectFile(e)} />
        <img className="image-preview" src={file} />
      </div>
    );
  }
}
