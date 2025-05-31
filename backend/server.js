import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app=express();
dotenv.config();
app.use(express.json());

// app.get();

app.listen(process.env.PORT, ()=>{
    console.log("Server running");
});