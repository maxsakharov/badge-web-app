import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, TrafficLayer } from 'react-google-maps';
import './parking-map.css';

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

const GoogleMapHoc = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
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
    <ParkingInfoLayer markers={props.markers} onParkingSelect={props.onParkingSelect} />
  </GoogleMap>
));

class ParkingInfoLayer extends Component {
  static propTypes = {
    markers: PropTypes.arrayOf(PropTypes.object),
    onParkingSelect: PropTypes.func,
  }

  static defaultProps = {
    markers: [],
    onParkingSelect: null,
  }

  onMarkerClick(marker) {
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
    const { markers } = this.props;

    return markers.map(marker => (
      <Marker
        key={`marker.${marker.properties.ID}`}
        position={{ lat: marker.properties.Lat, lng: marker.properties.Lon }}
        onClick={() => this.onMarkerClick(marker)}
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
  state = {
    markers: [],
    coordinates: {
      latitude: 34.0522,
      longitude: -118.2437,
    },
    selectedMarker: null,
    reservedMarker: null,
  }

  onSearchFieldChange = (e) => {
    e.preventDefault();

    const value = e.target.elements['map-input-field'].value;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${value}`)
      .then(response => response.json()
        .then((json) => {
          if (json && json.results && json.results.length && json.results[0].geometry && json.results[0].geometry.location) {
            const location = json.results[0].geometry.location;
            this.setState({
              coordinates: {
                latitude: location.lat,
                longitude: location.lng,
              },
            });
            this.fetchParkingData();
          }
        }));
  }

  getDailyRate = (marker) => {
    if (marker.properties.HourlyCost === 'See rates under Special Features') {
      return marker.properties.SpecialFeatures;
    }
    return marker.properties.HourlyCost;
  }

  getMapsUrl = (marker) => {
    if (marker && marker.properties) {
      return `https://www.google.com/maps/dir/?api=1&destination=${marker.properties.Lat},${marker.properties.Lon}`;
    }
    return null;
  }

  fetchParkingData = () => {
    fetch('http://geohub.lacity.org/datasets/be7c8c4ab95b4d82af18255ad1a3212c_2.geojson')
      .then(response => response.json()
        .then((json) => {
          console.log(json);
          const { coordinates } = this.state;
          if (json && json.features && json.features.length) {
            const { features } = json;
            const closeParkings = features.filter((feature) => {
              const coord = feature.geometry.coordinates;
              return getDistanceFromLatLonInMi(coord[1], coord[0], coordinates.latitude, coordinates.longitude) <= 2;
            });
            this.setState({
              markers: closeParkings,
            });
            console.log(closeParkings);
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
        <GoogleMapHoc coordinates={coordinates} markers={markers} onParkingSelect={this.selectParking} />
      </div>
      ),
      (
        <div key="map-info-container" className="map-info-container">
          {reservedMarker &&
            <div className="confirmation">
              <p>The parking is reserved! Have a nice day! :)</p>
              <Button raised color="primary" target="_blank" href={this.getMapsUrl(reservedMarker)}>Navigate</Button>
            </div>
          }
          {!selectedMarker && !reservedMarker &&
            <form key="map-form" onSubmit={this.onSearchFieldChange}>
              <TextField id="map-input-field" className="map-input-field" key="map-input-field" placeholder="Search by city, venue, zip code" />
            </form>
          }
          {selectedMarker && !reservedMarker &&
            <div>
              <p className="parking-rate">Rate: {this.getDailyRate(selectedMarker)}</p>
              <p className="parking-address">{selectedMarker.properties.Address}, {selectedMarker.properties.City}, {selectedMarker.properties.State}, {selectedMarker.properties.Zipcode}</p>
              <p><Button raised color="primary" onClick={() => this.reserveParking(selectedMarker)}>Reserve Parking</Button></p>
              <p><Button raised onClick={() => this.startOver()}>Start Over</Button></p>
            </div>
          }
        </div>
      ),
    ];
  }
}

