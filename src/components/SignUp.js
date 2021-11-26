import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Spinner from '../spinner.svg';

import { useAuth } from '../context/AuthContext';


export const SignUp = () => {

  //Declaracion de variables necesarias
  const { signup } = useAuth();

  const [error, setError] = useState('');
  const history = useHistory();

  const [correo, setCorreo] = useState('');
  const [contraseña, setcontraseña] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  //Recuperacion de los valores input del formulario
  const nuevoCorreo = e => setCorreo(e.target.value);
  const nuevaContraseña = e => setcontraseña(e.target.value);
  const nuevaContraseñaConfirmacion = e => setConfirmPassword(e.target.value);

  const submitRegistro = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (contraseña !== confirmPassword) {
      setError('Passwords do not match');
      setTimeout(() => setError(''), 1500);
    } else {
      try {
        await signup(correo, contraseña);
        history.push('/');
      } catch (error) {
        setError('Error en los datos introducidos');
        setTimeout(() => setError(''), 1500);
      }
    }
    setLoading(false);
  }

  return (
    <div className='card'>
      <div className='card-header' >
        {error && <p className='error' >{error}</p>}
        <h1>Registro</h1>
      </div>
      <div className='card-body'>
        <form onSubmit={submitRegistro} >
          <input type='email' placeholder='correo' onChange={nuevoCorreo} />
          <input type='password' placeholder='Contraseña' onChange={nuevaContraseña} />
          <input type='password' placeholder='Confirmar Contraseña' onChange={nuevaContraseñaConfirmacion} />
          <input type='submit' value='Confirmar Registro' />
        </form>
        {loading && <img src={Spinner} alt='Loading' />}
        <p>¿ya tienes una cuenta? <Link to='/login'>Volver a Login</Link> </p>
      </div>

    </div>
  )
}
