import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/HeaderLogin.scss';
import Logo from '../assets/images/logo-platzi-video-BW2.png';

const HeaderLogin = () => (
  <header className='headerLogin'>
    <Link to='/'>
      <img className='header__img' src={Logo} alt='Platzi Video' />
    </Link>
  </header>
);

export default HeaderLogin;
