import express from 'express';
import roomController from '../controllers/roomController.js';

const route=express.Router();

route.post('/add',roomController.add);
route.get('/',roomController.getAll);
route.get('/:id',roomController.get);
route.put('/:id',roomController.update);
route.delete('/:id',roomController.remove);
export default route;