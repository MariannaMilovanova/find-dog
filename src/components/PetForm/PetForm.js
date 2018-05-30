import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { addPet } from "../../actions";
import { connect } from "react-redux";
import {pets} from '../messages';
import { DropdownList } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';
import { b, createBlock } from '../../helpers/bem';
import './PetForm.css'
import _ from 'lodash';

const block = createBlock('PetForm');

const FIELDS = {
  title: {
    type: "input",
    label: "Title for Post"
  },
  categories: {
    type: "input",
    label: "Enter some categories for this post"
  },
  content: {
    type: "textarea",
    label: "Post Contents"
  }
};

class PetForm extends Component {
  renderField = (field, data) => {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    return (
      <div className={b(block, 'dropdown')}>
        <label>{field.label}</label>
        <DropdownList
          valueField="value"
          textField="label"
          className="form-control"
          {...field.input}
          data={data}
        />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  };
  onSubmit = values => {
    console.log(values);
    this.props.addPet(values);
    /*this.props.addPet(values, () => {
      this.props.history.push('/');
    });*/
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label='Title'
          name='title'
          component={field => this.renderField(field, pets)}
        />
        <Field
          label='Categories'
          name='categories'
          component={field => this.renderField(field)}
        />
        <Field
          label='Post Content'
          name='content'
          component={field => this.renderField(field)}
        />
        <button type='submit' className='btn btn-primary'>Submit</button>
        <Link to='/' className='btn btn-danger'>Cancel</Link>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  _.each(FIELDS, (value, key) => {
    if (!values[key]) {
      errors[key] = `Enter a ${key}`;
    }
    console.log(errors);
  });
  return errors;
};

export default reduxForm({
  validate,
  form: "NewAnimal",
  fields: _.keys(FIELDS)
})(
  connect(null, { addPet })(PetForm)
);