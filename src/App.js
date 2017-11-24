import React, { Component } from 'react';
import Button from 'material-ui/Button';
import BadgesList from './components/badges-list';
import BadgeUploadForm from './components/badge-upload-form';
import ParkingMap from './components/parking-map';
import AppBar from './components/app-top-bar';
import BottomNavigation from './components/app-bottom-navigation';
import 'typeface-roboto';
import './App.css';

const style = {
  content: { top: '70px', bottom: '70px', position: 'fixed', width: '100%', overflowY: 'scroll' },
};

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <div style={style.content}>
          <BadgesList />
          <BadgeUploadForm />
          <ParkingMap />
        </div>
        <BottomNavigation />
      </div>
    );
  }
}
