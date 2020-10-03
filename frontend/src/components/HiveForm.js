import React from 'react';
import PropTypes from 'prop-types';
import { getAllData } from '../HelperFunctions'

class HiveForm extends React.Component {
    state = {
        userprofile: { user: {} },
        hives: [],
        inspections: [],
        equipment: []
    };

    async componentDidMount() {
        let pk = localStorage.getItem('hive_pk')
        console.log("hiveForm: " + pk);
        var alldata = await getAllData(localStorage.getItem('username'))
        //console.log('alldata: ' + JSON.stringify(alldata))
        this.setState(alldata)
        //console.log('final form: ' + JSON.stringify(this.state))
        //console.log('userprofile' + JSON.stringify(this.state.userprofile) + '\nhive: ' + JSON.stringify(this.state.hives) + '\ninspections: ' + JSON.stringify(this.state.inspections) + '\nequipment: ' + JSON.stringify(this.state.equipment))
        //console.log('hives' + JSON.stringify(this.state.hives[0]))
        for (let i of this.state.hives) {
            if (i.pk == pk) {

            }
        }

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
            <div>
                <h4>{this.state.userprofile.user.username}'s Hive address: {this.state.hives.addr}</h4>
                <h4>fdsadfsadfsasfda</h4>
            </div>
        );
    }
}

export default HiveForm;


HiveForm.propTypes = {
    handle_hive: PropTypes.func.isRequired
};
