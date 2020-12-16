import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userAction';


export const RegisterScreen = (props) => {

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [rePassword, setRePassword] = useState(null);

    const { userInfo, loading, error } = useSelector(state => state.userSignin);

    const dispatch = useDispatch();

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name ,email, password));
    };

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [userInfo])

    return (
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2 className="text-center">Registrarse</h2>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>error...</div>}
                    </li>
                    <li>
                        <label htmlFor="name">Nombre de usuario</label>
                        <input type="text" value={name} id="name" onChange={(e) => setName(e.target.value)} />
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
                        <label htmlFor="rePassword">Confirmar contraseña</label>
                        <input type="password" id="rePassword" value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
                    </li>
                    <li>
                        <button type="submit" className="button primary">Ingresar</button>
                    </li>
                    <li>
                        <Link to={redirect === '/' ? 'signin' : `signin?redirect=${redirect}`} className="button text-center secondary">Click aqui para entrar con tu cuenta</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}
