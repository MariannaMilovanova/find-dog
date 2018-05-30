/*global google*/
import React, {Component} from 'react';
import {compose, withProps} from 'recompose';
import {GoogleMap, withGoogleMap} from 'react-google-maps';
import GreenMarker from './Marker';
import './Map.css'
import {get, map, uniqueId, noop} from 'lodash';


class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: {}
    }
  }
  onMapClick = e => {
    const addTempMarker = get(this, 'props.addTempMarker', noop);
    const coords = {lat: e.latLng.lat(), lng: e.latLng.lng()}
    addTempMarker(coords);
    this.setState({
      temp: {position: coords, title: 'temp'}
    })
  };
  render() {
    const {temp} = this.state;
    console.log(temp)
    return (
      <div>
          <GoogleMap
            ref={el => this.map = el}
            defaultZoom={12}
            onClick={this.onMapClick}
            defaultCenter={{lat: 50.45, lng: 30.52}}
          >
            <GreenMarker marker={temp} />
          </GoogleMap>
      </div>
    )
  }
}

export default compose(withProps({
  googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
  loadingElement: <div style={{height: `100%`}}/>,
  containerElement: <div style={{height: `500px`}}/>,
  mapElement: <div style={{height: `100%`}}/>,
}), withGoogleMap)(MapComponent)