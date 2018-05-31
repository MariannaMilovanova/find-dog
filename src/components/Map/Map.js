/*global google*/
import React, { Component } from "react";
import { compose, withProps } from "recompose";
import { GoogleMap, withGoogleMap } from "react-google-maps";
import CustomMarker from "./Marker";
import "./Map.css";
import { get, map, uniqueId, noop, isEmpty, omit } from "lodash";
import PropTypes from "prop-types";


class MapComponent extends Component {
  static defaultProps = {
    markers: {}
  };

  static propTypes = {
    markers: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      temp: {}
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.markers.temp !== prevState.temp) {
      return {
        temp: nextProps.markers.temp
      };
    }
    return null;
  }

  onMapClick = e => {
    const addTempMarker = get(this, "props.addTempMarker", noop);
    const marker = { position: { lat: e.latLng.lat(), lng: e.latLng.lng() }, title: "temp", type: "temp" };
    this.setState({
      temp: marker
    });
    addTempMarker(marker);
  };

  render() {
    const { temp } = this.state;
    const markers = omit(get(this, 'props.markers', {}), 'temp');

    return (
      <div>
        <GoogleMap
          ref={el => this.map = el}
          defaultZoom={12}
          onClick={this.onMapClick}
          defaultCenter={{ lat: 50.45, lng: 30.52 }}
        >
          {!isEmpty(temp) && <CustomMarker marker={temp}/>}
          {map(markers, marker =>  <CustomMarker marker={marker} key={get(marker, '_id', uniqueId())}/>)}
        </GoogleMap>
      </div>
    );
  }
}

export default compose(withProps({
  googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
  loadingElement: <div style={{ height: `100%` }}/>,
  containerElement: <div style={{ height: `700px` }}/>,
  mapElement: <div style={{ height: `100%` }}/>
}), withGoogleMap)(MapComponent);