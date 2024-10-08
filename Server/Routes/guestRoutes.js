import express from 'express';
import guestController from '../controllers/guestController.js';
const router=express.Router();

router.post('/add',guestController.create);
router.get('/',guestController.getAll);
router.get('/:id',guestController.get);


export default router