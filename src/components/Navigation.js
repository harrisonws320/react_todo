import React from 'react'
import './Navigation.css';
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

//step 1:
import { useAuth } from '../contexts/AuthContext'

export default function Navigation() {
  //step 2:
  const { currentUser } = useAuth()


// export default function Navigation() {
  return (
    <Navbar bg='dark' data-bs-theme='dark' className='p-3' expand='md'>
    <Navbar.Brand href='/' style={{ fontFamily: '"Bahnschrift", sans-serif' }}>
      ToDoApp
    </Navbar.Brand>
    <Navbar.Toggle />  
    <Navbar.Collapse className='justify-content-end'>
      <Nav>
        <Link to='/todos' className='nav-link' style={{ fontFamily: '"Bahnschrift", sans-serif' }}>ToDos</Link>
        <Link to='/categories' className='nav-link' style={{ fontFamily: '"Bahnschrift", sans-serif' }}>Categories</Link>
        <Link to='/about' className='nav-link' style={{ fontFamily: '"Bahnschrift", sans-serif' }}>About</Link>
        {!currentUser && (
          <Link to='/login' className='nav-link' style={{ fontFamily: '"Bahnschrift", sans-serif' }}>Login</Link>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}
//Go to this page to figure out the links!!