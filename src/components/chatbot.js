import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import SendIcon from 'material-ui-icons/Send';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import purple from 'material-ui/colors/purple';
import { connect } from 'react-redux';
import { searchParking } from '../actions/actions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    transform: 'translateY(-50px)',
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    backgroundColor: theme.palette.background.appBar,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  formControl: {
    margin: theme.spacing.unit,
    flex: 1,
  },
  inputLabelFocused: {
    color: purple[500],
  },
  inputInkbar: {
    '&:after': {
      backgroundColor: purple[500],
    },
  },
  button: {
    alignSelf: 'flex-end',
  },
});

class Chatbot extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    showParkingOptions: PropTypes.func.isRequired,
  }

  search = (e) => {
    e.preventDefault();

    const input = document.getElementById('location-input');
    if (!(input && input.value)) return;

    const { showParkingOptions } = this.props;
    showParkingOptions(input.value);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <img src="honda_1.gif" className={classes.image} />
        <div className={classes.formContainer}>
          <FormControl className={classes.formControl}>
            <InputLabel
              FormControlClasses={{
                focused: classes.inputLabelFocused,
              }}
              htmlFor="location-input"
            >
              Ask a Question
            </InputLabel>
            <Input
              classes={{
                inkbar: classes.inputInkbar,
              }}
              id="location-input"
              ref={(input) => { this.input = input; }}
            />
          </FormControl>
          <IconButton color="primary" className={classes.button} aria-label="Find" onClick={this.search}>
            <SendIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  showParkingOptions: location => dispatch(searchParking(location)),
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Chatbot));
