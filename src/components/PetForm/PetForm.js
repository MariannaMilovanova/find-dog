import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { addPet, uploadImage } from "../../actions";
import { connect } from "react-redux";
import { type, pets, breed, age, color } from "../messages";
import { DropdownList } from "react-widgets";
import "react-widgets/dist/css/react-widgets.css";
import { b, createBlock } from "../../helpers/bem";
import { Image, Icon } from "semantic-ui-react";
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
      fileName: null
    };
  }

  upload = e => {
    const file = e.target.files[0];
    const size = file.size / 1024 / 1024;
    if (size > 2) {
      return alert("Size of file should not me more than 2MB");
    }
    this.setState({ fileName: file.name || "" });
    this.props.uploadImage(file);
  };

  renderField = (field, data, change) => {
    const { species, fileName } = this.state;
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
                <label htmlFor="f02" className={b(block, "upload-label")}>{fileName || "Add pet picture"}</label>
                <input id="f02" name="fileupload" type="file" onChange={this.upload}
                       className={b(block, "photo-input")}/>
              </div>;
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
    const lng = _.get(this, "props.temp.position.lng", false);
    if(!lng) {
      return alert("Please click on map to put the marker where you find or lost pet");
    }
    this.props.addPet(values);
  };

  render() {
    const { handleSubmit, change } = this.props;
    const url = _.get(this, "props.temp.url", false);

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className={b(block, "animal-picture")}>
          <Field
            label="Upload pet's photo"
            name='photo'
            component={field => this.renderField(field)}
          />
          <div className={b(block, "picture")}>{url
            ? <div>
              <Image src={url} avatar size='small' alt={"picture"}/>
            </div>
            : <Icon name='paw' size='huge' color='brown'/>}
            </div>
        </div>
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

const mapStateToProps = state => ({
  temp: state.markers.temp
});

export default reduxForm({
  validate,
  form: "NewAnimal",
  fields: _.keys(FIELDS)
})(
  connect(mapStateToProps, { addPet, uploadImage })(PetForm)
);