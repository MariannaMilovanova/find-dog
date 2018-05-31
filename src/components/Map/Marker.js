import React, {Component} from 'react';
import {Marker, InfoWindow} from 'react-google-maps';
import temp from '../../assets/blue_marker.png';
import lost from '../../assets/red_marker.png';
import found from '../../assets/map-icon.png';

const markerIcon = {
    temp,
    lost,
    found
};

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
        const {marker} = this.props;
        console.log(marker)
        return (
            <div className="marker">
                <Marker icon={temp} position={marker.position} onClick={this.onToggleOpen}/>
                {this.state.isOpen &&
                <InfoWindow onCloseClick={this.onToggleOpen} position={marker.position}>
                    <div>{marker.title}</div>
                </InfoWindow>}
            </div>
        );
    }
}

export default GreenMarker;