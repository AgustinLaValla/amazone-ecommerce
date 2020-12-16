import { Router } from 'express';
import { createAdmin, signin, register, getUser, updateUser } from '../controllers/users.controllers';
import { isAuth } from '../helpers/util.helper';

const router = Router();

router.get('/create-admin', createAdmin);

router.get('/:id', isAuth, getUser);

router.post('/register', register);

router.post('/signin', signin);

router.put('/update/:id', updateUser);

export default router;