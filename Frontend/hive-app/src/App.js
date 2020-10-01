import React, { Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state ={
    hives: []
  };

  async componentDidMount(){
    try{
      const res = await fetch('http://127.0.0.1:8000/api/hives');
      const hives = await res.json();
      this.setState({
        hives
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        {this.state.hives.map(item => (
          <div>
            <h1>{item.name}</h1>
            <span>{item.addr}</span>
          </div>
        ))}
      </div>
    )
  }
};





/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default App;
