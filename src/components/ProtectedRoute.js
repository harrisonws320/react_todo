import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

//Below we are making a component that redirects the unauthenticated user to the login screen. 
//We pass in children in the params as a prop,
// which refers to any component that is nested inside of ProtectedRoute tags.
//look at app.js and AuthContext to see how child is used.
export default function ProtectedRoute({children}) {
  const { currentUser } = useAuth()

// Below we check to see if there's a currentUser. If so, render the children.
// If there's no currentUser, redirect to the login page using the Navigate component.
  return currentUser ? children : <Navigate to='/login' />
}

// ONCE COMPLETED, WE IMPLEMENTED THIS COMPONENT IN APP.JS