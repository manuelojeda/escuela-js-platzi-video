/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable indent */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../actions';
import '../assets/styles/components/Login.scss';
import GoogleIcon from '../assets/images/google-icon.png';
import FacebookIcon from '../assets/images/facebook-icon.png';
import HeaderLogin from '../components/HeaderLogin';
import Footer from '../components/Footer';

const Login = (props) => {
  const [form, setValues] = useState({
    email: '',
  });

  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.loginUser(form, '/');
  };

  const handleFacebookLogin = () => {
    props.loginUserFacebook('/');
  }

  return (
    <d>
      <HeaderLogin />
      <section className='login'>
        <section className='login__container'>
          <h2>Inicia sesión</h2>
          <form className='login__container--form' onSubmit={handleSubmit}>
            <input
              className='inputLogin'
              type='text'
              placeholder='Correo'
              name='email'
              onChange={handleInput}
              required
            />
            <input
              className='inputLogin'
              type='password'
              placeholder='Contraseña'
              name='password'
              onChange={handleInput}
              required
            />
            <button
              className='button'
              type='submit'
            >
              Iniciar sesión
            </button>
            <div className='login__container--remember-me'>
              <label>
                <input type='checkbox' id='cbox1' value='first_checkbox' />
                    Recuérdame
              </label>
              <a href='/'>Olvidé mi contraseña</a>
            </div>
          </form>
          <section className='login__container--social-media'>
            <a href="/auth/google-oauth">
                <img src={GoogleIcon} />
                Inicia sesión con Google
            </a>
            <a href="/auth/facebook">
                <img src={FacebookIcon} />
                Inicia sesión con Facebook
            </a>
          </section>
          <p className='login__container--register' target="_blank">
            No tienes ninguna cuenta
            <br />
            <Link to='/register'>
              Regístrate
            </Link>
          </p>
        </section>
      </section>
      <Footer />
    </d>
  );
};

const mapDispatchToProps = {
  loginUser,
  
};

export default connect(null, mapDispatchToProps)(Login);
