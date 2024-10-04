import express from "express";
import roomStatusController from "../controllers/roomStatusController.js";

const route=express.Router();

route.post('/add',roomStatusController.creat);
route.get('/',roomStatusController.getAll);
route.put('/:id',roomStatusController.update);

export default route;