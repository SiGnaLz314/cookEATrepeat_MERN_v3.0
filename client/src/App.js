// @flow
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/App.css";
import * as cooking from './stylesheets/cooking.json';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import AppRouter from "./router/app-router";
import Footer from "./components/footer";

type State = {
    done: boolean
};


// Animated Background Options
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: cooking.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};
  
class App extends Component<void, State> {
    state: State;
    constructor() {
      super();
      
      this.state = {
        done: false
      };
    }
  
    componentDidMount() {
        setTimeout(() => {
            this.setState({ done: true });
        }, 2000);
    }
  
    render() {
      return (
        <div>
          {!this.state.done ? (
            <FadeIn>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 p-0">
                            <div className="min-vh-100 text-center d-flex flex-column justify-content-center">
                                <h1>we shall wait for good food</h1>
                                <Lottie options={defaultOptions} height={120} width={120} />
                            </div>
                        </div>
                    </div>
                </div>
            </FadeIn>
          ) : (
            <AppRouter {...this.props} />
          )}
          <Footer />
        </div>
      );
    }
}

export default App;