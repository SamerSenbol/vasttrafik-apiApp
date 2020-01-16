import React, { Component } from 'react';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
              data: [],
              originId: "",
              destId: "",
              isDepOrArrTime: "",
              date: "",
              time: "",
              trips: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    // console.log(this.state.data);
}
      
componentDidMount() {
    this.getToken();
}


getTrips = async (data) => {
    // console.log(data)
    const sendind_data = { originId: "9021014084222000", destId: "9022014018243000", date: "2020-01-18", time: "09:00", isDepOrArrTime: "1" }
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
    // console.log(trips.TripList.Trip);
    this.setState({ trips: trips.TripList.Trip });
}

}

export default Home;