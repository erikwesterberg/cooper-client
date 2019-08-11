import React from 'react';

const InputFields = (props) => {
  return (
    <>
    <div className="input-data-form">
      <label>Distance</label>
      <input className="inputform"id="distance" onChange={props.inputChangeHandler}></input>

      <select id="gender" onChange={props.inputChangeHandler}>
        <option value="female">Female</option>
        <option  value="male">Male</option>
      </select>

      <label>Age</label>
      <input className="inputform" id="age" onChange={props.inputChangeHandler}></input>
      <button onClick={(e) => props.hideHandler(e)}  >Hide</button>
      </div>
    </>
  )
}

export default InputFields;