import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap'
import { getAllData, getAllData_good } from '../HelperFunctions'

class HiveForm extends React.Component {
    state = {
        userprofile: { user: {} },
        hives: [],
        inspections: [],
        current_hive: {}
    };

    async componentDidMount() {
        let pk = localStorage.getItem('hive_pk')
        console.log("hiveForm: " + pk);
        var allgooddata = await getAllData_good(localStorage.getItem('username'))
        //console.log('alldata: ' + JSON.stringify(alldata))
        this.setState(allgooddata)
        console.log('final form: ' + JSON.stringify(this.state))
        console.log('userprofile' + JSON.stringify(this.state.userprofile) + '\nhive: ' + JSON.stringify(this.state.hives) + '\ninspections: ' + JSON.stringify(this.state.inspections) + '\nequipment: ' + JSON.stringify(this.state.equipment))
        console.log('hives' + JSON.stringify(this.state.hives[0]))
       
        var temp1 = []
        var temp2 = {}
        
        
        for(let i of this.state.hives) {
            if((i.pk) == pk){
                temp1 = i.inspections
                temp2 = i
                break
            }
        }
        this.setState({inspetions: temp1, current_hive: temp2})

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

    

    renderTableData() {
        function GoToInspection(element) {
            localStorage.setItem('inspection_pk', element.pk)
            console.log(element.pk)
            //let form = <InspectionForm handle_inspection={this.handle_inspection} />

        }

    

        return this.state.inspections.map((inspection, index) => {
            const { pk, hive, date, health,honey,queen_production,weight,net_weight_change } = hive
            return (
                <tr key={pk}>
                    <td>{date}</td>
                    <td>{health}</td> 
                    <td>{honey}</td>
                    <td>{queen_production}</td>
                    <td>{weight}</td>
                    <td>{net_weight_change}</td>
                    <td><button onClick={() => GoToInspection(hive)} type="button" class="btn btn-primary">Equipments</button></td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <h1>Your Hive</h1>
                <h2>Hive name: {this.state.current_hive.name}</h2>
                <h2>Hive Address: {this.state.current_hive.addr}</h2>
                <div>
                    <h1 id = 'title'>Past Inspections</h1>
                    <Table striped bordered hover>
                        <thead>
                            <th>Inspection Date</th>
                            <th>Health</th>
                            <th>Honey Stores</th>
                            <th>Queen Production</th>
                            <th>Weight</th>
                            <th>Weight Change</th>
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

export default HiveForm;


HiveForm.propTypes = {
    handle_hive: PropTypes.func.isRequired
};
