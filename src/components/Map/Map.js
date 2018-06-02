/*global google*/
import React, { Component } from "react";
import { compose, withProps } from "recompose";
import { GoogleMap, withGoogleMap, Circle } from "react-google-maps";
import CustomMarker from "./Marker";
import "./Map.css";
import { get, map, uniqueId, noop, isEmpty, omit, isString } from "lodash";
import PropTypes from "prop-types";

class MapComponent extends Component {
  static defaultProps = {
    markers: {},
    selectMarker: noop,
    addTempMarker: noop,
    radius: false
  };

  static propTypes = {
    markers: PropTypes.object,
    selectMarker: PropTypes.func,
    addTempMarker: PropTypes.func,
    radius: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      temp: {},
      defaultCenter: { lat: 50.45, lng: 30.52 }
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
    const {addTempMarker} = this.props;
    const marker = { position: { lat: e.latLng.lat(), lng: e.latLng.lng() }, type: "temp" };
    this.setState({
      temp: marker
    });
    addTempMarker(marker);
  };

  render() {
    const { temp, defaultCenter } = this.state;
    const {selectMarker, markers, radius} = this.props;
    const filtered = get(this, 'props.markers.filtered', []);
    const markersToShow = isEmpty(filtered) ? omit(markers, ['temp', 'selected', 'filtered', 'filters']): filtered;

    return (
      <div>
        <GoogleMap
          ref={el => this.map = el}
          defaultZoom={12}
          onClick={this.onMapClick}
          defaultCenter={defaultCenter}
        >
          {radius && <Circle center={defaultCenter} radius={radius} options={{fillColor: '#20e52d', strokeColor: '#20e52d', strokeWeight: '1', strokeOpacity:'0.5'}} />}
          {!isEmpty(temp) && <CustomMarker marker={temp}/>}
          {!isString(markersToShow) && map(markersToShow, marker =>  <CustomMarker marker={marker} key={get(marker, '_id', uniqueId())} selectMarker={selectMarker} />)}
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