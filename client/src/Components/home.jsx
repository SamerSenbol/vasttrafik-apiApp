import React, { Component } from 'react';
import Trips from './displaytrips';
import Button from 'react-bootstrap/Button';
import Autosuggest from "react-autosuggest";

class Home extends Component {

  
      constructor(props) {
            super(props);
            this.state = {
                  data: [],
                  originId: "none",
                  destId: "none",
                  isDepOrArrTime: "",
                  date: "",
                  time: "",
                  trips: [],
                  suggestions: [],
                  from_value: "",
                  to_value: ""
            };
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
            if (event.target.name === "originId" || event.target.name === "destId") {
                  for (var i = 0; i < this.state.data.length; i++) {
                        if (this.state.data[i].name === event.target.value) {
                              this.setState({ [event.target.name]: this.state.data[i].id });
                              break;
                        }
                  }
            } else if (event.target.name === "date") {
                  var replaced = event.target.value.replace("-", "/");
                  var replaceded = replaced.replace("-", "/");
                  this.setState({ [event.target.name]: replaceded });
            }
            else {
                  this.setState({ [event.target.name]: event.target.value });
            }
      }

      handleSubmit = async (event) => {
            event.preventDefault();
            if (this.state.originId === "none" || this.state.destId === "none" || this.state.date === "" || this.state.time === "" || this.state.isDepOrArrTime === "") {
                  alert("Fill complete Values")
            } else {
                  console.log(this.state)
                  await this.getTrips(this.state);
            }
      }


      render() {

            const FrominputProps = {
                  placeholder: 'From',
                  value: this.state.from_value,
                  onChange: this.onFromChange
            };
      
            const TOinputProps = {
                  placeholder: 'TO',
                  value: this.state.to_value,
                  onChange: this.onTOChange
            };
            return (
                  <div>
                        <h1>Travel Schedule</h1><br /><br />
                        <form onSubmit={this.handleSubmit}>
                              From :
                              < Autosuggest suggestions={this.state.suggestions}
                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                    getSuggestionValue={this.getSuggestionValue}
                                    renderSuggestion={this.renderSuggestion}
                                    inputProps={FrominputProps} 
                              /><br />
                              To :
                              < Autosuggest suggestions={this.state.suggestions}
                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                    getSuggestionValue={this.getSuggestionValue}
                                    renderSuggestion={this.renderSuggestion}
                                    inputProps={TOinputProps}
                              /><br />
                              <input type="radio" selected name="isDepOrArrTime" value="1" onChange={this.handleChange} /> Arrival Time
                              <input type="radio" name="isDepOrArrTime" value="0" onChange={this.handleChange} /> Departure Time<br />
                              <label>Date:</label>
                              <input type="date" name="date" onChange={this.handleChange} /><br />
                              <label>Time:</label>
                              <input type="text" pattern="[0-9]{2}:[0-9]{2}" placeholder="16:00" name="time" onChange={this.handleChange} /><br />
                              <Button type="submit">Submit</Button>
                        </form>
                        <div>
                              {
                                    this.state.trips.map((trip) => <Trips data={trip.Leg} />)
                              }
                        </div>
                  </div>
            );
      }
      

};

 

  getToken = async () => {
    const res = await fetch("http://localhost:4000/token");
    const data = await res.json();
    // console.log(data.access_token);
    localStorage.setItem("access_token", data.access_token);
    this.getStops();
}
updateStops = async () => {
    var token = localStorage.getItem("access_token");
    token = ("Bearer ").concat(token);
    // console.log(token)
    const res = await fetch('http://localhost:4000/stops', {
          method: 'put',
          headers: new Headers({
                'Content-Type': 'application/json',
                "Authorization": token
          })
    });
    const data = await res.json();
    if (data.token === undefined) {
          console.log("null");
    } else {
          localStorage.setItem("access_token", data.token);
    }
    this.getStops();
}

getStops = async () => {
    const res = await fetch('http://localhost:4000/stops');
    const data = await res.json();
    this.setState({ data: data });
    console.log(this.state.data);
}
      
componentDidMount() 
    this.getToken();



getTrips = async (data) => {
      try {
            const sendind_data = { originId: data.originId, destId: data.destId, date: data.date, time: data.time, isDepOrArrTime: data.isDepOrArrTime }
            var token = localStorage.getItem("access_token");
            token = ("Bearer ").concat(token);
            const res = await fetch('http://localhost:4000/trip', {
                  method: 'post',
                  headers: new Headers({
                        'Content-Type': 'application/json',
                        "Authorization": token
                  }),
                  body: JSON.stringify(sendind_data)
            });
            const trips = await res.json();
            if (trips.TripList.Trip === undefined) {
                  alert("No routes availible")
            } else if (trips.TripList.Trip.length === undefined) {
                  var arrayy = [];
                  arrayy.push(trips.TripList.Trip);
                  this.setState({ trips: arrayy });
            }
            else {
                  this.setState({ trips: trips.TripList.Trip });
            }
      }
      catch (err) {
            console.log(err);
      }
}


export default Home;