import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {},
});

class BadgesList extends Component {
  render() {
    return (
      <div>Manage your badges</div>
    );
  }
}

export default withStyles(styles)(BadgesList);
