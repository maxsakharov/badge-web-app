import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
// import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  card: {
    minWidth: 275,
    margin: 12,
    textAlign: 'left',
  },
  cardContent: {
    // padding: 0,
  },
  cardActions: {
    justifyContent: 'center',
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
    location: '//s3.amazonaws.com/badge-files-dev/badge-image/default',
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
    fetch('//52.4.240.117:8080/badge')
    // fetch('https://ziclu0yj8h.execute-api.us-east-1.amazonaws.com/honda2/badge-proxy')
      .then(response => response.json())
      .then((badges) => {
        this.setState({
          badges,
        });
      })
      .catch((err) => {
        console.error('error', err);
        this.setState({
          badges: badgesMock,
        });
      });
  }

  render() {
    const { classes } = this.props;

    if (!(this.state.badges && this.state.badges.map)) {
      return null;
    }

    return this.state.badges.map(badge => (
      <Card key={badge.id} className={classes.card}>
        <CardContent className={classes.cardContent}>
          <img src={badge.location} width="100%" />
        </CardContent>
        {
        // <CardActions className={classes.cardActions}>
        //   <Button dense>SHOW BADGE</Button>
        // </CardActions>
        }
      </Card>
    ));
  }
}

export default withStyles(styles)(BadgesList);
