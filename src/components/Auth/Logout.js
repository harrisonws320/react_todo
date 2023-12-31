import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Profile from './Profile'

export default function Logout() {
    //our consts are from AuthContext.js
    const { logout } = useAuth()
    const navigate = useNavigate()

    function handleAuth() {
        logout()
        navigate('/')
    }

    return (
      <div className='logout text-center p-3 bg-dark text-white'>
        {/* BELOW we render Profile from Profile.js */}
        <Profile />
        <button className="btn btn-danger text-white" onClick={() => handleAuth()}>
            Logout
        </button> 
      </div>

  )
}
