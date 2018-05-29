import React, {Component} from 'react';
import MapComponent from '../map/map';
import Login from '../login/login';
import UserData from '../login/userData';
import Header from './header';
import {userLogin, userLogout, addTempMarker} from '../../actions';
import {connect} from 'react-redux';
import { b, createBlock } from '../../helpers/bem';
import './home.css';

const block = createBlock('Home');

class HomePage extends Component {
    componentDidMount() {
        let userId = localStorage.getItem('active');
        if (localStorage.getItem('active')) {
            let user = JSON.parse(localStorage.getItem(userId))
            this.props.userLogin(user);
        }
    }
    render() {
        const {addTempMarker, markers} = this.props
        return (
            <div className={b(block)}>
                <div className={b(block, 'header')} >
                  <Header/>
                  <div className={b(block, 'user')}>
                    <UserData user={this.props.user}/>
                    <Login userLogin={this.props.userLogin}
                           user={this.props.user} userLogout={this.props.userLogout}/>
                </div>
                </div>
                <div className={b(block, 'map')}>
                    <MapComponent addTempMarker={addTempMarker} markers={markers}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        user: state.user.user,
        markers: state.markers
    });
};

const mapDispatchToProps = {
    userLogin,
    userLogout,
    addTempMarker
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);
