import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, TrafficLayer } from 'react-google-maps';
import './parking-map.css';

const PARKING_API_RESPONSE = [
  {
    id: 0,
    name: 'Parking #1',
    latitude: 34.022212,
    longitude: -118.494475,
    address: 'Address: 1100 Colorado Ave, Santa Monica, CA 90404',
    spacesAvailable: 10,
    price: 15,
    photo: 'https://media.istockphoto.com/photos/material-world-massive-parking-lot-picture-id172165773',
  },
  {
    id: 1,
    name: 'Parking #2',
    latitude: 34.026212,
    longitude: -118.497000,
    address: 'Address: 2700 Colorado Ave, Santa Monica, CA 90404',
    spacesAvailable: 100,
    price: 30,
    photo: 'https://media.istockphoto.com/photos/material-world-massive-parking-lot-picture-id172165773',
  },
];

function formatPrice(price) {
  return price && price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
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
    defaultCenter={{ lat: 34.024212, lng: -118.496475 }}
  >
    <TrafficLayer autoUpdate />
    <ParkingInfoLayer markers={props.markers} />
  </GoogleMap>
));

class ParkingInfoLayer extends Component {
  static propTypes = {
    markers: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    markers: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedMarker: null,
    };
  }

  onMarkerClick(marker) {
    const { selectedMarker } = this.state;
    if (selectedMarker && selectedMarker === marker) {
      // no need to re-render
      return;
    }

    this.setState({
      selectedMarker: marker,
    });
  }

  closeTooltip() {
    this.setState({
      selectedMarker: null,
    });
  }

  render() {
    const { markers } = this.props;
    const { selectedMarker } = this.state;
    return markers.map(marker => (
      <Marker
        key={`marker.${marker.id}`}
        label={marker.price && formatPrice(marker.price)}
        position={{ lat: marker.latitude, lng: marker.longitude }}
        onClick={() => this.onMarkerClick(marker)}
      >
        {
          selectedMarker && selectedMarker.id === marker.id &&
            <InfoWindow onCloseClick={() => this.closeTooltip()}>
              <div>
                <p>Parking Address: {selectedMarker.address}</p>
                <p>Space Available: {selectedMarker.spacesAvailable}</p>
                <p>Flat Rate: {formatPrice(selectedMarker.price)}</p>
                <img src={selectedMarker.photo} alt="Parking" />
              </div>
            </InfoWindow>
        }
      </Marker>
    ));
  }
}

export default class ParkingMap extends Component {
  state = {
    markers: [],
  }

  componentDidMount() {
    this.fetchParkingDate();
  }

  fetchParkingDate = () => {
    // TODO call real API here
    this.setState({
      markers: PARKING_API_RESPONSE,
    });
  }

  render() {
    const { markers } = this.state;

    return (
      <GoogleMapHoc markers={markers} />
    );
  }
}

