import React, { Component } from "react";
import DisplayCooperResult from "./Components/DisplayCooperResult";
import InputFields from "./Components/InputFields";
import LoginForm from "./Components/LoginForm";
import { authenticate, authenticateSignUp } from "./Modules/Auth";
import DisplayPerformanceData from "./Components/DisplayPerformanceData";
import SignupForm from "./Components/SignupForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: "",
      gender: "female",
      age: "",
      renderLoginForm: false,
      renderSignupForm: false,
      authenticated: false,
      email: "",
      password: "",
      passwordConfirmation: "",
      message: "",
      entrySaved: false,
      renderIndex: false,
      updateIndex: false
    };
  }

  entryHandler() {
    this.setState({ entrySaved: true, updateIndex: true });
  }

  indexUpdated() {
    this.setState({ updateIndex: false });
  }

  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
      entrySaved: false
    });
  }

  async onLogin(e) {
    e.preventDefault();
    let resp = await authenticate(this.state.email, this.state.password);
    if (resp.authenticated === true) {
      this.setState({ authenticated: true });
    } else {
      this.setState({ message: resp.message, renderLoginForm: false });
    }
  }


  async onSignUp(e) {
    e.preventDefault();
    let resp = await authenticateSignUp(this.state.email, this.state.password, this.state.passwordConfirmation)
    if (resp.authenticated === true) {
      this.setState({ authenticated: true });
    } else {
      this.setState({ message: resp.message, renderSignUpForm: false })
    }
  }
  

  render() {
    let renderLogin;
    let user;
    let performanceDataIndex;
    let renderSignUp;

    if (this.state.authenticated === true) {
      user = JSON.parse(sessionStorage.getItem("credentials")).uid;
      renderLogin = <p>Hi {user}</p>;
      performanceDataIndex = (
        <button
          id="show-index"
          onClick={() => this.setState({ renderIndex: true })}
        >
          Show past entries
        </button>
      );
      if (this.state.renderIndex === true) {
        performanceDataIndex = (
          <>
            <DisplayPerformanceData
              updateIndex={this.state.updateIndex}
              indexUpdated={this.indexUpdated.bind(this)}
            />
            <button onClick={() => this.setState({ renderIndex: false })}>
              Hide past entries
            </button>
          </>
        );
      } else {
        performanceDataIndex = (
          <button
            id="show-index"
            onClick={() => this.setState({ renderIndex: true })}
          >
            Show past entries
          </button>
        );
      }
    } else {
      if (
        this.state.renderLoginForm === true &&
        this.state.renderSignupForm === false
      ) {
        renderLogin = (
          <>
            <LoginForm
              loginHandler={this.onLogin.bind(this)}
              inputChangeHandler={this.onChange.bind(this)}
            />
          </>
        );
      } else if (
        this.state.renderLoginForm === false &&
        this.state.renderSignupForm === true
      ) {
        renderSignUp = ( 
        <>
        <SignupForm 
            signupHandler={this.onSignUp.bind(this)}
            inputChangeHandler={this.onChange.bind(this)}
        />;
        
        </>
        );
      } else {
        renderLogin = (
          <>
            <button
              id="login"
              onClick={() => this.setState({ renderLoginForm: true })}
            >
              Login
            </button>
            <p>{this.state.message}</p>
          </>
        );
          
        renderSignUp = (
          <>
            <button
              id="sign-up"
              onClick={() => this.setState({ renderSignupForm: true })}
            >
              Signup
            </button>
          </>
        );
      }
    }

    return (
      <div>
        <InputFields inputChangeHandler={this.onChange.bind(this)} />

        <DisplayCooperResult
          distance={this.state.distance}
          gender={this.state.gender}
          age={this.state.age}
          authenticated={this.state.authenticated}
          entrySaved={this.state.entrySaved}
          entryHandler={this.entryHandler.bind(this)}
        />
        {performanceDataIndex}
        {renderLogin}
        {renderSignUp}
      </div>
    );
  }
}

export default App;
