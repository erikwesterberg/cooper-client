import React, { Component } from "react";
import DisplayCooperResult from "./Components/DisplayCooperResult";
import InputFields from "./Components/InputFields";
import LoginForm from "./Components/LoginForm";
import { authenticate } from "./Modules/Auth";
import DisplayPerformanceData from "./Components/DisplayPerformanceData";
import './styling/main.scss'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: "",
      gender: "female",
      age: "",
      renderLoginForm: false,
      authenticated: false,
      email: "",
      password: "",
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

  render() {
    let renderLogin;
    let user;
    let performanceDataIndex;

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
      if (this.state.renderLoginForm === true) {
        renderLogin = (
          <>
            <LoginForm
              loginHandler={this.onLogin.bind(this)}
              inputChangeHandler={this.onChange.bind(this)}
            />
            <button onClick={() => this.setState({ renderLoginForm: false })}>Hide</button>
          </>
        );
      } else {
        renderLogin = (
          <>
          <div className="login">
            <button 
              id="login" 
              onClick={() => this.setState({ renderLoginForm: true })}
            >
              Login
            </button>
            </div>
            <p>{this.state.message}</p>
          
          </>
        );
      }
    }



    return (
      
      <div className="container">
        <div className="left-bg">
        <h1>Do you have what it takes?</h1>
          <div class="sides">
              <button className="logo">Cooper Challange</button>
          </div>
        <InputFields inputChangeHandler={this.onChange.bind(this)} />

        <DisplayCooperResult
          distance={this.state.distance}
          gender={this.state.gender}
          age={this.state.age}
          authenticated={this.state.authenticated}
          entrySaved={this.state.entrySaved}
          entryHandler={this.entryHandler.bind(this)}
        />
        </div>
        <div className="right-bg">
        {performanceDataIndex}
        {renderLogin}
        </div>
      </div>
    );
  }
}

export default App;