import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from 'material-ui/Button';
import { showBadgeUploadForm, showParkingMap } from './actions/actions';
import BadgeUploadForm from './components/badge-upload-form';
import ParkingMap from './components/parking-map';
import AppBar from './components/app-top-bar';
import BottomNavigation from './components/app-bottom-navigation';
import 'typeface-roboto';
import './App.css';


class AppUI extends Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <div style={{ top: '70px', bottom: '70px', position: 'fixed', width: '100%', overflowY: 'scroll' }}>
          <header className="App-header">
            <h1 className="App-title">Manage your badges</h1>
          </header>
          <div className="navigation">
            <Button raised color="primary" onClick={this.props.openBadgeUploadForm}>Upload badge</Button>
            <Button raised color="primary" onClick={this.props.openParkingMap}>Search parking</Button>
          </div>
          <BadgeUploadForm />
          <ParkingMap />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return { 
    openBadgeUploadForm: () => dispatch(showBadgeUploadForm()),
    openParkingMap: () => dispatch(showParkingMap()),
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(AppUI);