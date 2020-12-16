import Product from '../models/product.model';
import { throwErrorMessage } from '../helpers/util.helper';

export const getProductList = async (req, res) => {
    try {
        const products = await Product.find();
        return res.json({ ok: true, products });
    } catch (error) {
        return throwErrorMessage(error, res);
    }
};


export const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ ok: false, message: 'Product not found' });

        return res.json({ ok: true, product });

    } catch (error) {
        return throwErrorMessage(error, res);
    }

}


export const createProduct = async (req, res) => {

    try {
        const product = await Product.create({ ...req.body });
        return res.json({ ok: true, message: 'Product successfully created', product });
    } catch (error) {
        return throwErrorMessage();
    }

}

export const updateProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const exists = await Product.findById(id);
        if (!exists) return res.status(404).json({ ok: false, message: 'Product not found' });

        const product = await Product.findByIdAndUpdate(id, { ...req.body }, { new: true });
        return res.json({ ok: true, message: 'Product successfully updated', product });
    } catch (error) {
        return throwErrorMessage(error, res);
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const exists = await Product.findById(id);
        if (!exists) return res.status(404).json({ ok: false, message: 'Product not found' });

        const product = await Product.findByIdAndDelete(id);

        return res.json({ ok: true, message: 'Product successfully deleted', product });

    } catch (error) {
        throwErrorMessage(error, res);
    }



}