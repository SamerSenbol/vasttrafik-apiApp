import express from "express";
import routeRouter from  "./routes/Stops";
import tokenRouter from  "./routes/Tokens";
import tripRouter from "./routes/Trip";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/token', tokenRouter);
app.use('/route', routeRouter);
app.use('/trip', tripRouter);

app.all("*",(req, res, next) => {
  res.status(404).send("page not found");
});

app.listen(PORT,()=>{
  console.log("listening http://localhost:"+PORT);
});