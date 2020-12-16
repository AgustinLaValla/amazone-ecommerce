import React from 'react';
import { Route, Link, Redirect, Switch, useHistory } from 'react-router-dom'
import './App.css';
import { HomeScreen } from './screens/HomeScreen';
import { ProductScreen } from './screens/ProductScreen';
import { CartScreen } from './screens/CartScreen';
import { SigninScreen } from './screens/SigninScreen';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterScreen } from './screens/RegisterScreen';
import { CreateProductScreen } from './screens/CreateProductScreen';
import { ShippingScreen } from './screens/ShippingScreen';
import { PaymentScreen } from './screens/PaymentScreen';
import { PlaceorderScreen } from './screens/PlaceorderScreen';
import { OrderScreen } from './screens/OrderScreen';
import OrderHistory from './screens/OrderHistory';
import Cookie from 'js-cookie';
import { SIGN_OUT } from './constanst/userConstants';
import ProfileScreen from './screens/ProfileScreen';

function App() {

  const { userInfo } = useSelector(state => state.userSignin);
  const { cartItems } = useSelector(state => state.cart)
  const dispatch = useDispatch();
  const history = useHistory();

  const openMenu = () => document.querySelector('.sidebar').classList.add('open');
  const closeMenu = () => document.querySelector('.sidebar').classList.remove('open');

  const signoutHandler = () => {
    dispatch({ type: SIGN_OUT });
    Cookie.remove('user-info');
    history.push('/signin');
  }

  return (

    <div className="grid-container">
      {/* -- --------------------------------- HEADER --------------------------------- --- */}
      <header className="header">

        <div className="brand">
          <button onClick={openMenu}>&#9776;</button>
          <Link to='/'>Amazone</Link>
        </div>

        <div>
          <Link to="/cart" className="header-links" >
            Cart
          {cartItems.length && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>

          {userInfo
            ?
            <div className="dropdown">
              <Link to="#" className="header-links">
                {userInfo.name} <i className="fa fa-caret-down">{' '}</i>
              </Link>
              <ul className="dropdown-content">

                <li style={{ padding: '1rem 0' }}>
                  <Link to="/profile" className="header-links">
                    User profile
                  </Link>
                </li>

                <li style={{ padding: '1rem 0' }}>
                  <Link to="/orderhistory" className="header-links">
                    Order History
                  </Link>
                </li>

                <li style={{ padding: '1rem 0' }}>
                  <Link to="#signout" onClick={signoutHandler} className="header-links">
                    Sign Out
                  </Link>
                </li>

              </ul>
            </div>
            :
            <Link to="/signin" className="header-links">Sign In</Link>
          }

        </div>


      </header>

      {/*  ---------------------------------SIDEBAR -------------------------------- -- */}

      <aside className="sidebar">
        <h3>Categorías</h3>
        <button onClick={closeMenu} className="sidebar-close-button">X</button>
        <ul>
          <li>
            <Link to='/'>Pantalones</Link>
          </li>
          <li>
            <Link to='/'>Camisas</Link>
          </li>
        </ul>
      </aside>

      {/* -- --------------------------------- MAIN --------------------------------- --- */}

      <main className="main">
        <div className="content">
          <Switch>
            <Route exact path='/' component={HomeScreen} />
            <Route exact path='/products' component={CreateProductScreen} />
            <Route exact path="/product/:id" component={ProductScreen} />
            <Route exact path='/cart/:id?' component={CartScreen} />
            <Route exact path='/signin' component={SigninScreen} />
            <Route exact path='/register' component={RegisterScreen} />
            <Route exact path='/shipping' component={ShippingScreen} />
            <Route exact path='/payment' component={PaymentScreen} />
            <Route exact path='/placeorder' component={PlaceorderScreen} />
            <Route extact path='/order/:id' component={OrderScreen} />
            <Route exact path="/orderhistory" component={OrderHistory}/>
            <Route exact path="/profile" component={ProfileScreen}/>
            <Redirect to='/' />
          </Switch>
        </div>
      </main>

      {/* -- --------------------------------- FOOTER ------------------------------ --- */}

      <footer className="footer">Todos los derechos reservados</footer>

    </div >

  );
}

export default App;
