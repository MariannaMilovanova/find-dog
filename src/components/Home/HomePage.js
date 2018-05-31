import React, { Component } from "react";
import MapComponent from "../Map/Map";
import Login from "../Login/Login";
import UserData from "../Login/UserData";
import Header from "./Header";
import PetForm from "../PetForm/PetForm";
import PetInfo from '../PetInfo/PetInfo';
import { userLogin, userLogout, addTempMarker, getSavedMarkers, selectMarker } from "../../actions";
import {get, isEmpty} from 'lodash';
import { connect } from "react-redux";
import { b, createBlock } from "../../helpers/bem";
import Placeholder from '../Placeholder/Placeholder';
import "./HomePage.css";

const block = createBlock("Home");

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      startReport: false
    }
  }
  componentDidMount() {
    let userId = localStorage.getItem("active");
    if (localStorage.getItem("active")) {
      let user = JSON.parse(localStorage.getItem(userId));
      this.props.userLogin(user);
    }
    const savedMarkers = JSON.parse(localStorage.getItem('markers')) || {};
    this.props.getSavedMarkers(savedMarkers);
  }
  renderRightBlock = (selected, editMode, temp)  => {
    const {startReport} = this.state;
    if (!isEmpty(temp) || startReport) {
      return <PetForm finishEditMode={() => this.setState({editMode: false, startReport: false})} />
    }
    if(editMode && !isEmpty(selected)) {
      return <PetForm selected={selected} finishEditMode={() => this.setState({editMode: false, startReport: false})}/>
    }
    if (!editMode && !isEmpty(selected)) {
      return <PetInfo selected={selected} goToEditMode={() => this.setState({editMode: true})}/>
    }
    return <Placeholder startReport={() => this.setState({startReport: true})} />
  };

  render() {
    const { addTempMarker, markers, selectMarker, temp } = this.props;
    const {editMode} = this.state;
    const selected = get(this, 'props.markers.selected', {});

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
            <MapComponent addTempMarker={addTempMarker} markers={markers} selectMarker={selectMarker}/>
          </div>
          {this.renderRightBlock(selected, editMode, temp)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    user: state.user,
    markers: state.markers,
    temp: state.markers.temp
  });
};

const mapDispatchToProps = {
  userLogin,
  userLogout,
  addTempMarker,
  getSavedMarkers,
  selectMarker
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
