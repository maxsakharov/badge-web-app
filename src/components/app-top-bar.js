import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
});

function AppTopBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Typography type="title" color="inherit" className={classes.flex}>
            Parking Concierge
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppTopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppTopBar);
