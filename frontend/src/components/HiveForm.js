import React from 'react';
import PropTypes from 'prop-types';

class HiveForm extends React.Component {
    state = {
        username: '',
        password: ''
    };

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
            <h4>{localStorage.getItem('username')}'s Hive address: {localStorage.getItem('h_apiary_addr')}</h4>
        );
    }
}

export default HiveForm;

HiveForm.propTypes = {
    handle_profile: PropTypes.func.isRequired
};