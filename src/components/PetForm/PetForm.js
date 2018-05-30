import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { addPet } from "../../actions";
import { connect } from "react-redux";
import { type, pets, breed, age, color } from "../messages";
import { DropdownList } from "react-widgets";
import "react-widgets/dist/css/react-widgets.css";
import { b, createBlock } from "../../helpers/bem";
import "./PetForm.css";
import _ from "lodash";

const block = createBlock("PetForm");

const FIELDS = {
  foundOrLost: "whether pet was found or lost",
  species: `pet's species`,
  breed: `pet's breed`,
  age: `pet's age`,
  color: `pet's color`,
  phone: `Please enter your contact phone`,
  photo: ``
};

class PetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      species: false,
      file: null
    };
  }
  upload = () => {
    const {file} = this.state;
    console.log(file);
  }
  renderField = (field, data, change) => {
    const { species } = this.state;
    const { meta: { touched, error } } = field;
    const className = `${touched && error ? "has-danger" : ""}`;
    return (
      <div className={b(block, "dropdown")}>
        <label className={b(block, "label")}>{field.label}</label>
        {(() => {
          switch (field.input.name) {
            case "species":
              return (<DropdownList
                {...field.input}
                data={data}
                onChange={value => {
                  this.setState({ species: value });
                  change("breed", "");
                  field.input.onChange(value);
                }}
              />);
            case "breed": {
              const breedToShow = species ? breed[_.toLower(species)] : [];
              return (<DropdownList
                {...field.input}
                data={breedToShow}
                onChange={value => {
                  this.setState({ species: value });
                  field.input.onChange(value);
                }}
              />);
            }
            case "phone": {
              return <input {...field.input} className={b(block, "phone-input")}/>;
            }
            case "photo": {
              return <div className={b(block, "upload")}>
                <label htmlFor="f02" className={b(block, "upload-label")}>Add pet picture</label>
                <input id="f02" name="fileupload" type="file" onChange={e => this.setState({file: e.target.files[0]})} className={b(block, "photo-input")} />
                <div className={b(block, "photo-submit")} onClick={this.upload}>Upload</div>
              </div>
            }
            default:
              return (<DropdownList
                {...field.input}
                data={data}
                onChange={value => {
                  console.log(value);
                  field.input.onChange(value);
                }}
              />);
          }
        })()}
        <div className={b(block, "dropdown", className)}>
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
    const { handleSubmit, change } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Upload pet's photo"
          name='photo'
          component={field => this.renderField(field)}
        />
        <Field
          label='Pet was found or lost'
          name='foundOrLost'
          component={field => this.renderField(field, type)}
        />
        <Field
          label='Select species'
          name='species'
          component={field => this.renderField(field, pets, change)}
        />
        <Field
          label='Select breed'
          name='breed'
          component={field => this.renderField(field)}
        />
        <Field
          label="Select pet's age"
          name='age'
          component={field => this.renderField(field, age)}
        />
        <Field
          label="Select pet's skin color"
          name='color'
          component={field => this.renderField(field, color)}
        />
        <Field
          label='Your mobile phone'
          name='phone'
          component={field => this.renderField(field)}
        />
        <div className={b(block, "btns")}>
          <div className='btn btn-danger'>Cancel</div>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  _.each(_.omit(FIELDS, "photo"), (value, key) => {
    if (!values[key]) {
      if (key === "phone") return errors[key] = `${value}`;
      errors[key] = `Please select ${value}`;
    }
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