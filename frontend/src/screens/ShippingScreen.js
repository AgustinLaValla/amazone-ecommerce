import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import { CheckoutSteps } from '../components/CheckoutSteps';

export const ShippingScreen = (props) => {

    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [postalCode, setPostalCode] = useState(null);
    const [country, setCountry] = useState(null);
    const [fullName, setFullName] = useState('');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({ address, city, postalCode, country, fullName }));
        props.history.push('/payment');
    };


    return (
        <div>
            <CheckoutSteps step1 step2 />
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2 className="text-center">Shipping</h2>
                        </li>
                        <li>
                            <label htmlFor="address">Fullname</label>
                            <input type="text" value={fullName} id="fullname" onChange={(e) => setFullName(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="address">Dirección</label>
                            <input type="text" value={address} id="address" onChange={(e) => setAddress(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="city">Ciudad</label>
                            <input type="text" value={city} id="city" onChange={(e) => setCity(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="postalCode">Código postal</label>
                            <input type="text" value={postalCode} id="postalCode" onChange={(e) => setPostalCode(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="country">País</label>
                            <input type="text" value={country} id="country" onChange={(e) => setCountry(e.target.value)} />
                        </li>
                        <li>
                            <button type="submit" className="button primary">Continuar</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
}
