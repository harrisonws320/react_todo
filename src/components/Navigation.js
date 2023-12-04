import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <Navbar bg='dark' data-bs-theme='dark' className='p-3' expand='md'>
    <Navbar.Brand href='/'>ToDoApp</Navbar.Brand>
    <Navbar.Toggle />  
    <Navbar.Collapse className='justify-content-end'>
      <Nav>
        <Link to='/Login' className='nav-link'>
         Login
        </Link>  
        <Link to='/Todos' className='nav-link'>
         Login
        </Link>  
        <Link to='/Categories' className='nav-link'>
         Login
        </Link>  
        <Link to='/bootstrap' className='nav-link'>
         Bootstrap
        </Link>  
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}
//Go to this page to figure out the links!!