import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MapComponent from '../map/map';
import Login from '../login/login';
import UserData from '../login/userData';
import VenuesList from '../venuesList/venuesList';
import Header from './header';
import QueriesList from '../queriesList/queriesList';
import {searchVenues, deleteQuery, userLogin, userLogout} from './homeActions';
import {connect} from 'react-redux';
import './home.css';

class HomePage extends Component {
    componentDidMount() {
        let userId = localStorage.getItem('active');
        if (localStorage.getItem('active')) {
            let user = JSON.parse(localStorage.getItem(userId))
            this.props.userLogin(user);
        }
    }
    render() {
        return (
            <div className="home-page-wrapper">
                <Header/>
                <div className="user">
                    <UserData user={this.props.user}/>
                    <Login userLogin={this.props.userLogin}
                           user={this.props.user} userLogout={this.props.userLogout}/>
                </div>
                <QueriesList searchHistory={this.props.searchHistory} deleteQuery={this.props.deleteQuery}/>
                <div className="map-wrapper">
                    <MapComponent searchVenues={this.props.searchVenues} venues={this.props.venues}/>
                    <VenuesList venues={this.props.venues}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        venues: state.homeReducer.venues,
        searchHistory: state.homeReducer.searchHistory,
        user: state.homeReducer.user
    });
};

const mapDispatchToProps = {
    searchVenues,
    deleteQuery,
    userLogin,
    userLogout
};

HomePage.propTypes = {
    userLogin: PropTypes.func.isRequired,
    userLogout: PropTypes.func.isRequired,
    deleteQuery: PropTypes.func.isRequired,
    user: PropTypes.object,
    searchHistory: PropTypes.array.isRequired,
    searchVenues: PropTypes.func.isRequired,
    venues: PropTypes.array.isRequired
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);
