import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, TrafficLayer } from 'react-google-maps';
import './parking-map.css';

// Parkings for demo purpose
const PRE_DEFINED_PARKINGS = [
  {
    type: 'Feature',
    properties: {
      ID: 10000,
      FacilityID: '',
      LotName: '',
      Community: '',
      CD: '',
      Address: '1201 S Figueroa St',
      City: 'Los Angeles',
      State: 'CA',
      Zipcode: '90015',
      Lat: 34.043249,
      Lon: -118.269796,
      ConvenientTo: '',
      Entrance: '',
      Operator: '',
      Type: 'Operated',
      Phone: '',
      Hours: '',
      HourlyCost: 'See rates under Special Features',
      DailyCost: '',
      MonthlyCost: '',
      SpecialFeatures: '$25 Daily',
      Spaces: '',
      Status: 'Operational',
      TOOLTIP: '',
      NLA_URL: '',
    },
    geometry: {
      type: 'Point',
      coordinates: [
        -118.269796,
        34.043249,
      ],
    },
  },
];

const GOOGLE_MAP_API_LEY = 'AIzaSyDvlf6IlT554uH3eqUZEpu1lAVxDV4C-Us';

function formatPrice(price) {
  return price && price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

function getDistanceFromLatLonInMi(lat1, lon1, lat2, lon2) {
  const R = 3959; // Radius of the earth in km
  const dLat = deg2rad(lat2-lat1);  // deg2rad below
  const dLon = deg2rad(lon2-lon1);
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // Distance in km
  return d;
}

const iconBase = '//maps.google.com/mapfiles/kml/paddle/';
const icons = {
  default: `${iconBase}red-circle.png`,
  selected: `${iconBase}purple-diamond.png`,
};

const GoogleMapHoc = compose(
  withProps({
    googleMapURL: `//maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_LEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={15}
    center={{ lat: props.coordinates.latitude, lng: props.coordinates.longitude }}
  >
    <TrafficLayer autoUpdate />
    <ParkingInfoLayer markers={props.markers} selectedMarker={props.selectedMarker} onParkingSelect={props.onParkingSelect} />
  </GoogleMap>
));

class ParkingInfoLayer extends Component {
  static propTypes = {
    markers: PropTypes.arrayOf(PropTypes.object),
    selectedMarker: PropTypes.object,
    onParkingSelect: PropTypes.func,
  }

  static defaultProps = {
    markers: [],
    selectedMarker: null,
    onParkingSelect: null,
  }

  state = {
    selectedMarker: null,
  }

  componentWillMount() {
    this.setState({
      selectedMarker: this.props.selectedMarker,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedMarker: nextProps.selectedMarker,
    });
  }

  onMarkerClick(marker) {
    const { selectedMarker } = this.state;
    // To avoid re-rendering when same marker is selected
    if (selectedMarker && selectedMarker === marker) {
      return;
    }

    this.setState({
      selectedMarker: marker,
    });

    const { onParkingSelect } = this.props;
    if (onParkingSelect) {
      onParkingSelect(marker);
    }
  }

  /**
  closeTooltip() {
    this.setState({
      selectedMarker: null,
    });
  }
  */

  render() {
    const { selectedMarker } = this.state;
    const { markers } = this.props;

    return markers.map(marker => (
      <Marker
        key={`marker.${marker.properties.ID}`}
        position={{ lat: marker.properties.Lat, lng: marker.properties.Lon }}
        onClick={() => this.onMarkerClick(marker)}
        icon={(selectedMarker && selectedMarker === marker) ? icons.selected : icons.default}
      >
        {/*
          selectedMarker && selectedMarker.properties.ID === marker.properties.ID &&
            <InfoWindow onCloseClick={() => this.closeTooltip()}>
              <div>
                <p>Parking Address: {selectedMarker.address}</p>
                <p>Space Available: {selectedMarker.spacesAvailable}</p>
                <p>Flat Rate: {formatPrice(selectedMarker.price)}</p>
                <img src={selectedMarker.photo} alt="Parking" />
              </div>
            </InfoWindow>
        */}
      </Marker>
    ));
  }
}

export default class ParkingMap extends Component {
  static propTypes = {
    location: PropTypes.string,
  }

  static defaultProps = {
    location: null,
  }

  state = {
    markers: [],
    coordinates: {
      latitude: 34.0522,
      longitude: -118.2437,
    },
    selectedMarker: null,
    reservedMarker: null,
  }

  componentDidMount() {
    const { location } = this.props;
    if (location) {
      document.forms['map-form'].elements['map-input-field'].value = location;
      this.fetchLocationData(location);
    }
  }

  onSearchFieldChange = (e) => {
    e.preventDefault();

    const value = e.target.elements['map-input-field'].value;
    this.fetchLocationData(value);
  }

  getDailyRate = (marker) => {
    if (marker.properties.HourlyCost === 'See rates under Special Features') {
      return marker.properties.SpecialFeatures;
    }
    return marker.properties.HourlyCost;
  }

  getMapsUrl = (marker) => {
    if (marker && marker.properties) {
      return `https://maps.apple.com/?daddr=${marker.properties.Lat},${marker.properties.Lon}`;
    }
    return null;
  }

  fetchLocationData = (location) => {
    fetch(`//maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_MAP_API_LEY}&address=${location}`)
      .then(response => response.json()
        .then((json) => {
          if (json && json.results && json.results.length && json.results[0].geometry && json.results[0].geometry.location) {
            const result = json.results[0].geometry.location;
            this.setState({
              coordinates: {
                latitude: result.lat,
                longitude: result.lng,
              },
            });
            this.fetchParkingData();
          }
        }));
  }

  fetchParkingData = () => {
    fetch('http://geohub.lacity.org/datasets/be7c8c4ab95b4d82af18255ad1a3212c_2.geojson')
      .then(response => response.json()
        .then((json) => {
          const { coordinates } = this.state;
          if (json && json.features && json.features.length) {
            const { features } = json;
            // return parkings in 2 miles radius
            const maxDistance = 2;
            let closestParking = { marker: null, distance: 10000 };
            // Add pre-defined parkings for demo purpose
            let allParkings = features;
            if (PRE_DEFINED_PARKINGS && PRE_DEFINED_PARKINGS.length) {
              allParkings = allParkings.concat(PRE_DEFINED_PARKINGS);
            }
            const closeParkings = allParkings.filter((feature) => {
              const coord = feature.geometry.coordinates;
              const distance = getDistanceFromLatLonInMi(coord[1], coord[0], coordinates.latitude, coordinates.longitude);
              if (closestParking.distance > distance && distance <= maxDistance) {
                closestParking = {
                  marker: feature,
                  distance,
                };
              }
              return distance <= maxDistance;
            });
            this.setState({
              markers: closeParkings,
              selectedMarker: closestParking.marker,
            });
          }
        }));
  }

  selectParking = (marker) => {
    const { selectedMarker } = this.state;
    // To avoid re-rendering when same marker is selected
    if (selectedMarker && selectedMarker === marker) {
      return;
    }

    this.setState({
      selectedMarker: marker,
    });
  }

  reserveParking = (marker) => {
    this.setState({
      reservedMarker: marker,
    });
  }

  startOver = () => {
    this.setState({
      markers: [],
      selectedMarker: null,
      reservedMarker: null,
    });
  }

  render() {
    const { markers, coordinates, selectedMarker, reservedMarker } = this.state;

    return [coordinates && (
      <div key="map-container" className="map-container">
        <GoogleMapHoc coordinates={coordinates} markers={markers} selectedMarker={selectedMarker} onParkingSelect={this.selectParking} />
      </div>
      ),
      (
        <div key="map-info-container" className="map-info-container">
          {reservedMarker &&
            <Card className="card">
              <CardContent className="content">
                <p className="confirmation">The parking is reserved! Have a nice day! :)</p>
                <Button raised color="primary" target="_blank" href={this.getMapsUrl(reservedMarker)}>Navigate</Button>
              </CardContent>
            </Card>
          }
          {!selectedMarker && !reservedMarker &&
            <form id="map-form" key="map-form" onSubmit={this.onSearchFieldChange}>
              <TextField id="map-input-field" className="map-input-field" key="map-input-field" placeholder="Search by city, venue, zip code" />
            </form>
          }
          {selectedMarker && !reservedMarker &&
            <Card className="card">
              <CardContent className="content">
                <p className="parking-rate">Rate: {this.getDailyRate(selectedMarker)}</p>
                <p className="parking-address">{selectedMarker.properties.Address}, {selectedMarker.properties.City}, {selectedMarker.properties.State}, {selectedMarker.properties.Zipcode}</p>
                <p>
                  <Button raised color="primary" className="cta" onClick={() => this.reserveParking(selectedMarker)}>Reserve Parking</Button>
                  <Button raised className="cta" onClick={() => this.startOver()}>Start Over</Button>
                </p>
              </CardContent>
            </Card>
          }
        </div>
      ),
    ];
  }
}

