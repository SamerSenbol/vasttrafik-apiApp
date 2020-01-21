import express from "express";
import stopsRouter from "./routes/Stops";
import tokenRouter from "./routes/Tokens";
import tripRouter from "./routes/Trip";
import cors from 'cors';
const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/token', tokenRouter);
app.use('/stops', stopsRouter);
app.use('/trip', tripRouter);

app.all("*", (req, res, next) => {
  res.status(404).send("page not found");
});

app.listen(PORT, () => {
  console.log("listening http://localhost:" + PORT);
});