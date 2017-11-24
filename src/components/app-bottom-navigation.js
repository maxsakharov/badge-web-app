import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import Receipt from 'material-ui-icons/Receipt';
import LocalParking from 'material-ui-icons/LocalParking';
import Scanner from 'material-ui-icons/Scanner';
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
    classes: PropTypes.object.isRequired,
    openBadgesList: PropTypes.func.isRequired,
    openParkingMap: PropTypes.func.isRequired,
    openBadgeUploadForm: PropTypes.func.isRequired,
  };

  state = {
    value: -1,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, openBadgesList, openParkingMap, openBadgeUploadForm } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        className={classes.root}
        showLabels
      >
        <BottomNavigationButton label="Parking Tickets" icon={<Receipt />} onClick={openBadgesList} />
        <BottomNavigationButton label="Search Parking" icon={<LocalParking />} onClick={openParkingMap} />
        <BottomNavigationButton label="Ticket Scan" icon={<Scanner />} onClick={openBadgeUploadForm} />
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
