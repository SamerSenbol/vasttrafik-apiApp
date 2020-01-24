# React js Trip Planner

The application consist of two sides.
One is the client side and other is the server side. 

Client is created with react js and server side is written with node js.

Client side consist of form that takes information to be queried from the user and display the trips that are fetched from server. 

Server side is written in express with MVC architecture. 

This server is connected to third api Vasttrafik. 

This api has the data of stops and trips. 

We need a token to connect with vasttrafik api.

This token is send to us by vasttrafik api after we provide the key and secret given to us while creating the app in developer account of vasttrafik api. 

We fetch the stops and trips(based on user input) from the vastrafik api along with the token. 

We also update the token because token expired after every 1 hour. 

Stops are stored in allLocation.

json file in assests folder of server.

Token is sent to client side and client side store that token in the localstorage and for every request after that client send the authrization with token in header that authenticate the client access. 

# You can start the application by:

- first installing dependency on both client and server side by running these commands:

    **$ npm install**

- On server execute the following command:

    **npm run-script dev**

- On client execute the following command:

    **npm start**

     # Technologies Used : React.js Node.js Express
