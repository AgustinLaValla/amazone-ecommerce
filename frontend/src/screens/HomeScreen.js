import React, { useState } from 'react';
import '../index.css';
import { ProductsScreen } from './ProductsScreen';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from '../actions/productActions';

export const HomeScreen = () => {


    const {products, loading, error} = useSelector(state => state.productList);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductList())

        return () => { }
    }, []);

    return (
        loading ? <div>Loading...</div> :
        error ? <div>{error}</div> : 
        
        <ul className="products">
            {products?.map((product, index) => (
                <ProductsScreen key={product._id} {...{ product }} />
            )
            )}
        </ul>
    )
}
