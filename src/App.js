import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav/Nav.js';
import BarChart from './components/BarChart/BarChart.js';

class App extends Component {
  state = {
    regionTotals: [],
    migrants2019: [],
    value: '',
  }


onSelectChange = (ev) => {
  this.setState({value: ev.target.value});
  this.onlyRegionTotals();

}
  componentDidMount() {
    fetch("./region-total.json", { mode: 'cors', method: 'get', headers: { 'Access-Control-Allow-Origin': '*' }})
      .then(response => response.json())
      .then(data => {

        console.log("2019 total by region:", data);
        this.setState({
          regionTotals: data,

        });

      });
  }

  onlyRegionTotals () {
    fetch("./migrants2019.json", { mode: 'cors', method: 'get', headers: { 'Access-Control-Allow-Origin': '*' }})
      .then(response => response.json())
      .then(fulldata => {
        let totals  = this.dataToTotals(fulldata, this.state.value)
        console.log("this.state.value", this.state.value);
        console.log("totals", totals);
        this.setState({
          migrants2019: totals,
        });
      });
  }


  render() {

    return (
      <div className="App">
      <header className="App-header"></header>
      <div className="GridContainer">
      <Nav />

      <BarChart
      value={this.state.value}
      />


      </div>
      <div className="BarChart-max">max</div>
      <hr className="BottomLine" />
      </div>



    );
  };
};

export default App;
