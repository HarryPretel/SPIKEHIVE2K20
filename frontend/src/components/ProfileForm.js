import React from 'react';
import PropTypes from 'prop-types';
import App from '../App'

class ProfileForm extends React.Component {
    state = {
        username: '',
        password: ''
    };

    componentDidMount() {
        console.log('componentDidMount - chekc ')
        fetch('http://localhost:8000/api/userprofiles/')
            .then(res => res.json())
            .then(json => {
                console.log('hi')
                console.log(json)
                this.setState(json)
                console.log('state:' + JSON.stringify(this.state))
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
            <h4>Profile {localStorage.getItem('username')} {localStorage.getItem('userpk')}</h4>
        );
    }
}

export default ProfileForm;

ProfileForm.propTypes = {
    handle_profile: PropTypes.func.isRequired
};
