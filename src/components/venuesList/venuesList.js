import React from 'react';
import {Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {get} from 'lodash';
import _ from 'lodash';
import './venuesList.css';

const VenuesList = (props) => {
    if (!get(this, 'props.venues[0]', true)) {
        return <div></div>;
    }
    return (
        <div className="venues-list-wrapper">
            <div className="venues-list-header">{props.venues.length} venues
                <div className='clarification'>(of the last search)</div>
            </div>
            <Table verticalAlign='middle' celled striped className='table' fixed compact structured>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>City</Table.HeaderCell>
                        <Table.HeaderCell>Street Address</Table.HeaderCell>
                        <Table.HeaderCell>Latitude</Table.HeaderCell>
                        <Table.HeaderCell>Longitude</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.venues.map((venue, i) => {
                        return (
                            <Table.Row key={i}>
                                <Table.Cell>{venue.name}</Table.Cell>
                                <Table.Cell>{venue.location.city ? `${venue.location.city}, ${venue.location.country}` : `${venue.location.country}`}</Table.Cell>
                                <Table.Cell>{venue.location.address}</Table.Cell>
                                <Table.Cell>{_.round(venue.location.lat, 4)}</Table.Cell>
                                <Table.Cell>{_.round(venue.location.lng, 4)}</Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </div>
    );
};

VenuesList.propTypes = {
    venues: PropTypes.array.isRequired
};
export default VenuesList;