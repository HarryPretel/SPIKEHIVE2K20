import React from 'react';
import PropTypes from 'prop-types';
import App from '../App'

class ProfileForm extends React.Component {
    state = { userprofile: { user: {} }, hives: [], inspections: [], equipment: [] }

    componentDidMount() {
        console.log('componentDidMount - chekc ')
        fetch('http://localhost:8000/api/userprofiles/').then(res => res.json()).then(json => {
            var temp = 0
            for (let i of json) {
                if (i.user.username == localStorage.getItem('username')) {
                    temp = i
                }
            }
            this.setState({ userprofile: temp })
            console.log('state 1' + JSON.stringify(this.state))
        }).then(x => {
            fetch('http://localhost:8000/api/hives/').then(res => res.json()).then(json => {
                console.log('state 1.5' + JSON.stringify(json))
                var temp = []
                for (let i of json) {
                    console.log('hives up pk' + JSON.stringify(i.user.split('/')[5]))
                    console.log('state 2' + JSON.stringify(this.state))
                    if (i.user.split('/')[5] == this.state.userprofile.pk) {
                        temp.push(i)
                    }
                }
                console.log(temp)
                this.setState({ ...this.state, hives: temp })
                console.log(this.state)
            })
        })
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
            <h4>Profile {this.state.userprofile.user.username}, pk: {this.state.userprofile.user.pk}, apiary address: {this.state.userprofile.apiary_addr}, picture: {this.state.userprofile.picture},
            contact info: {this.state.userprofile.contact_info}</h4>
        );
    }
}

export default ProfileForm;

ProfileForm.propTypes = {
    handle_profile: PropTypes.func.isRequired
};
