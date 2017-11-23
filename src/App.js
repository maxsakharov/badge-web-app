import React, { Component } from 'react';
import { connect } from 'react-redux'
import { showBadgeUploadForm } from './actions/actions';
import BadgeUploadForm from './components/badge-upload-form'
import 'typeface-roboto';
import './App.css';


class AppUI extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Manage your badges</h1>
        </header>
        <div className="navigation">
          <button type="button" className="button" onClick={this.props.openBadgeUploadForm}>Upload badge</button>
        </div>
        <BadgeUploadForm />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return { 
    openBadgeUploadForm: () => dispatch(showBadgeUploadForm()),
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(AppUI);