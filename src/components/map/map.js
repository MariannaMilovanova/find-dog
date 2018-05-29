/*global google*/
import React, {Component} from 'react';
import {compose, withProps} from 'recompose';
import {withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';
import GreenMarker from './marker';
import FoursquareSearch from './foursquareSearch/foursquareSearch';
import './map.css'
import _ from 'lodash';


class MapComponent extends Component {
    constructor(props) {
        super(props);
        let venues = this.props.venues.map(venue => {
            let location = {};
            location.lat = venue.location.lat;
            location.lng = venue.location.lng;
            return ({position: location, title: venue.name})
        });
        //let center = {lat: 50.431782, lng: 30.516382}; //Kiev
        let center = {lat: 35.6895, lng: 139.6917}; //Tokyo

        const nextCenter = _.get(venues, '0.position', center);
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
        const nextCenter = _.get(venues, '0.position', this.state.center);
        this.setState({venues: venues, center: nextCenter})
    }

    onBoundsChanged = () => {
        let bounds = this.refs.map.getBounds();
        let center = this.refs.map.getCenter();
        let newCenter = {};
        newCenter.lat = center.lat();
        newCenter.lng = center.lng();
        let ne = bounds.getNorthEast();
        // Calculate radius (in meters)
        let radius = Math.round(google.maps.geometry.spherical.computeDistanceBetween(center, ne));

        this.setState({
            bounds: bounds,
            center: newCenter,
            radius: radius
        })
    };

    render() {
        return (
            <div>
                <FoursquareSearch searchVenues={this.props.searchVenues}
                                  center={this.state.center}
                                  radius={this.state.radius}/>
                <GoogleMap
                    ref='map'
                    defaultZoom={14}
                    center={this.state.center}
                    onBoundsChanged={this.onBoundsChanged}
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