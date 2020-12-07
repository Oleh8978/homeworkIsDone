import React, { Component } from "react";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 0,
      hours: 0,
      sec: 0
    };
  }

  componentDidMount() {
    this.doIntervalChange();
  }

  doIntervalChange = () => {
    this.myInterval = setInterval(() => {
      if (this.state.sec === 59) {
        this.setState((prevState) => ({
          min: prevState.min + 1
        }));
        this.setState({
          sec: 0
        });
      }
      if (this.state.min === 59) {
        this.setState((prevState) => ({
          hours: prevState.hours + 1
        }));
        this.setState({
          min: 0
        });
      }
      if (!this.props.data) {
        this.setState({
          min: 0,
          hours: 0,
          sec: 0
        });
      }

      this.setState((prevState) => ({
        sec: prevState.sec + 1
      }));
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  checker = (arg) => {
    let val = "0";
    let newVal;
    if (arg < 10) {
      newVal = val + arg;
    } else {
      newVal = arg;
    }
    return newVal;
  };

  render() {
    const { sec } = this.state;
    const { hours } = this.state;
    const { min } = this.state;
    return (
      <div>
        <h1 style={{ marginTop: "5px", marginLeft: "25%", fontSize: "30px" }}>
          {this.checker(hours)}:{this.checker(min)}:{this.checker(sec)}
        </h1>
      </div>
    );
  }
}

export default Timer;
