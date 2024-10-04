import express from "express";
import roomTypeController from "../controllers/roomTypeController.js";

const route=express.Router();

route.post('/add',roomTypeController.creat);
route.get('/',roomTypeController.getAll);
route.put('/:id',roomTypeController.update);
route.delete('/:id',roomTypeController.remove);
export default route;