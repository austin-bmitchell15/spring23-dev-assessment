import express from 'express';
import { getHealth, createUser, createAnimal, createTraining, getUsers, getAnimals, getTrainings, loginUser, verifyUser } from '../controllers/controllers.js'
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/health', auth, getHealth);
router.post('/user',  auth, createUser)
router.post('/animal', auth, createAnimal)
router.post('/training', auth, createTraining)
router.post('/user/login', loginUser);
router.post('/user/verify', verifyUser);

//admin
router.get('/admin/users', auth, getUsers);
router.get('/admin/animals', auth, getAnimals);
router.get('/admin/training', auth, getTrainings);




export default router;
