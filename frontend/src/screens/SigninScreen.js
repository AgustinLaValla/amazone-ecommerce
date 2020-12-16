import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userAction';
import MessageAlert from '../components/MessageAlert';


export const SigninScreen = (props) => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const { userInfo, loading, error } = useSelector(state => state.userSignin);

    const dispatch = useDispatch();

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    };

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
            console.log(userInfo);
        }
    }, [userInfo])

    return (
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2 className="text-center">Ingresar</h2>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <MessageAlert variant="danger">{error}</MessageAlert>}
                    </li>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input type="email" value={email} id="email" onChange={(e) => setEmail(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </li>
                    <li>
                        <button type="submit" className="button primary">Ingresar</button>
                    </li>
                    <li>
                        <Link to={redirect === '/' ? '/register' : `register?redirect=${redirect}`} className="button text-center secondary">Click aqui para crear un cuenta</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}
