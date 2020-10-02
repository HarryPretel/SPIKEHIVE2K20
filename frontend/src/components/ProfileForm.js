import React from 'react';
import PropTypes from 'prop-types';
import App from '../App'

class ProfileForm extends React.Component {
    state = { userprofile: { user: {} }, hives: [], inspections: [], equipment: [] }

    async componentDidMount() {
        var json = []
        json = await (await fetch('http://localhost:8000/api/userprofiles/')).json()
        console.log(1)
        var temp = 0
        for (let i of json) {
            if (i.user.username == localStorage.getItem('username')) {
                temp = i
            }
        }
        this.setState({ userprofile: temp })
        json = await (await fetch('http://localhost:8000/api/hives/')).json()
        console.log(2)
        var temp = []
        for (let i of json) {
            if (i.user.split('/')[5] == this.state.userprofile.pk) {
                temp.push(i)
            }
        }
        this.setState({ hives: temp })
        json = await (await fetch('http://localhost:8000/api/inspections/')).json()
        console.log(3)
        var temp = []
        var set = []
        for (let i of this.state.hives) {
            set[i.pk] = 1
        }
        for (let i of json) {
            if (set[i.hive.split('/')[5]] !== undefined) {
                temp.push(i)
            }
        }
        this.setState({ inspections: temp })
        json = await (await fetch('http://localhost:8000/api/equipment/')).json()
        console.log(4)
        var temp = []
        var set = []
        for (let i of this.state.inspections) {
            set[i.pk] = 1
        }
        for (let i of json) {
            if (set[i.inspection.split('/')[5]] !== undefined) {
                temp.push(i)
            }
        }
        this.setState({ equipment: temp })
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
            <h4>Profile {this.state.userprofile.user.username}, pk: {this.state.userprofile.user.pk}, apiary address: {this.state.userprofile.apiary_addr}, picture: {this.state.userprofile.picture},
            contact info: {this.state.userprofile.contact_info}</h4>
        );
    }
}

export default ProfileForm;

ProfileForm.propTypes = {
    handle_profile: PropTypes.func.isRequired
};
