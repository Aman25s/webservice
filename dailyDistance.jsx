import React, { Component } from 'react';

class DailyDistance extends Component{
    state = {
        data: {
            distance: "", 
            date: "",
            time: ""
            // additional parameters can be added here
        }
    }

    componentDidMount = async() => {
        /*
            Assuming JSON:
            {
                data: {
                    distance: "",
                    date: "",
                    time: ""
                    // can add any additional data here
                },
                ...
            }
        */

        try{
            const response = await axios.get(
              "https://anyURL.com"
            );
            // if any additional data is added then it can 
            // be added here and updated in state as well easily
            const {date, time, distance} = response.data;    

            const data = {...this.state.data};
            data["date"]=date;
            data["distance"]=distance;
            data["time"]=time;

            this.setState({data});
        }
        catch(error){
            console.log(error);
        }
    }
}
