import React, { Component } from "react";
import { bmiCalculation } from "../Modules/BMIcalculator";


class DisplayBMIResult extends Component {
  calculate() {
    let weight = this.props.weight;
    let height = this.props.height;
    let method = this.props.method;
    
    return bmiCalculation(weight, height, method);
  }

  render() {
    return ( <div className="response">{this.calculate()}</div>
    )
  }
}

export default DisplayBMIResult;