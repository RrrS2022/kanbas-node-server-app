import express from 'express';
import Hello from './Hello.js';
import Lab5 from './Lab5.js';
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";

import cors from "cors";
import AssignmentRoutes from './Kanbas/assignments/routes.js';

// const express = require('express')
const app = express();
app.use(cors());
// app.get('/hello', (req, res) => {res.send('Life is good!')})
// app.get('/', (req,res) => {res.send('Welcome to Full Stack Development!')})
app.use(express.json());
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000)