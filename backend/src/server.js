import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productRoutes from './routes/products.routes';
import usersRoutes from './routes/user.routes';
import orderRoutes from './routes/order.routes';
import { config } from 'dotenv';
import { PAYPAL_CLIENT_ID } from './config';

config();

//Create Server
export const server = express();

//Settings
server.set('port', process.env.PORT || 4000);

//Middlewares
server.use(cors({ origin: true, credentials: true }));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan("dev"))

//Routes
server.use('/api/products', productRoutes);
server.use('/api/users', usersRoutes);
server.use('/api/orders', orderRoutes);
server.get('/api/config/paypal', (req, res) => res.send(PAYPAL_CLIENT_ID));