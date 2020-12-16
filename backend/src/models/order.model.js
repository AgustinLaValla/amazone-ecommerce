import { Schema, model } from 'mongoose';


const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number },
            imageUrl: { type: String, required: true },
            price: { type: Number, required: true, default: 0 },
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        }
    ],
    shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String
    }
}, { timestamps: true });


export default model('Order', orderSchema);