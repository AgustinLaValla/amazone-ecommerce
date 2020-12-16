import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../index.css';
import { useSelector, useDispatch } from 'react-redux';
import { productDetails } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';

export const ProductScreen = (props) => {

    const { id } = useParams();

    const [qty, setQty] = useState(0);

    const { product, loading, error } = useSelector(state => state.productDetails);
    const dispatch = useDispatch()

    const handleAddToCart = () => {
        dispatch(addToCart(id, qty))
        props.history.push(`/cart/${id}?qty=${qty}`);
    };


    useEffect(() => {
        dispatch(productDetails(id))
        return () => { }
    }, [id])

    useEffect(() => {
        if (product && product.countInStock > 0) {
            setQty(1)
        }

    }, [product])

    return (
        <div>

            <div>
                <div className="back-to-result">
                    <Link to='/'>Regresar</Link>
                </div>

                {loading
                    ? <div>Loading...</div>
                    : error ? <div>{error.message}</div>
                        : product &&

                        <div className="details">

                            <div className="details-image">
                                <img src={product.imageUrl} alt="product" />
                            </div>

                            <div className="details-info">
                                <ul>
                                    <li>
                                        <h4>{product.name}</h4>
                                    </li>
                                    <li>{product.rating} Starts ({product.numReviews} Reviews)</li>
                                    <li>
                                        <b>Precio: ${product.price}</b>
                                    </li>
                                    <li>
                                        Descripción:
                                    <div>{product.description}</div>
                                    </li>
                                </ul>
                            </div>

                            <div className="details-action">
                                <ul>
                                    <li>
                                        Precio: ${product.price}
                                    </li>
                                    <li>
                                        Stock: {product.countInStock > 0 ? 'Disponible' : 'Agotado'}
                                    </li>
                                    <li>
                                        Cantidad
                                    <select value={qty} onChange={e => setQty(e.target.value)}>
                                            {[...Array(product.countInStock).keys()].map(x =>
                                                <option value={(x + 1)}>{x + 1}</option>
                                            )}
                                        </select>
                                    </li>
                                    <li>
                                        {product.countInStock > 0 &&
                                            <button onClick={handleAddToCart} className="button primary">Agregar al carrito</button>
                                        }
                                    </li>
                                </ul>
                            </div>

                        </div>
                }




            </div>
        </div>
    )
}
