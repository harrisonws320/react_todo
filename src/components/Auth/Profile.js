import React from 'react'
// we need to reference the Auth.css file (we made that style sheet to modify the image)
// import './Auth.css'
import { useAuth } from '../../contexts/AuthContext'
import './Profile.css'

export default function Profile() {
  const { currentUser } = useAuth()

  return (
    <span className="profile p-2">
        {/* the below line of code before the : is for those who have no User Name */}
        {/* and .split is for those whose user name is their first and last name */}
      Hello, {!currentUser.displayName ? currentUser.email : currentUser.displayName.split(' ')[0]}!  
      {/* below is how we generate our Github profile pic when we sign in */}
      <img src={currentUser.photoURL} alt={currentUser.email} />
    </span>
  )
}
