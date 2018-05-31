import React, { Component } from "react";
import MapComponent from "../Map/Map";
import Login from "../Login/Login";
import UserData from "../Login/UserData";
import Header from "./Header";
import PetForm from "../PetForm/PetForm";
import PetInfo from '../PetInfo/PetInfo';
import { userLogin, userLogout, addTempMarker, getSavedMarkers, selectMarker, deleteMarker} from "../../actions";
import {get, isEmpty} from 'lodash';
import { connect } from "react-redux";
import { b, createBlock } from "../../helpers/bem";
import Placeholder from '../Placeholder/Placeholder';
import Filter from '../Filters/Filter';
import "./HomePage.css";

const block = createBlock("Home");

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      startReport: false,
      temp: false,
      selected: false
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

  static getDerivedStateFromProps(nextProps) {
    return {
      temp: nextProps.temp,
      selected: nextProps.selected
    };
  }

  renderRightBlock = ()  => {
    const {startReport, temp, selected, editMode} = this.state;
    const {deleteMarker} = this.props;
    console.warn('ss', selected)
    console.warn('tt', temp);
    console.warn('editMode', editMode);
    console.warn('srart', startReport);

    if ((temp && !isEmpty(temp)) || startReport) {
      console.log('aa')
      return <PetForm finishEditMode={() => this.setState({editMode: false, startReport: false, temp: false, selected: false})} />
    }
    if(selected && !isEmpty(selected)) {
      if(editMode) {
        console.log('bbb');
        return <PetForm editMode selected={selected} finishEditMode={() => this.setState({editMode: false, startReport: false, temp: false, selected: false})}/>
      }
      console.log('ccc');
      return <PetInfo deleteMarker={deleteMarker} selected={selected} goToEditMode={() => this.setState({editMode: true, startReport: false, selected: false, temp: false})}/>
    }
    return <Placeholder startReport={() => this.setState({startReport: true})} />
  };

  render() {
    const { addTempMarker, markers, selectMarker } = this.props;

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
            <Filter />
            <MapComponent addTempMarker={addTempMarker} markers={markers} selectMarker={selectMarker}/>
          </div>
          {this.renderRightBlock()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    user: state.user,
    markers: state.markers,
    selected: state.markers.selected,
    temp: state.markers.temp
  });
};

const mapDispatchToProps = {
  userLogin,
  userLogout,
  addTempMarker,
  getSavedMarkers,
  selectMarker,
  deleteMarker
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
