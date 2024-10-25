import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; //crud operation on user cookies


const app=express();


 app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
 }))

 app.use(express.json({limit:"16kb"})); //set limit to incomming json data to avoid server crashes
app.use(express.urlencoded({extended:true,limit:"16kb"})); //encode url extended allow nested object
app.use(express.static("public"));
app.use(cookieParser());

import contactRouter from "./routes/contact.route.js";
import placementCardRouter from './routes/placement_card.route.js';
import courseRouter from './routes/course.route.js';
import popupRouter from './routes/popup_image.route.js';

app.use('/api/v1/contacts',contactRouter);
app.use('/api/v1/placements',placementCardRouter);
app.use('/api/v1/courses',courseRouter);
app.use('/api/v1/popups',popupRouter);

export default app;

