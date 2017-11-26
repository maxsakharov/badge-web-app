import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  card: {
    minWidth: 275,
    margin: 12,
    textAlign: 'left',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
});

const badges = [
  'home',
  'work',
  'beach',
  'cafe',
];

class BadgesList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    badges: [],
  }

  componentDidMount() {
    this.fetchBadges();
  }

  fetchBadges = () => {
    this.setState({
      badges,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div>Manage your badges</div>
        {this.state.badges && this.state.badges.map(badge => (
          <Card key={badge} className={classes.card}>
            <CardContent>
              <Typography type="body1" className={classes.title}>
                Parking pass
              </Typography>
              <Typography component="p">
                {badge}
              </Typography>
            </CardContent>
            <CardActions>
              <Button dense>Display now</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(BadgesList);
