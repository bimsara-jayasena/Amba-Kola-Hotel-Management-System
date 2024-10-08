import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import employeeRoute from './Routes/employeeRoutes.js';
import departmentRoute from './Routes/departmentRoutes.js';
import roleRoute from './Routes/roleRoute.js';
import roomRoute from './Routes/roomRoute.js';
import roomStatusRoute from './Routes/roomStatusRoutes.js';
import roomTypeRoute from './Routes/roomTypeRoute.js';
import guestRoutes from './Routes/guestRoutes.js';
import restaurenRoutes from './Routes/restaurentRoutes.js';
import { configDotenv } from 'dotenv';

const app=express();
const PORT=process.env.DB_PORT;
configDotenv();

app.use(bodyParser.json());
app.use(cors({
    origin:["http://localhost:3000","http://localhost:3001"],
    methods:['GET','POST','PUT','DELETE']
}))
app.use('/employees',employeeRoute);
app.use('/departments',departmentRoute);
app.use('/roles',roleRoute);
app.use('/rooms',roomRoute);
app.use('/roomStatus',roomStatusRoute);
app.use('/roomType',roomTypeRoute);
app.use('/guest',guestRoutes);
app.use('/restaurent',restaurenRoutes);
app.listen(PORT,()=>{
    console.log('connection listen to port 5555')
});
