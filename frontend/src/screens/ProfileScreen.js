import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserDetails } from '../actions/userAction';
import LoadingSpinner from '../components/LoadingSpinner';
import MessageAlert from '../components/MessageAlert';
import { USER_DETAILS_CLEAR_ERRORS, USER_DETAILS_CLEAR_MESSAGE } from '../constanst/userConstants';
import store from '../store'

export default function ProfileScreen() {

    const { userInfo } = useSelector(state => state.userSignin);
    const user = useSelector(state => state.user);
    const { userDetails, loading, error, message } = user;
    const dispatch = useDispatch()

    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const submitHandler = (ev) => {
        ev.preventDefault();
        dispatch(updateUserDetails({ ...userDetails, name, password, confirmPassword }));
    }

    React.useEffect(() => {
        dispatch(getUserDetails(userInfo._id))
    }, [dispatch, userInfo._id])

    React.useEffect(() => {
        if (userDetails?.name) {
            setName(userDetails.name)
        }
    }, [userDetails])

    React.useEffect(() => {
        if (user?.error) {
            setTimeout(() => dispatch({ type: USER_DETAILS_CLEAR_ERRORS }), 3000);
        } else if (user?.message) {
            setTimeout(() => dispatch({ type: USER_DETAILS_CLEAR_MESSAGE }), 3000);
        }
    }, [user])

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                {
                    loading ? <LoadingSpinner />
                        : error
                            ? <MessageAlert variant="danger">{error}</MessageAlert>
                            : userDetails &&
                            <ul className="form-container">
                                {message && <MessageAlert variant="success">{message}</MessageAlert>}
                                <li>
                                    <h1 className="text-center">User Profile</h1>
                                </li>
                                <li>
                                    <label htmlFor="name">Name</label>
                                    <input id="name" type="text" placeholder="Enter name" value={name} onChange={(ev) => setName(ev.target.value)} />
                                </li>
                                <li>
                                    <label htmlFor="email">Email</label>
                                    <input id="email" type="email" placeholder="Enter email" value={userDetails.email} />
                                </li>
                                <li>
                                    <label htmlFor="password">Password</label>
                                    <input id="password" type="password" placeholder="Enter passwowrd" value={password} onChange={ev => setPassword(ev.target.value)} />
                                </li>
                                <li>
                                    <label htmlFor="confirm_password">Password</label>
                                    <input id="confirm_password" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={ev => setConfirmPassword(ev.target.value)} />
                                </li>
                                <li>
                                    <button className="button primary block" type="submit">Update</button>
                                </li>
                            </ul>

                }
            </form>
        </div>
    )
}
