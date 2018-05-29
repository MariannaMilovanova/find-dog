/*global google*/
import React, {Component} from 'react';
import {compose, withProps} from 'recompose';
import {withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';
import GreenMarker from './marker';
import './map.css'
import {map, get} from 'lodash';


class MapComponent extends Component {
    constructor(props) {
        super(props);
        const markers = get(this, 'props.markers', []);
        let venues = markers.map(venue => {
            let location = {};
            location.lat = venue.location.lat;
            location.lng = venue.location.lng;
            return ({position: location, title: venue.name})
        });
        //let center = {lat: 50.431782, lng: 30.516382}; //Kiev
        let center = {lat: 35.6895, lng: 139.6917}; //Tokyo

        const nextCenter = get(venues, '0.position', center);
        this.state = {
            center: center,
            bounds: null,
            venues: venues
        }
    }
    componentWillReceiveProps(nextProps) {
        let venues = nextProps.venues.map(venue => {
            let location = {};
            location.lat = venue.location.lat;
            location.lng = venue.location.lng;
            return ({position: location, title: venue.name})
        });
        const nextCenter = get(venues, '0.position', this.state.center);
        this.setState({venues: venues, center: nextCenter})
    }
    
    render() {
        return (
            <div>
                <GoogleMap
                    ref={el => this.map = el}
                    defaultZoom={14}
                    defaultCenter={{ lat: 41.850033, lng: -87.6500523 }}
                >
                    {this.state.venues.map((marker, index) =>
                        <GreenMarker marker={marker} key={index}/>)}
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