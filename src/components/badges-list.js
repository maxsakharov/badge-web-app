import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

const styles = {};

class BadgesList extends Component {
  render() {
    const { isOpen } = this.props;

    if (!isOpen) return null;

    return (
      <div>Manage your badges</div>
    );
  }
};

const mapStateToProps = state => {
  return {
    isOpen: state.app.screen === 'BADGES_LIST',
  }
}

export default connect(
  mapStateToProps,
)(withStyles(styles)(BadgesList));
