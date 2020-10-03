import React from 'react';
import PropTypes from 'prop-types';
import App from '../App'
import { getAllData } from '../HelperFunctions'
import { Table } from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import { propTypes } from 'react-bootstrap/esm/Image';
import HiveForm from './HiveForm';
import Nav from './Nav';


class ProfileForm extends React.Component {
    state = { userprofile: { user: {} }, 
        hives: [], 
        inspections: [], 
        equipment: [],
        displayed_form: ''}

    async componentDidMount() {

        var alldata = await getAllData(localStorage.getItem('username'))
        this.setState(alldata, )
    }

    handle_hive = (e) => {
        localStorage.setItem('username', this.userprofile.username)
    }

    display_form = form => {
        console.log('display form')
        this.setState({
          displayed_form: form
        });
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

    

    renderTableData(){
        function GoToInspection(element){
            localStorage.setItem('hive_pk', element.pk)
            console.log(element.pk)
            let form = <HiveForm handle_hive = {this.handle_hive}/>
            return(
                display_form()
            )
        }
        
        return this.state.hives.map((hive, index) => {
            const{pk, user, name, addr} = hive
            return(
                <tr key = {pk}>
                    <td>{name}</td>
                    <td>{addr}</td> <td><button onClick = {() => GoToInspection(hive)} type="button" class="btn btn-primary">Details</button></td>
                </tr>
            )
        })
    }

    

    render() {
        
        return (
            <div>
                <h1>Your Profile</h1>
                <h2>Contact Information</h2>
                <p>User Name: {this.state.userprofile.user.username}</p>
                <p>Apiary Address: {this.state.userprofile.apiary_addr}</p>
                <p>Contact info: {this.state.userprofile.contact_info}</p>
                <form>
                    <button class="rounded" type="submit" formaction='javascript:editContactInfo();'>Edit Contact Information</button>
                </form>
                <h2>Profile Picture</h2>
                <div>{this.state.userprofile.picture}</div>
                <div>
                    <h1 id = 'title'>Your Hives</h1>
                    <Table striped bordered hover>
                        <thead>
                            <th>Hive Name</th>
                            <th>Hive Address</th>
                            <th>Details</th>
                        </thead>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </Table>

                </div>
            </div>
        );
    }
}

export default ProfileForm;

ProfileForm.propTypes = {
    handle_profile: PropTypes.func.isRequired
};
