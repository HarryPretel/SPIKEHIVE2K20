import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap'
import { getAllData_good } from '../HelperFunctions'

class InspectionForm extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
        userprofile: { user: {} },
        hives: [],
        equipment: [],
        current_ins: {},
        current_hive: {}
    };
  }

    async componentDidMount(){
        let ins_pk = localStorage.getItem('inspection_pk')
        let hive_pk = localStorage.getItem('hive_pk')
        console.log(ins_pk)
        var allgooddata = await getAllData_good(localStorage.getItem('username'))
        this.setState(allgooddata)

        var temp1 = []
        var temp2 = {}
        var temp3 = {}

        for(let i of this.state.hives) {
            if((i.pk) == hive_pk){
                temp3 = i
                for(let j of i.inspections){
                    if((j.pk)== ins_pk){
                        temp1 = j.equipment
                        temp2 = j
                        break
                    }
                }
                break
            }
        }
        this.setState({equipment: temp1, current_ins: temp2, current_hive: temp3})
        console.log("INSEPCTIONS!!!!!!!!; "  + this.state)
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

        return this.state.equipment.map((tool, index) => {
            const { pk, inspection, tool_name, amount_in_inventory,condition} = tool
            return (
                <tr key={pk}>
                    <td>{tool_name}</td>
                    <td>{amount_in_inventory}</td>
                    <td>{condition}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <h1>Your Equipment</h1>
                <h2>Hive name: {this.state.current_hive.name}</h2>
                <h2>Inspection Date: {this.state.current_ins.date}</h2>
                <div>
                    <h1 id = 'title'>Equipment</h1>
                    <Table striped bordered hover>
                        <thead>
                            <th>Tool Name</th>
                            <th>Amount in Inventory</th>
                            <th>Condition</th>
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

export default InspectionForm;

InspectionForm.propTypes = {
    handle_inspection: PropTypes.func.isRequired
};
