import React, { Component } from "react";
import { Marker, InfoWindow } from "react-google-maps";
import {get} from 'lodash';
import temp from "../../assets/blue_marker.png";
import lost from "../../assets/red_marker.png";
import found from "../../assets/map-icon.png";
import PropTypes from "prop-types";

const markerIcon = {
  temp,
  lost,
  found
};

class CustomMarker extends Component {
  static defaultProps = {
    marker: {}
  };

  static propTypes = {
    marker: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  onToggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { marker } = this.props;
    const type = get(this, 'props.marker.type', 'temp');

    return (
      <div className="marker">
        <Marker icon={markerIcon[type]} position={marker.position} onClick={this.onToggleOpen}/>
        {this.state.isOpen &&
        <InfoWindow onCloseClick={this.onToggleOpen} position={marker.position}>
          <div>{marker.title}</div>
        </InfoWindow>}
      </div>
    );
  }
}

export default CustomMarker;