import React, { Component } from 'react';
import './Dropdown.css';

class Dropdown extends Component {


  render() {
    return (

      <select
      value={this.props.value}
      onChange={this.onSelectChange}
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


    );
  }
}

export default Dropdown;
