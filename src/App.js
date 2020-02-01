import React, { Component } from 'react';
import './App.css';


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
      <div className="Header">

      <h1>2019 Recorded Migrant Deaths </h1>
      <p> Data from <a href="https://missingmigrants.iom.int/">Missing Migrants Project</a>.</p>
      <hr className="BottomLine" />

      <p> Select from the drop down list to see records by month. If there are no records for the month,
      data will not be displayed for that region. </p>

      <select
      value={this.state.value}
      onChange={this.onSelectChange}
      id="months"
      className="Header">
      >
        <option value> -- reported month -- </option>
        <option value="Jan">January</option>
        <option value="Feb">February</option>
        <option value="Mar">March</option>
        <option value="Apr">April</option>
        <option value="May">May</option>
        <option value="Jun">June</option>
        <option value="Jul">July</option>
        <option value="Aug">August</option>
        <option value="Sep">September</option>
        <option value="Oct">October</option>
        <option value="Nov">November</option>
        <option value="Dec">December</option>
      </select>
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
</div>

    // return closing tag
    );
  // render closing tag
};
// class app compotent closing tag
};

export default App;
