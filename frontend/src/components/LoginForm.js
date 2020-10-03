import React from 'react';
import PropTypes from 'prop-types';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

class LoginForm extends React.Component {
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
     <div style = {{
         position: 'absolute', left: '50%', top: '50%',
         transform: 'translate(-40%, -60%)'
       }}>
     <MDBContainer>
       <MDBRow>
         <MDBCol md="6">
           <form onSubmit={e => this.props.handle_login(e, this.state)}>
             {/* <p className="h4">Sign-in</p> */}
             <label htmlFor="defaultFormLoginUsernameEx" className="grey-text">
              Username
             </label>
             <input
               type="text"
               name="username"
               value={this.state.username}
               onChange={this.handle_change}
             />
             <br />
             <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
               Password
             </label>
             <input
               type="password"
               name="password"
               value={this.state.password}
               onChange={this.handle_change}
             />
             <div className="text-center mt-4">
               <MDBBtn color="warning" type="submit">Login</MDBBtn>
             </div>
           </form>
         </MDBCol>
       </MDBRow>
     </MDBContainer>
     </div>

     );
   }
 }

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};
