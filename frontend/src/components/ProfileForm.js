import React from 'react';
import PropTypes from 'prop-types';
import App from '../App'

class ProfileForm extends React.Component {
    state = { user: {} }

    componentDidMount() {
        console.log('componentDidMount - chekc ')
        fetch('http://localhost:8000/api/userprofiles/')
            .then(res => res.json())
            .then(json => {
                var temp = 0
                for (let i of json) {
                    if (i.user.username == localStorage.getItem('username')) {
                        temp = i
                    }
                }
                this.setState(temp)
            });
    }
    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState[name] = value;
            return newState;
        });
    };

    render() {
        return (
            <h4>Profile {this.state.user.username}, pk: {this.state.user.pk}, apiary address: {this.state.apiary_addr}, picture: {this.state.picture},
            contact info: {this.state.contact_info}</h4>
        );
    }
}

export default ProfileForm;

ProfileForm.propTypes = {
    handle_profile: PropTypes.func.isRequired
};
