import React from 'react';
import PropTypes from 'prop-types';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

class SignupForm extends React.Component {
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
    /*
    return (
      <form onSubmit={e => this.props.handle_signup(e, this.state)}>
        <h4>Sign Up</h4>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handle_change}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handle_change}
        />
        <input type="submit" />
      </form>
    );
    */

    return (
      <div style = {{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-40%, -60%)'
        }}>

        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form onSubmit={e => this.props.handle_signup(e, this.state)}>
                {/* <p className="h4 text-center mb-4">Sign up</p> */}
                <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                  Username
                </label>
                <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handle_change}
                />
                <br />
                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                  Password
                </label>
                <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handle_change}
                />
                <div className="text-center mt-4">
                  <MDBBtn color="warning" type="submit">
                    Register
                  </MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        </div>
        );
  }
}

export default SignupForm;

SignupForm.propTypes = {
  handle_signup: PropTypes.func.isRequired
};
