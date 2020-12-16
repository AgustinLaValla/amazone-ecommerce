import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from 'react'
import axios from '../axios/axios'
import LoadingSpinner from '../components/LoadingSpinner';
import { PayPalButton } from 'react-paypal-button-v2';

const PaypalButton = ({order, onSuccess}) => {

    const [sdkReady, setSdkReady] = useState(false);

    useEffect(() => {

        const addPaypalSdk = async () => {
            const { data } = await axios.get('/api/config/paypal');
            const clientId = data;
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true;

            script.onload = () => setSdkReady(true);

            document.body.appendChild(script);

        }

        if (!order?.isPaid) {
            if (!window.paypal) {
                addPaypalSdk();
            } else {
                setSdkReady(true)
            }
        }

        return () => { }
    }, [order]);

    if (!sdkReady) {
        return <div>loading...</div>
    }


    return (
        !sdkReady ?
            <LoadingSpinner />
            :
            <PayPalButton amount={order.totalPrice} onSuccess={onSuccess} />

    )
}


export default PaypalButton;