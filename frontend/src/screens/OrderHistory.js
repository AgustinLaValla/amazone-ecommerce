import React from 'react'
import LoadingSpinner from '../components/LoadingSpinner';
import MessageAlert from '../components/MessageAlert';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderList } from '../actions/orderActions';

export default function OrderHistory() {
    const { orders, loading, error } = useSelector(state => state.orderList);
    const history = useHistory();

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getOrderList());
    }, [dispatch])

    return (
        <div>
            <h1>Order History</h1>
            {loading
                ? <LoadingSpinner /> :
                error ? <MessageAlert variant="danger">{error}</MessageAlert>
                    :
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map(order =>
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>
                                            {dayjs(order.createdAt).format('YYYY/MM/DD HH:mm')}
                                        </td>
                                        <td>{order.totalPrice.toFixed(2)}</td>
                                        <td>{order.isPaid ? dayjs(order.paidAt).format('YYYY/MM/DD HH:mm') : 'Not paid'}</td>
                                        <td>{order.isDelivered ? dayjs(order.deliveredAt).format('YYYY/MM/DD HH:mm') : ''}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="small"
                                                onClick={() => history.push(`/order/${order._id}`)}
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
            }
        </div>
    )
}
