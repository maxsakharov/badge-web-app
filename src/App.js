import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'typeface-roboto'; // eslint-disable-line import/extensions
import BadgesList from './components/badges-list';
import BadgeUploadForm from './components/badge-upload-form';
import ParkingMap from './components/parking-map';
import AppBar from './components/app-top-bar';
import BottomNavigation from './components/app-bottom-navigation';
import './App.css';

const style = {
  content: {
    top: '70px', bottom: '70px', position: 'fixed', width: '100%', overflowY: 'scroll',
  },
};

function Container({ children }) {
  return (
    <div style={style.content}>
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

function Screen({ name }) {
  switch (name) {
    case 'BADGES_LIST':
      return <BadgesList />;
    case 'BADGE_UPLOAD_FORM':
      return <BadgeUploadForm />;
    case 'PARKING_MAP':
      return <ParkingMap />;
    default:
      return <div />;
  }
}

Screen.propTypes = {
  name: PropTypes.string.isRequired,
};

class AppUI extends Component {
  static propTypes = {
    screen: PropTypes.string,
  }

  static defaultProps = {
    screen: '',
  }

  render() {
    return (
      <div className="App">
        <AppBar />
        <Container>
          <Screen name={this.props.screen} />
        </Container>
        <BottomNavigation />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  screen: state.app.screen,
});

export default connect(mapStateToProps)(AppUI);

