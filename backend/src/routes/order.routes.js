import { Router } from 'express';
import { isAuth } from '../helpers/util.helper';
import { getOrderList, createOrder, getOrder, payOrder } from '../controllers/order.controller';

const router = Router();

router.get('/my-list', isAuth, getOrderList);

router.get('/:id', isAuth, getOrder);

router.post('/', isAuth, createOrder);

router.put('/:orderId/pay', isAuth, payOrder);

export default router;