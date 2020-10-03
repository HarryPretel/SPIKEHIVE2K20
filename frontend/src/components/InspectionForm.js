import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap'
import { getAllData_good } from '../HelperFunctions'

class InspectionForm extends React.Component{
    state = {
        userprofile: { user: {} },
        hives: [],
        equipment: [],
        current_ins: {}
    };

    async componentDidMount(){
        let ins_pk = localStorage.getItem('inspection_pk')
        let hive_pk = localStorage.getItem('hive_pk')
        console.log(ins_pk)
        var allgooddata = await getAllData_good(localStorage.getItem('username'))
        this.setState(allgooddata)

        var temp1 = []
        var temp2 = {}

        for(let i of this.state.hives) {
            if((i.pk) == hive_pk){
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
        this.setState({equipment: temp1, current_is: temp2})
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
            const { pk, hive, date, health,honey,queen_production,weight,net_weight_change, equipment } = tool
            return (
                <tr key={pk}>
                    <td>{date}</td>
                    <td>{health}</td>
                    <td>{honey}</td>
                    <td>{queen_production}</td>
                    <td>{weight}</td>
                    <td>{net_weight_change}</td>
                </tr>
            )
        })
    }
}

export default InspectionForm;


InspectionForm.propTypes = {
    handle_inspection: PropTypes.func.isRequired
};
