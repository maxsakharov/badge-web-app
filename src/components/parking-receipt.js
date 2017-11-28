import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  image: {
    width: '100%',
  },
});

class ParkingReceipt extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    image: null,
  };

  componentDidMount() {
    fetch('//s3.amazonaws.com/badge-files-dev/receipts/receipt.jpg')
      .then((response) => {
        if (response.ok) {
          response.blob().then((data) => {
            const image = URL.createObjectURL(data);
            this.setState({
              image,
            });
          });
        }
      });
  }

  render() {
    const { image } = this.state;
    if (!image) {
      return null;
    }

    const { classes } = this.props;
    return (
      <div>
        <img src={image} className={classes.image} alt="Receipt" />
      </div>
    );
  }
}

export default (withStyles(styles)(ParkingReceipt));

