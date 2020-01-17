import React, { Component } from 'react';

class Trips extends Component {
      constructor(props) {
            super(props);
            this.state = {}
      }

      render() {
            return (
                  <div>
                        <h2>Trip : {this.props.name + 1}</h2>
                        {
                              this.props.data.map(trip =>
                                    <div>
                                          {
                                                trip.type === "BUS" &&

                                                <div border="1">
                                                      <h4>{trip.type}</h4>
                                                      <p>Name : {trip.name}</p>
                                                      <p>Journey Number : {trip.journeyNumber}</p>
                                                      <p>Direction : {trip.direction}</p>
                                                      <h6>Origin : </h6>{trip.Origin.name}<br />
                                                      <p>Type : {trip.Origin.type}</p>
                                                      <p>Time : {trip.Origin.time}</p>
                                                      <p>Track : {trip.Origin.track}</p>
                                                      <h6>Destination : </h6><p>{trip.Destination.name}</p>
                                                      <p>Type : {trip.Destination.type}</p>
                                                      <p>Time : {trip.Destination.time}</p>
                                                      <p>Track : {trip.Destination.track}</p>
                                                </div>

                                          }
                                          {
                                                trip.type === "WALK" &&
                                                <div>
                                                      <h4>{trip.type}</h4>
                                                      <p>Name : {trip.name}</p>
                                                      <h6>Origin : </h6>{trip.Origin.name} <br />
                                                      <p>Type : {trip.Origin.type}</p>
                                                      <p>Time : {trip.Origin.time}</p>
                                                      <p>Track : {trip.Origin.track}</p>
                                                      <h6>Destination : </h6>{trip.Destination.name}<br />
                                                      <p>Type : {trip.Destination.type}</p>
                                                      <p>Time : {trip.Destination.time}</p>
                                                      <p>Track : {trip.Destination.track}</p>
                                                </div>
                                          }
                                    </div>
                              )
                        }
                  </div>
            );
      }
}

export default Trips;