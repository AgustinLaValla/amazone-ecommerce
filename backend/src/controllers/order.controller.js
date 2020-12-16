import Order from '../models/order.model';
import { throwErrorMessage } from '../helpers/util.helper';

export const getOrderList = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        return res.json({ ok: true, orders });
    } catch (error) {
        return throwErrorMessage(error, res);
    };
};

export const getOrder = async (req, res) => {
    const { id } = req.params;

    try {

        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ ok: false, message: 'Order not found' });

        return res.json({ ok: true, order });

    } catch (error) {
        throwErrorMessage(error, res);
    }
}

export const createOrder = async (req, res) => {
    const { shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice, orderItems } = req.body;

    if (!orderItems.length) return res.status(400).json({ ok: false, message: 'Cart is empty' });

    try {
        const newOrder = await Order.create({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        });
        return res.status(201).json({ ok: true, message: 'Order successfully created', order: newOrder })
    } catch (error) {
        return throwErrorMessage(error, res);
    }
}


export const payOrder = async (req, res) => {
    const { orderId } = req.params;
    const { id, status, update_time: update_time, email_address } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ ok: false, message: 'Order not found' });

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = { id, status, update_time, email_address };

        const orderUpdated = await order.save();

        return res.json({ ok: true, message: 'Order Paid', order: orderUpdated });

    } catch (error) {
        return throwErrorMessage(error, res);
    }

}