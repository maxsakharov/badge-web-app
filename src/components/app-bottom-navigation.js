import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import Receipt from 'material-ui-icons/Receipt';
import LocalParking from 'material-ui-icons/LocalParking';
import Scanner from 'material-ui-icons/Scanner';

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
  };

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        className={classes.root}
        showLabels
      >
        <BottomNavigationButton label="Parking Tickets" icon={<Receipt />} />
        <BottomNavigationButton label="Search Parking" icon={<LocalParking />} />
        <BottomNavigationButton label="Ticket Scan" icon={<Scanner />} />
      </BottomNavigation>
    );
  }
}

export default withStyles(styles)(AppBottomNavigation);