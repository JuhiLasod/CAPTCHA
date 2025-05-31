import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes.js";
import session from "express-session";
import MongoStore from "connect-mongo";
const app=express();
dotenv.config();
app.use(express.json());
app.use(cors({
    origin: "https://captcha-n5hz.onrender.com",
    credentials: true
  }));
// app.use(cors());
  app.use(session({
    secret: "yourSecret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
      }),
    cookie: { secure: true ,
        sameSite: 'None' 
    } 

  }));


app.use("/api", routes);

app.listen(process.env.PORT, ()=>{
    console.log("Server running");
});
// app.listen(4000, ()=>{
//     console.log("Server running");
// });