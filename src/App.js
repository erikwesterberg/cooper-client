import React, { Component } from "react";
import DisplayCooperResult from "./Components/DisplayCooperResult";
import InputFields from "./Components/InputFields";
import LoginForm from "./Components/LoginForm";
import { authenticate, authenticateSignUp } from "./Modules/Auth";
import DisplayPerformanceData from "./Components/DisplayPerformanceData";
import SignupForm from "./Components/SignupForm";
import './styling/main.scss'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: "",
      gender: "female",
      age: "",
      renderLoginForm: false,
      renderSignupForm: false,
      renderInputFields: false,
      renderDisplayCooperResult: false,
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

  hideForm(e) {
    if ( this.state.renderInputFields === true ) {
      this.setState({ renderInputFields: false })}
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
    let renderInput
    let renderdisplayResult

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
            <button onClick={() => this.setState({ renderLoginForm: false })}>Hide</button>
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
        } else if ( this.state.renderInputFields === true && this.state.renderDisplayCooperResult === true) {
            renderInput = (
            <>
                <InputFields inputChangeHandler={this.onChange.bind(this)} 
                hideHandler={this.hideForm.bind(this)}
                />
                      <>
                <DisplayCooperResult
                  distance={this.state.distance}
                  gender={this.state.gender}
                  age={this.state.age}
                  authenticated={this.state.authenticated}
                  entrySaved={this.state.entrySaved}
                  entryHandler={this.entryHandler.bind(this)}
                />
              </>
                {/* <div style={{ backgroundColor: 'red', width: 300, height: 200, float: 'right' }}  ></div> */}
            </>
            )
           
      } else {

        renderInput = (
          <>
          <div className="cooper">
          <button className="button1" onClick={() => this.setState({ renderInputFields: true, renderDisplayCooperResult: true })}>David Goggins says RUN</button>
          <button className="button1">David Goggins says BMI</button>
          </div>
          </>
        )

        renderLogin = (
          <>
          <div className="cooper">
            <button className="loginBtn"
              id="login" 
              onClick={() => this.setState({ renderLoginForm: true })}
            >
              Login
            </button>
            </div>
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
      
      <div className="container">
        <div className="left-bg">
        <h1 className="h1">Do you have what it takes?</h1>
        {renderInput}
        {renderdisplayResult}
        </div>
        <div className="right-bg">
        {performanceDataIndex}
        {renderLogin}
        {renderSignUp}
         </div>
      </div>
    );
  }
}

export default App;
