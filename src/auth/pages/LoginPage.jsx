import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const LoginPage = () => {

  const {login} = useContext( AuthContext )
  
  const navigate = useNavigate()
  const onLogin = () => {

    // Cuando le damos click al loguin navegaremos al valor guardado en el local stotage
    // Si no hay valor guardado refresamos al / que seria marvel
    const lastPath = localStorage.getItem('lastPath') || '/';

    login('Alejandro Rivera')

    navigate(lastPath, {
      replace: true, //indica que la nueva ruta (lastPath) reemplazará a la actual en el historial del navegador
    })
  }


  return (
    <div className='container'>

      <div className='contarine mt-5'>
        <h1>Login</h1>
        <hr />
        <button
          className='btn btn-primary'
          onClick={onLogin}
        >
          Login
        </button>
      </div>
    </div>
  )
}
