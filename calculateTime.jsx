import React, { Component } from "react";

export default class CalculateTimeStamp extends Component {
  state = {
    data: {
      u_id: "",
      start_time: "",
      end_time: "",
      distance: "",
      // Hardcoding speed here but in main service 
      // will take distance from backend(see line no: 54)
      speed: "40" 
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
    data["distance"] = data["speed"] * (hours + minutes/60);
    this.setState({data});
  }

  /*
  componentDidMount = async() => {
    try{
      const response = await axios.get(
        "http://url.com/getSpeed"
      );

      const data = {...this.state.data};
      data["speed"] = response.data.speed;
      this.setState({data});
    }
    catch(error){
      console.log(error);
    }
  }
  */

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
        Total Distance Travelled:<br />
        <input id="distance" name="distance" value={this.state.data.distance}></input>
        </form>
        <br />
          
      </React.Fragment>
    );
  }
}
