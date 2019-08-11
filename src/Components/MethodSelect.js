import React from "react";


function MethodSelect(props) {
  return (
    <>
      <div className="main-div">
      <label className="method">Method</label>
        <select name="method" id="method" onChange={props.onChangeValue} value={props.method}>
          <option className="options" value="metric">Metric</option>
          <option className="options"  value="imperial">Imperial</option>
        </select>
      </div>
    </>
  );
}
export default MethodSelect;