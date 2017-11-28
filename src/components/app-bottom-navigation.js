import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import Receipt from 'material-ui-icons/Receipt';
import Search from 'material-ui-icons/Search';
import Camera from 'material-ui-icons/Camera';
import { showBadgesList, showBadgeUploadForm, showParkingMap } from '../actions/actions';

const styles = theme => ({
  root: {
    bottom: 0,
    position: 'fixed',
    width: '100%',
  },
});

class AppBottomNavigation extends React.Component {
  static propTypes = {
    navigationId: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired,
    openBadgesList: PropTypes.func.isRequired,
    openParkingMap: PropTypes.func.isRequired,
    openBadgeUploadForm: PropTypes.func.isRequired,
  };

  render() {
    const { navigationId, classes, openBadgesList, openParkingMap, openBadgeUploadForm } = this.props;

    return (
      <BottomNavigation
        value={navigationId}
        className={classes.root}
        showLabels
      >
        <BottomNavigationButton label="Permits" icon={<Receipt />} onClick={openBadgesList} />
        <BottomNavigationButton label="Search Parking" icon={<Search />} onClick={openParkingMap} />
        <BottomNavigationButton label="Ticket Scan" icon={<Camera />} onClick={openBadgeUploadForm} />
      </BottomNavigation>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  openBadgesList: () => dispatch(showBadgesList()),
  openBadgeUploadForm: () => dispatch(showBadgeUploadForm()),
  openParkingMap: () => dispatch(showParkingMap()),
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(AppBottomNavigation));
