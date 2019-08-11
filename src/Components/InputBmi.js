import React from 'react';

const InputBmi = (props) => {
  return (
    <>
          <div className="text">
          <label>Weight</label>
          <input
            className="input-field"
            name="weight"
          
          />
        </div>

        <div className="text">
          <label>Height</label>
          <input
            className="input-field"
            name="height"
          />
          <button onClick={(e) => props.hideBMI(e)} >Hide</button>
        </div>
    </>
  )
}

export default InputBmi;