import React from "react";

const InputBmi = props => {
  return (
    <>
      <div className="input-data-form">
        <div className="text">
          <label>Weight</label>
          <input className="input-field" name="weight" onChange={props.ValueChange} value={props.weight}/>

          <label className="method">Method</label>
            <select name="method" id="method" onChange={props.onChangeValue} value={props.method}>
              <option className="options" value="metric">Metric</option>
              <option className="options"  value="imperial">Imperial</option>
            </select>
        </div>

        <div className="text">
          <label>Height</label>
          <input className="input-field" name="height" onChange={props.onValueChange} value={props.height}/>
          <button onClick={e => props.hideBMI(e)}>Hide</button>
        </div>
      </div>
    </>
  );
};

export default InputBmi;
