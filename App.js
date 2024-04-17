import express from 'express';
import session from 'express-session';;
import mongoose from 'mongoose';
import UserRoutes from './Users/routes.js';
import Hello from './Hello.js';
import Lab5 from './Lab5.js';
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import cors from "cors";
import AssignmentRoutes from './Kanbas/assignments/routes.js';
import "dotenv/config";

mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
// const express = require('express')
const app = express();

// app.use(cors({
//     credentials: true,
//     origin: [process.env.FRONTEND_URL, "http://localhost:3000"]
// }));
// app.use(cors());
app.use(
    cors({
      // origin: "http://localhost:3000",
      credentials: true,
      origin: process.env.FRONTEND_URL
    })
);
// app.get('/hello', (req, res) => {res.send('Life is good!')})
// app.get('/', (req,res) => {res.send('Welcome to Full Stack Development!')})
app.use(express.json());
// app.use(
//   session({
//     secret:"my secret",
//     resave:false,
//     saveUninitialized: false,
//   })
// );
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
UserRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000)