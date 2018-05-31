import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import { b, createBlock } from "../../helpers/bem";
import "./Filter.css";
import { get, noop } from "lodash";
import { DropdownList } from "react-widgets";
import { type, pets, age } from "../messages";
import "react-widgets/dist/css/react-widgets.css";

const block = createBlock("Filter");

export default class Filter extends Component {
  render() {
    const filterPets = get(this, "props.filterPets", noop);

    return <div className={b(block)}>
      <div className={b(block, 'label')}>Filter by: </div>
      <div className={b(block, 'filters')}>
        <div className={b(block, "filter", "type")}>
          <DropdownList data={type} placeholder={'by found/lost'}/>
        </div>
        <div className={b(block, "filter", "pets")}>
          <DropdownList data={pets} placeholder={'by species'}/>
        </div>
        <div className={b(block, "filter", "age")}>
          <DropdownList data={age} placeholder={'by age'}/>
        </div>
      </div>
    </div>;
  }
}