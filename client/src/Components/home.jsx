import React, { Component } from 'react';
import Trips from './displaytrips';

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
  }

  render() {
    return (
        <div>
        </div>
    );
}
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
      
componentDidMount() {
    this.getToken();
}


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
}

export default Home;