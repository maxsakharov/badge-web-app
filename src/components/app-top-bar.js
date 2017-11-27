import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui-icons/Home';
import { showHome } from '../actions/actions';

const styles = theme => ({
  root: {
    width: '100%',
  },
  title: {
    flex: 1,
    marginRight: 40,
  },
  homeButton: {
    // color: 'rgba(0, 0, 0, 0.54)',
    marginLeft: -12,
    marginRight: 20,
  },
});

function AppTopBar(props) {
  const { classes, openHome } = props;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <IconButton className={classes.homeButton} aria-label="Home" onClick={openHome}>
            <HomeIcon color="inherit" />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.title}>
            Parking Concierge
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppTopBar.propTypes = {
  classes: PropTypes.object.isRequired,
  openHome: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  openHome: () => dispatch(showHome()),
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(AppTopBar));
