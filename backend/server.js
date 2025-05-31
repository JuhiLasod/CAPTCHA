import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes.js";
import session from "express-session";
const app=express();
dotenv.config();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));
// app.use(cors());
  app.use(session({
    secret: "yourSecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // true when using https
  }));


app.use("/api", routes);

app.listen(process.env.PORT, ()=>{
    console.log("Server running");
});
// app.listen(4000, ()=>{
//     console.log("Server running");
// });