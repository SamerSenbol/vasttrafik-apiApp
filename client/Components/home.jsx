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
}

export default Home;