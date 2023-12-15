import React from 'react'
//step 1:
import { useAuth } from '../contexts/AuthContext'
import Logout from './Auth/Logout'

export default function Footer() {
  //step 2:
  const { currentUser } = useAuth()
//step 3:
  return (
    <>
    { currentUser &&
    <Logout />
    }
    <footer className='text-center text-white bg-danger p-4'>
        <strong>&copy; {new Date().getFullYear()} Harrison Smith, All Rights Reserved.</strong>
    </footer>
    </>
  )
}
