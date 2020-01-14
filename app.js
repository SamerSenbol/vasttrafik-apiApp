import express from "express";
import routeRouter from  "./routes/HandleRoutes";
import tokenRouter from  "./routes/Tokens";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/token', tokenRouter);
app.use('/route', routeRouter);

app.all("*",(req, res, next) => {
  res.status(404).send("page not found");
});

app.listen(PORT,()=>{
  console.log("listening http://localhost:"+PORT);
});