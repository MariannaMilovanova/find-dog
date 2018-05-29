import React from 'react';
import PropTypes from 'prop-types';
import { Image, Icon } from 'semantic-ui-react';
import "./login.scss";

const UserData = (props) => (
     <div className="user-wrapper">
        {props.user
            ? <div>
                <Image src={props.user.imageUrl} avatar size='tiny' alt={props.user.name} title={props.user.name} />
              </div>
            : <Icon name='spy' size='huge' color='blue' />}
    </div>
);

UserData.propTypes = {
    user: PropTypes.object
};

export default UserData;