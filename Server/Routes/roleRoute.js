
import express from 'express';
import roleController from '../controllers/roleController.js';
const route=express.Router();

route.post('/add',roleController.create);
route.get('/',roleController.getAll);
route.post('/add',)
route.put('/:id',roleController.update);
route.delete('/:id',roleController.remove);

export default route;