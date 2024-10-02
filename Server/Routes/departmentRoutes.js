import express from 'express';
import departmentController from '../controllers/departmentController.js';
const route=express.Router();

route.post('/add',departmentController.create);
route.get('/',departmentController.getAll);
route.get('/:id',departmentController.get);
route.post('/add',)
route.put('/:id',departmentController.update);
route.delete('/:id',departmentController.remove);

export default route;