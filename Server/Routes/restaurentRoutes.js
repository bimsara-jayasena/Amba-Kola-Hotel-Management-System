import express from 'express';
import restaurentController from '../controllers/restaurentController.js';
const router=express.Router();

router.post('/add',restaurentController.create);
router.get('/',restaurentController.getAll);
router.get('/:id',restaurentController.get);
router.put('/:id',restaurentController.update);
router.delete('/:id',restaurentController.remove);

export default router