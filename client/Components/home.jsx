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

}

export default Home;