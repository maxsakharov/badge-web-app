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

const Navigation = {
  HOME: {
    id: 'HOME',
    navigationId: -1,
    title: 'Parking Concierge',
  },
  BADGES_LIST: {
    id: 'BADGES_LIST',
    navigationId: 0,
    title: 'Manage your badges',
  },
  PARKING_MAP: {
    id: 'PARKING_MAP',
    navigationId: 1,
  },
  BADGE_UPLOAD_FORM: {
    id: 'BADGE_UPLOAD_FORM',
    navigationId: 2,
  },
};

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
    case Navigation.BADGES_LIST.id:
      return <BadgesList />;
    case Navigation.BADGE_UPLOAD_FORM.id:
      return <BadgeUploadForm />;
    case Navigation.PARKING_MAP.id:
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
    const { screen } = this.props;
    const screenInfo = Navigation[screen] || Navigation.HOME;
    const { title, navigationId } = screenInfo;

    return (
      <div className="App">
        <AppBar title={title} />
        <Container>
          <Screen name={this.props.screen} />
        </Container>
        <BottomNavigation navigationId={navigationId} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  screen: state.app.screen,
});

export default connect(mapStateToProps)(AppUI);

