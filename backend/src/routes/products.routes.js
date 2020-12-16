import { Router } from 'express';
import { getProductList, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller';
import { isAdmin, isAuth } from '../helpers/util.helper';

const router = Router();

router.get('/', getProductList);

router.get('/:id', getProduct);

router.post('/', isAuth, isAdmin, createProduct);

router.put('/:id', isAuth, isAdmin, updateProduct);

router.delete('/:id', isAuth, isAdmin, deleteProduct);

export default router;