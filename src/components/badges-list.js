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

const badgesMock = [
  {
    id: 'default',
    name: 'test',
    lat: '51.5033640',
    long: '-0.1276250',
    location: 'https://s3.amazonaws.com/badge-files-dev/badge-image/default',
    created_at: '2017-11-27T21:43:09.976Z',
  },
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
    fetch('http://52.4.240.117:8080/badge')
      .then(response => response.json())
      .then((badges) => {
        this.setState({
          badges,
        });
      })
      .catch((err) => {
        console.err('err', err);
        this.setState({
          badges: badgesMock,
        });
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div>Manage your badges</div>
        {this.state.badges && this.state.badges.map(badge => (
          <Card key={badge.id} className={classes.card}>
            <CardContent>
              <Typography type="body1" className={classes.title}>
                {badge.name}
              </Typography>
              <img src={badge.location} width="358" />
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
