import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import Spinner from '../spinner.svg';


export const Login = () => {
  //Variables y estados para la conexión
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [correo, setEmail] = useState('');
  const [contraseña, setPassword] = useState('');

  //Declaracion y recuperacion de los inputs y sus valores
  const inputCorreo = e => setEmail(e.target.value);
  const inputContraseña = e => setPassword(e.target.value);

  //Submit del formulario para iniciar sesion capturando el error
  const formularioSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(correo, contraseña);
      setLoading(false);
      history.push('/');
    } catch (error) {
      setLoading(false);
      setError('Datos de inicio de sesión incorrectos');
      setTimeout(() => setError(''), 1500);
    }
  }

  //Vista formulario
  return (
    <div className='card'>
      <div className='card-header' >
        {error && <p className='error' >{error}</p>}
        <h1>Log-In</h1>
      </div>
      <div className='card-body'>
        <form onSubmit={formularioSubmit}>
          <input type='email' placeholder='Email' onChange={inputCorreo} />
          <input type='password' placeholder='Contraseña' onChange={inputContraseña} />
          <input type='submit' value='Log In' />
        </form>
        {loading && <img src={Spinner} alt='Loading' />}
        <p>¿N Tienes una cuenta? <Link to='/signup'>Regístrate</Link> </p>
      </div>

    </div>
  )
}
