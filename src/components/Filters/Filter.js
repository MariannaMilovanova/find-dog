import React, { Component } from 'react';
import { b, createBlock } from '../../helpers/bem';
import './Filter.css';
import { noop, toLower } from 'lodash';
import { Button } from 'semantic-ui-react';
import { DropdownList } from 'react-widgets';
import { type, pets, breed, radiusOpt } from '../messages';
import { isEmpty } from 'lodash';
import 'react-widgets/dist/css/react-widgets.css';
import PropTypes from 'prop-types';

const block = createBlock('Filter');

export default class Filter extends Component {
  static defaultProps = {
    filterMarkers: noop,
    clearAllFilters: noop,
    filters: {}
  };

  static propTypes = {
    filterMarkers: PropTypes.func,
    clearAllFilters: PropTypes.func,
    filters: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      breedsToShow: [],
      breed: '',
      pet: '',
      typeSingle: '',
      radius: ''
    };
  }
  static getDerivedStateFromProps(nextProps) {
    if (isEmpty(nextProps.filters)) {
      return {
        breed: '',
        pet: '',
        typeSingle: '',
        radius: ''
      };
    }
    return null;
  }
  onTypeChange = typeSingle => {
    this.setState({ typeSingle });
    this.props.filterMarkers('foundOrLost', typeSingle);
  };

  onBreedChange = breed => {
    this.setState({ breed: breed });
    this.props.filterMarkers('breed', breed);
  };
  onSpeciesChange = pet => {
    this.setState({ breedsToShow: breed[toLower(pet)], breed: '', pet });
    this.props.filterMarkers('species', pet, true);
  };
  clearAll = () => {
    this.props.clearAllFilters();
  };
  onRadiusChange = radius => {
    this.setState({ radius });
    this.props.filterMarkers('radius', radius.value);
  };
  render() {
    const { breedsToShow, breed, pet, typeSingle, radius } = this.state;

    return (
      <div className={b(block)}>
        <div className={b(block, 'label')}>Filter by:</div>
        <div className={b(block, 'filters')}>
          <div className={b(block, 'filter', 'type')}>
            <DropdownList
              data={type}
              placeholder={'by found/lost'}
              value={typeSingle}
              onChange={this.onTypeChange}
            />
          </div>
          <div className={b(block, 'filter', 'species')}>
            <DropdownList
              data={pets}
              placeholder={'by species'}
              value={pet}
              onChange={this.onSpeciesChange}
            />
          </div>
          <div className={b(block, 'filter', 'breed')}>
            <DropdownList
              data={breedsToShow}
              placeholder={'by breed'}
              value={breed}
              onChange={this.onBreedChange}
            />
          </div>
          <div className={b(block, 'filter', 'radius')}>
            <DropdownList
              valueField="value"
              textField="label"
              data={radiusOpt}
              value={radius}
              placeholder={'by radius'}
              onChange={this.onRadiusChange}
            />
          </div>
          <Button size={'small'} onClick={this.clearAll}>
            CLEAR
          </Button>
        </div>
      </div>
    );
  }
}
