import express from 'express';
import employeController from '../controllers/employeController.js';
const router=express.Router();

router.post('/add',employeController.create);
router.get('/',employeController.getAll);
router.get('/:id',employeController.get);
router.put('/:id',employeController.update);
router.delete('/:id',employeController.remove);

export default router