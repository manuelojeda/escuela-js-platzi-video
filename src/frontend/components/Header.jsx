/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutRequest } from '../actions';
import '../assets/styles/components/Header.scss';
import Logo from '../assets/images/logo-platzi-video-BW2.png';
import ProfilePic from '../assets/images/user-icon.png';
import gravatar from '../utils/gravatar';

const Header = (props) => {
  const { user } = props;

  const hasUser = Object.keys(user).length > 0;

  const handleLogout = () => {
    document.cookie = 'email='
    document.cookie = 'name='
    document.cookie = 'id='
    document.cookie = 'token='
    props.logoutRequest({});
    window.location.href = '/login'
  };

  return (
    <header className='header'>
      <Link to='/'>
        <img className='header__img' src={Logo} alt='Platzi Video' />
      </Link>
      <div className='header__menu'>
        <div className='header__menu--profile'>
          {hasUser ?
            <img src={gravatar(user.email)} alt={user.email} /> :
            <img src={ProfilePic} alt='User Icon' />}
          <p>{user.email}</p>
        </div>
        <ul>
          {hasUser ?
            <li><a href='/'>Cuenta</a></li> :
            null}

          {hasUser ?
            <li><a href='#logout' onClick={handleLogout}>Cerrar Sesión</a></li> :
            <li>
              <Link to='/login'>
                Iniciar Sesión
              </Link>
            </li>}

        </ul>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
