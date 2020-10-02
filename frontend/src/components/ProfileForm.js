import React from 'react';
import PropTypes from 'prop-types';
import App from '../App'
import { getAllData } from '../HelperFunctions'

class ProfileForm extends React.Component {
    state = { userprofile: { user: {} }, hives: [], inspections: [], equipment: [] }

    async componentDidMount() {

        var alldata = await getAllData(localStorage.getItem('username'))
        console.log('alldata: ' + JSON.stringify(alldata))
        this.setState(alldata)
        console.log('final form: ' + JSON.stringify(this.state))
        console.log('userprofile' + JSON.stringify(this.state.userprofile) + '\nhive: ' + JSON.stringify(this.state.hives) + '\ninspections: ' + JSON.stringify(this.state.inspections) + '\nequipment: ' + JSON.stringify(this.state.equipment))

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
             <h1>Your Profile</h1>
            <h2>Contact Information</h2>
            <p>User Name: {this.state.userprofile.user.username}</p>
            <br>
            <p>Apiary Address: {this.state.userprofile.apiary_addr}</p>
            <br>
            <p>Contact info: {this.state.userprofile.contact_info}</p>
            <br>
            <br>
            <form>
            				<button class="rounded" type="submit" formaction='javascript:editContactInfo();'>Edit Contact Information</button>
            			</form>
            <br>
            <h2>Profile Picture</h2>
            <div>{this.state.userprofile.picture}</div>
        );
    }
}

export default ProfileForm;

ProfileForm.propTypes = {
    handle_profile: PropTypes.func.isRequired
};
