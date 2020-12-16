import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createProduct, getProductList, updateProduct, deleteProduct } from '../actions/productActions';


export const CreateProductScreen = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [_id, setId] = useState(null);
    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [imageUrl, setImage] = useState(null);
    const [brand, setBrand] = useState(null);
    const [category, setCategory] = useState(null);
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState(null);


    const { products, loading, error, successSave } = useSelector(state => state.productList);
    const dispatch = useDispatch();

    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id)
        setName(product.name);
        setBrand(product.brand);
        setPrice(product.price);
        setImage(product.imageUrl);
        setCategory(product.category);
        setDescription(product.description);
        setCountInStock(product.countInStock);
    }

    const closeModal = () => {
        setModalVisible(false);
        setId(null);
    }

    const submitHandler = (ev) => {
        ev.preventDefault();
        if (!_id) {
            dispatch(createProduct({ name, price, imageUrl, brand, category, countInStock, description }));
        } else {
            dispatch(updateProduct({_id, name, price, imageUrl, brand, category, countInStock, description}));
        }
    }

    useEffect(() => dispatch(getProductList()), []);

    useEffect(() =>  {
        if(successSave) {
            setModalVisible(false);
        }
    }, [successSave])

    return (
        <div className="content content-margined">
            <div className="product-header">
                <h3>Product</h3>
                <button onClick={() => openModal({})} className="button primary">Create Product</button>
            </div>

            {modalVisible && <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2 className="text-center">Create product</h2>
                        </li>
                        <li>
                            {loading && <div>Loading...</div>}
                            {error && <div>error...</div>}
                        </li>
                        <li>
                            <label htmlFor="name">Nombre</label>
                            <input type="text" value={name} id="name" onChange={(e) => setName(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="price">Precio</label>
                            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="image">Imagen</label>
                            <input type="text" id="image" value={imageUrl} onChange={(e) => setImage(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="brand">Marca</label>
                            <input type="text" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="category">Categoría</label>
                            <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="countInStock">Stock</label>
                            <input type="text" id="countInStock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="description">Descripción</label>
                            <textarea type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </li>
                        <li>
                            <button type="submit" className="button primary">{!_id ? 'Create' : 'Edit'}</button>
                            <br />
                            <button onClick={() => closeModal()} type="submit" className="button secondary">Back</button>
                        </li>
                    </ul>
                </form>
            </div>}
            <div className="product-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Categría</th>
                            <th>Precio</th>
                            <th>Marca</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product =>
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <button onClick={() => openModal(product)} className="button">Edit</button> {' '}
                                    <button onClick={() => dispatch(deleteProduct(product._id))} className="button">Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
