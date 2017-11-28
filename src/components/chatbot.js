import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import SendIcon from 'material-ui-icons/Send';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import purple from 'material-ui/colors/purple';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
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

class BadgesList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <img src="honda_1.gif" width="100%" />
        <div className={classes.formContainer}>
          <FormControl className={classes.formControl}>
            <InputLabel
              FormControlClasses={{
                focused: classes.inputLabelFocused,
              }}
              htmlFor="question-input"
            >
              Ask a Question
            </InputLabel>
            <Input
              classes={{
                inkbar: classes.inputInkbar,
              }}
              id="question-input"
            />
          </FormControl>
          <IconButton color="primary" className={classes.button} aria-label="Find">
            <SendIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(BadgesList);
