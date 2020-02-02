import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav/Nav.js';

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

        console.log("year total by region:", data);
        this.setState({
          regionTotals: data,

        });

        this.onlyRegionTotals();

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

  render() {

    return (
      <div className="App">
      <header className="App-header"> </header>
      <div className="GridContainer">
        <Nav />



</div>
      <div id="BarChart" className="BarChart">


{

  this.state.value ? (

   Object.keys(this.state.migrants2019).map(region => (

    this.state.migrants2019[region] > 1 ? (

     <div className="BarChart-bar" style={{width: this.state.migrants2019[region] * 9 + "px" }}>
     {region}
     <span className="total"> {this.state.migrants2019[region]} </span>
     </div>

   ) : null

   ))

   ) : (

     this.state.regionTotals.map(data => (
       <div className="BarChart-bar" style={{width: data.total }} >
       {data.region}
       <span className="total"> {data.total} </span>
       </div>
   ))

   )
}

      </div>


          <div className="BarChart-max">max</div>
      <hr className="BottomLine" />



      </div>

    // return closing tag
    );
  // render closing tag
};
// class app compotent closing tag
};

export default App;
