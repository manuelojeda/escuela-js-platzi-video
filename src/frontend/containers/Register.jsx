/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerRequest } from '../actions';
import '../assets/styles/components/Register.scss';
import HeaderLogin from '../components/HeaderLogin';
import Footer from '../components/Footer';

const Register = (props) => {
  const [form, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.registerRequest(form);
    props.history.push('/');
  };

  return (
    <div>
      <HeaderLogin />
      <section className='register'>
        <section className='register__container'>
          <h2>Regístrate</h2>
          <form className='register__container--form' onSubmit={handleSubmit}>
            <input
              className='input'
              type='text'
              placeholder='Nombre'
              name='name'
              onChange={handleInput}
            />
            <input
              className='input'
              type='text'
              placeholder='Correo'
              name='email'
              onChange={handleInput}
            />
            <input
              className='input'
              type='password'
              placeholder='Contraseña'
              name='password'
              onChange={handleInput}
            />
            <button className='button' type='submit'>Registrarme</button>
          </form>
          <Link to='/login'>
            Iniciar Sesión
          </Link>
        </section>
      </section>
      <Footer />
    </div>
  );
};

const mapDispatchToProps = {
  registerRequest,
};

export default connect(null, mapDispatchToProps)(Register);
