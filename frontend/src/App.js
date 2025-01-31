import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ProfileForm from './components/ProfileForm';
import HiveForm from './components/HiveForm';
import InspectionForm from './components/InspectionForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: false, // localStorage.getItem('token') ? true : false, got rid of bc token dont work
      username: '',
      pk: ''
    };
  }

  componentDidMount() {
    console.log('componentDidMount')
    if (this.state.logged_in) {
      var json = fetch('http://localhost:8000/api/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      }).json()
      json = Promise.resolve(json)
      this.setState({ username: json.username });
    }

    if (this.state.logged_in) {
      fetch('http://localhost:8000/api/userprofiles/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          console.log('state when mounting: ' + JSON.stringify(this.state) + '\njson: ' + JSON.stringify(json))
          for (var i = 0; i < json.length; i++) {
            if (json[i].username === this.state.username) {
              this.setState({ pk: json[i].pk });
            }
          }
        });
    }
  }



  handle_login = (e, data) => {
    console.log('handle_login')
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        console.log('json in login: ' + JSON.stringify(json))
        if (json.user) {
          localStorage.setItem('username', json.user.username)
          localStorage.setItem('userpk', json.user.pk)
        }
        else throw Error("no user exists")
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user ? json.user.username : ''
        });
      })
      .catch(error => {
        console.log("ERROR: " + error)
        alert("Wrong username or password");
      });
  };

  handle_signup = (e, data) => {
    console.log('handle_signup')
    e.preventDefault();
    fetch('http://localhost:8000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if (json.username[0] === "A user with that username already exists.") throw Error("a user with that username already exists");
        console.log('here it is' + JSON.stringify(json))
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      })
      .catch(error => {
        console.log("ERROR: " + error)
        alert(error);
      });
  };

  handle_logout = () => {
    console.log('handle_logout')
    localStorage.clear()
    this.setState({ logged_in: false, username: '' });
  };

  handle_profile = (e, pk) => { // TODO
    localStorage.setItem('hive_pk', pk)
    this.setState({ displayed_form: 'hives' })
    console.log('handle_profile: ' + pk)
    this.render();
  };

  handle_hive = (e, pk) => {
    localStorage.setItem('inspection_pk', pk)
    //console.log('inspection_pk: ', pk)
    this.setState({
      displayed_form: 'inspections'
    });
    this.render();
  }

  handle_inspection = (e, pk) => {
    localStorage.setItem('inspection_pk', pk)
    console.log('inspection_pk: ', pk)
    //this.setState({
      //displayed_form: 'hives'
    //});
  }

  display_form = form => {
    console.log('display form')
    this.setState({
      displayed_form: form
    });
  };

  render() {
    console.log(this.state)
    console.log('render')
    console.log(`${localStorage.getItem('username')}`)
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      case 'profile':
        form = <ProfileForm handle_profile={this.handle_profile} />;
        break;
      case 'hives':
        form = <HiveForm handle_hive={this.handle_hive} />;
        break;
      case 'inspections':
        form = <InspectionForm handle_inspection={this.handle_inspection} />;
        break;
      default:
        form = null;
    }

    return (
      <div className="App">
        <Nav
          logged_in={this.state.logged_in}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        {form}
        <h3>
          {this.state.logged_in
            ? ``
            : 'Welcome to SPIKEHIVE2K20. Please log in or sign up before using.'}
        </h3>
      </div>
    );
  }
}

export default App;
