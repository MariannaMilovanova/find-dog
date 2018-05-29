import React, {Component} from 'react';
import {Input} from 'semantic-ui-react';
import './foursquareSearch.css';

class FoursquareSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        };
    }

    handleChange = (event, data) => {
        this.setState({term: data.value})
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({term: ''});
        this.props.searchVenues(this.state.term, this.props.center, this.props.radius)
    };

    render() {
        return (
            <div className='fsq-input-search'>
                <form onSubmit={this.handleSubmit}>
                    <Input placeholder='Search for venues' value={this.state.term} onChange={this.handleChange} fluid/>
                </form>
            </div>
        );
    }
}

export default FoursquareSearch;
  