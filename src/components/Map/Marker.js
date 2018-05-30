import React, {Component} from 'react';
import {Marker, InfoWindow} from 'react-google-maps';

class GreenMarker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }
    onToggleOpen = () => {
        this.setState({isOpen: !this.state.isOpen})
    };
    render() {
        let markerImg = require('../../assets/map-icon.png');
        const {marker} = this.props;
        return (
            <div className="marker">
                <Marker icon={markerImg} position={marker.position} onClick={this.onToggleOpen}/>
                {this.state.isOpen &&
                <InfoWindow onCloseClick={this.onToggleOpen} position={marker.position}>
                    <div>{marker.title}</div>
                </InfoWindow>}
            </div>
        );
    }
}

export default GreenMarker;