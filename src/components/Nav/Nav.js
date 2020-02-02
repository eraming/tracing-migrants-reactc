import React, { Component } from 'react';
import './Nav.css';
import Dropdown from '../Dropdown/Dropdown.js';
class Nav extends Component {


  render() {
    return (
      <div className="Header">

      <h1>2019 Recorded Migrant Deaths </h1>
      <p> Data from <a href="https://missingmigrants.iom.int/">Missing Migrants Project</a>.</p>
      <hr className="BottomLine" />

      <p> Select from the drop down list to see records by month. If there are no records for the month,
      data will not be displayed for that region. </p>

      <Dropdown
      value={this.props.value}
      onChange={this.onSelectChange}
       />

      </div>

// insert stuff here


    );
  }
}

export default Nav;
