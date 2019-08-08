import React from 'react';

const SignupForm = () => {
  return (
    <form>
      <div>
        <label >Email</label>
        <input id="email"></input>
      </div>

      <div>
        <label>Password</label>
        <input id="password"></input>
      </div>
      <div>
        <label>Password Confirmation</label>
        <input id="password_confirmation"></input>
      </div>
      <button id="submit">Signup</button>
    </form>
  )
}

export default SignupForm;