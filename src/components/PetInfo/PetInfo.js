import React, { Component } from "react";
import { b, createBlock } from "../../helpers/bem";
import PropTypes from "prop-types";
import { Image, Icon } from "semantic-ui-react";
import "./PetInfo.css";
import { get, noop } from "lodash";

const block = createBlock("PetInfo");

export default class PetInfo extends Component {
  static defaultProps = {
    info: {}
  };

  static propTypes = {
    info: PropTypes.object
  };

  render() {
    return <div className={b(block)}>

    </div>
  }
}