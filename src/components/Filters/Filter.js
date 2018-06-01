import React, { Component } from "react";
import { b, createBlock } from "../../helpers/bem";
import "./Filter.css";
import { noop, toLower } from "lodash";
import { Button } from 'semantic-ui-react';
import { DropdownList } from "react-widgets";
import { type, pets, breed } from "../messages";
import "react-widgets/dist/css/react-widgets.css";
import PropTypes from "prop-types";

const block = createBlock("Filter");

export default class Filter extends Component {
  static defaultProps = {
    filterMarkers: noop,
    clearAllFilters: noop
  };

  static propTypes = {
    filterMarkers: PropTypes.func,
    clearAllFilters: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      breedsToShow: [],
      breed: ''
    };

  }
  onTypeChange = type => this.props.filterMarkers('foundOrLost', type);

  onBreedChange = breed => {
    this.setState({breed: breed});
    this.props.filterMarkers('breed', breed);
  };
  onSpeciesChange = pet => {
    this.setState({breedsToShow: breed[toLower(pet)], breed: ''});
    this.props.filterMarkers('species', pet, true);
  };

  render() {
    const { breedsToShow, breed } = this.state;

    return <div className={b(block)}>
      <div className={b(block, "label")}>Filter by:</div>
      <div className={b(block, "filters")}>
        <div className={b(block, "filter", "type")}>
          <DropdownList data={type} placeholder={"by found/lost"} onChange={this.onTypeChange}/>
        </div>
        <div className={b(block, "filter", "species")}>
          <DropdownList data={pets} placeholder={"by species"} onChange={this.onSpeciesChange}/>
        </div>
        <div className={b(block, "filter", "breed")}>
          <DropdownList data={breedsToShow} placeholder={"by breed"} value={breed} onChange={this.onBreedChange}/>
        </div>
        <Button size={'small'} onClick={this.props.clearAllFilters}>CLEAR</Button>
      </div>
    </div>;
  }
}