import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

//step 1:
// import { useAuth } from '../contexts/AuthContext'

export default function Navigation() {
  //step 2:
  // const { currentUser } = useAuth()


// export default function Navigation() {
  return (
    <Navbar bg='dark' data-bs-theme='dark' className='p-3' expand='md'>
    <Navbar.Brand href='/'>ToDoApp</Navbar.Brand>
    <Navbar.Toggle />  
    <Navbar.Collapse className='justify-content-end'>
      <Nav>
        <Link to='/Todos' className='nav-link'>
         ToDos
        </Link>  
        <Link to='/Categories' className='nav-link'>
         Categories
        </Link>  
        <Link to='/About' className='nav-link'>
         About Me
        </Link>  
        <Link to='/Login' className='nav-link'>
           Login
        </Link>
        {/* <Link to='/Logout' className='nav-link'>
           Logout
        </Link> */}
          
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}
//Go to this page to figure out the links!!