import React, { Component } from "react";
import MapComponent from "../Map/Map";
import Login from "../Login/Login";
import UserData from "../Login/UserData";
import Header from "./Header";
import PetForm from "../PetForm/PetForm";
import { userLogin, userLogout, addTempMarker, getSavedMarkers } from "../../actions";
import { connect } from "react-redux";
import { b, createBlock } from "../../helpers/bem";
import "./HomePage.css";

const block = createBlock("Home");

class HomePage extends Component {
  componentDidMount() {
    let userId = localStorage.getItem("active");
    if (localStorage.getItem("active")) {
      let user = JSON.parse(localStorage.getItem(userId));
      this.props.userLogin(user);
    }
    const savedMarkers = JSON.parse(localStorage.getItem('markers')) || {};
    this.props.getSavedMarkers(savedMarkers);
  }

  render() {
    const { addTempMarker, markers } = this.props;
    return (
      <div className={b(block)}>
        <div className={b(block, "header")}>
          <Header/>
          <div className={b(block, "user")}>
            <UserData user={this.props.user}/>
            <Login userLogin={this.props.userLogin}
                   user={this.props.user} userLogout={this.props.userLogout}/>
          </div>
        </div>
        <div className={b(block, "map-with-form")}>
          <div className={b(block, "map")}>
            <MapComponent addTempMarker={addTempMarker} markers={markers}/>
          </div>
          <PetForm/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    user: state.user,
    markers: state.markers
  });
};

const mapDispatchToProps = {
  userLogin,
  userLogout,
  addTempMarker,
  getSavedMarkers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
