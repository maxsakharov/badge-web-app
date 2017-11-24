import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
}

BadgesList.propTypes = {
  isOpen: PropTypes.bool,
};

BadgesList.defaultProps = {
  isOpen: false,
};


const mapStateToProps = state => ({
  isOpen: state.app.screen === 'BADGES_LIST',
});

export default connect(mapStateToProps)(withStyles(styles)(BadgesList));
