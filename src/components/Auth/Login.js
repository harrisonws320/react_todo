import React from 'react'
//Each time we import a value from our context, we need 3 steps:
//STEP 1 - Import useAuth from the AuthContext
import { useAuth } from '../../contexts/AuthContext'
//Below we bring in some UI components from react-bootstrap
import { Container, Card } from 'react-bootstrap'
//The function useNavigate below allows us to redirect a user with react-router-dom
import { useNavigate } from 'react-router-dom'

export default function Login() {
//STEP 2 - DESTRUCTURE the needed properties from useAuth(), as shown below:
//we only choose login out of the 3 declared consts in App.js (login, bootstrap, routing)
const { login } = useAuth()
//BELOW we write a hook to store the useNavigate functionality:
const navigate = useNavigate()

async function handleAuth() {
//AWAIT keyword pauses code from executing until we receive a response from firebase:
await login()

//return the user HOME using useNavigate hook from react-router-dom
return navigate('/')

}

return (
//STEP 3 - Implement the AuthContext object(s) in our component's UI
    <div className='login'>
        <article className="bg-danger mb-5 p-5 text-white">
            <h1 className="text-center" style={{ fontFamily: '"Bahnschrift", sans-serif' }}>Welcome to my React ToDo App</h1>
        </article>
        <Container>
            <Card className='m-2 border-dark text-center'>
                <Card.Header classname='bg-dark-text-white'>
                    <h2>Login to Knock Some Items off the ToDo List!</h2>
                </Card.Header>
                <Card.Body>
                    <button className='btn btn-danger' onClick={() => handleAuth()}>
                        Login with Github
                    </button>
                </Card.Body>
            </Card>
        </Container>
    </div>
  )
}

