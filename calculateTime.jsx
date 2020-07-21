import React, { Component } from "react";

export default class CalculateTimeStamp extends Component {
  state = {
    data: {
      u_id: "",
      start_time: "",
      end_time: "",
      time_diff: ""
    },
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.calculateDiff();
  };

  handleChange = (e) => {
    e.preventDefault();
    const data = {...this.state.data};
    data[e.target.name] = e.target.value;
    console.log(data[e.target.name]);
    this.setState({data});
  }

  calculateDiff = () =>{
        const {start_time, end_time} =this.state.data;

        var start = start_time.split(':');
        var end = end_time.split(":");

        var startTime = new Date(0, 0, 0, start[0], start[1], 0);
        var endTime = new Date(0, 0, 0, end[0], end[1], 0);

        var diff = endTime.getTime() - startTime.getTime();

        var hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;

        var minutes = Math.floor(diff / 1000 / 60);

        if (hours < 0)
            hours = hours + 24;

        const data = {...this.state.data};
        data["time_diff"] = (hours <= 9 ? "0" : "") + hours + "hours : " + (minutes <= 9 ? "0" : "") + minutes + " minutes";
            
        this.setState({data})

  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
        Enter ID:<br />
        <input 
            type="text" 
            id="u_id" 
            name="u_id" 
            onChange={this.handleChange}
        /><br />
        Start Time:<br />
        <input 
            type="time" 
            id="start_time" 
            name="start_time" 
            onChange={this.handleChange}
        /><br />
        End Time:<br />
        <input 
            type="time" 
            id="end_time" 
            name="end_time"
            onChange={this.handleChange}
        /><br /><br />
        <button id="btn1" onClick={this.handleSubmit}>Submit</button><br />
        Total Time Spent:<br />
        <input id="diff" name="diff" value={this.state.data.time_diff}></input>
        </form>
        <br />
          
      </React.Fragment>
    );
  }
}
