import express from "express";
import { Router } from "express";
import imgCaptcha from "./Controllers/imgCaptcha.js";
import verifyCaptcha from "./Controllers/verifyCaptcha.js";
const routes=express.Router();
routes.get("/captcha",imgCaptcha);
routes.post("/verify-captcha",verifyCaptcha);
export default routes;