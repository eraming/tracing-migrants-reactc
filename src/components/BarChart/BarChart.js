import React, { Component } from 'react';
import './BarChart.css';

class BarChart extends Component {

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
      <div id="BarChart" className="BarChart">
      {

        this.props.dropdownValue ? (

         Object.keys(this.props.migrants2019).map(region => (

          this.props.migrants2019[region] > 1 ? (

           <div className="BarChart-bar" style={{width: this.props.migrants2019[region] * 9 + "px" }}>
           {region}
           <span className="total"> {this.props.migrants2019[region]} </span>
           </div>

         ) : null

         ))

         ) : (

           this.props.regionTotals.map(data => (
             <div className="BarChart-bar" style={{width: data.total }} >
             {data.region}
             <span className="total"> {data.total} </span>
             </div>
         ))

         )
      }

            </div>

    );
  }
}

export default BarChart;
