import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav/Nav.js';
import BarChart from './components/BarChart/BarChart.js';
import Dropdown from './components/Dropdown/Dropdown.js';
import BottomLine from './components/BottomLine/BottomLine.js';

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
        // console.log("this.state.value", this.state.value);
        console.log("totals", totals);
        this.setState({
          migrants2019: totals,
        });
      });
  }

  dataToTotals(fulldata, selectedMonth){

    let monthly_totals = {
      'US-Mexico Border': 0,
      'Sub-Saharan Africa': 0,
      'Mediterranean': 0,
      'North Africa': 0,
      'South East Asia': 0,
      'South Asia': 0,
      'South America': 0,
      'Horn of Africa': 0,
      'Middle East': 0,
      'Europe': 0,
      'Central America': 0,
    }

    let region;
    let dead;
    let month;


    for (let migrantInfo of fulldata) {
        region = migrantInfo['Region of Incident'];
        dead = parseFloat(migrantInfo['Number Dead']);
        month = migrantInfo['Reported Month'];

        if (region && month === selectedMonth) {
            monthly_totals[region] += dead;
            console.log(monthly_totals[region], region);
        }
      };

      return monthly_totals
  }


  render() {

    return (
      <div className="App">
      <header className="App-header"></header>

      <div className="GridContainer">
      <div className="Header">

      <Nav
      value={this.state.value}
      />

      <Dropdown
      value={this.props.value}
      onSelectChange={this.onSelectChange}
       />

       </div>

      <BarChart
      dropdownValue={this.state.value}
      migrants2019={this.state.migrants2019}
      regionTotals={this.state.regionTotals}
      />

      <BottomLine />
      <div className="BarChart-max">max</div>


      </div>
      </div>




    );
  };
};

export default App;
