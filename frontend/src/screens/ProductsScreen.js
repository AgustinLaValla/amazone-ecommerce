import React from 'react'
import '../index.css'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'

export const ProductsScreen = ({ product }) => {
    return (
        <li>
            {product &&
                <div className="product card">
                    <Link to={`product/${product._id}`}>
                        <img className="product-image" src={product.imageUrl} alt="product" />
                    </Link>
                    <div className="product__infoContainer">
                        <div className="product-name">
                            <Link to={`product/${product._id}`}>{product.name}</Link>
                        </div>
                        <div className="product-brand">{product.brand}</div>
                        <Rating rating={product.rating} numReviews={product.numReviews}/>
                        <div className="product-price">${product.price}</div>
                    </div>
                </div>
            }
        </li>

    )
}
