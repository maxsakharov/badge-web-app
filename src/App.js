import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'typeface-roboto'; // eslint-disable-line import/extensions
import Chatbot from './components/chatbot';
import BadgesList from './components/badges-list';
import BadgeUploadForm from './components/badge-upload-form';
import ParkingMap from './components/parking-map';
import AppBar from './components/app-top-bar';
import BottomNavigation from './components/app-bottom-navigation';
import ReceiptNotificaton from './components/receipt-notification';
import ParkingReceipt from './components/parking-receipt';
import './App.css';

const Navigation = {
  HOME: {
    id: 'HOME',
    navigationId: -1,
    title: 'Rhonda',
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
    top: '56px', bottom: '56px', position: 'fixed', width: '100%', overflowY: 'scroll',
  },
};

function Container({ children, displayBottomNav }) {
  const contentStyle = Object.assign(
    {},
    style.content,
    {
      bottom: displayBottomNav ? '56px' : '0px',
    }
  );

  return (
    <div style={contentStyle}>
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  displayBottomNav: PropTypes.bool,
};

Container.defaultProps = {
  displayBottomNav: true,
};

function Screen({ name, ...props }) {
  switch (name) {
    case Navigation.BADGES_LIST.id:
      return <BadgesList />;
    case Navigation.PARKING_MAP.id:
      return <ParkingMap {...props} />;
    case Navigation.BADGE_UPLOAD_FORM.id:
      return <BadgeUploadForm />;
    case 'PARKING_RECEIPT':
      return <ParkingReceipt />;
    default:
      return <Chatbot />;
  }
}

Screen.propTypes = {
  name: PropTypes.string.isRequired,
};

class AppUI extends Component {
  static propTypes = {
    screen: PropTypes.string,
    location: PropTypes.string,
  }

  static defaultProps = {
    screen: '',
    location: '',
  }

  render() {
    const { screen, location } = this.props;
    const screenInfo = Navigation[screen] || Navigation.HOME;
    const { title, navigationId } = screenInfo;

    return (
      <div className="App">
        <AppBar title={title} />
        <Container displayBottomNav={navigationId !== -1}>
          <Screen name={screen} location={location} />
        </Container>
        <BottomNavigation navigationId={navigationId} />
        <ReceiptNotificaton />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  screen: state.app.screen,
  location: state.app.location,
});

export default connect(mapStateToProps)(AppUI);
