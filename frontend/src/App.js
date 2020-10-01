import React, {Component} from 'react';

class App extends Component {
  /*state = {
    hives: []
  }*/
  constructor(props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      hives: []
    };
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/api/hives')
    .then(res => res.json())
    .then(
      (data) => {
        this.setState({
          hives: data,
          isLoaded: true
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  render() {
    const {error, isLoaded, hives} = this.state;
    if(error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded){
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <div className="col-xs-12">
            <h1>My hives</h1>
            {this.state.hives.map((hive) => (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{hive.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {hive.addr}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default App;