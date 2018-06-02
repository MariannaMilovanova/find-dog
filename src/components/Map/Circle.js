import React, { Component } from 'react';
import { Circle } from 'react-google-maps';
import { get, noop } from 'lodash';

class CustomCircle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radius: get(this, 'props.radius'),
      center: get(this, 'props.center', {})
    };
  }
  componentDidMount() {
    this.getBoundsToFilter();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.radius !== this.state.radius) {
      this.getBoundsToFilter();
      return this.setState({
        radius: nextProps.radius,
        center: nextProps.center
      });
    }
  }

  getBoundsToFilter = () => {
    const filterMarkers = get(this, 'props.filterMarkers', noop);
    const bounds = this.circle.getBounds();
    const neLng = bounds.getNorthEast().lng();
    const neLat = bounds.getNorthEast().lat();
    const swLng = bounds.getSouthWest().lng();
    const swLat = bounds.getSouthWest().lat();
    return filterMarkers('radiusData', { neLng, neLat, swLng, swLat });
  };

  render() {
    const { radius, center } = this.state;

    return (
      <Circle
        onCenterChanged={() => this.setState({ center })}
        ref={el => (this.circle = el)}
        center={center}
        radius={radius}
        options={{
          fillColor: '#20e52d',
          strokeColor: '#20e52d',
          strokeWeight: '1',
          strokeOpacity: '0.5'
        }}
      />
    );
  }
}

export default CustomCircle;
