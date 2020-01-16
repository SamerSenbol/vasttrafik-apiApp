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
}

export default Home;