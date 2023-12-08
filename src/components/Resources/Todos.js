import React, { useState, useEffect } from 'react'
import './Todos.css'
//now we import axios:
import axios from 'axios'
//bring in the container:
import Container from 'react-bootstrap/Container'
import SingleTodo from './SingleTodo'
import FilterCat from './FilterCat'

// THE TWO IMPORTS BELPW ARE ADDED FOR CREATE FUNCTIONALITY:
import { useAuth } from '../../contexts/AuthContext'
import TodoCreate from './TodoCreate'

//Steps to Read functionality
//1. add useState and useEffect to the react import
//2. install and import axios
//3. create the hook to store the data
//4. create the function that uses axios to get the resources
//5. create useEffect to automate retrieval of data in this component
//----- You should now have your data stored, and now on to the UI
//6. use .map to render each resource to the screen (also add any supplemental UI (container for the gallery)...combo of Resources/SingleResource)

export default function Todos() {
    // step 3 - usf for hook:
    //remember[] inside useState([])
    const [todos, setTodos] = useState([])

    //the two hooks below are added for create functionality (See import statement above)
    //hook 1:
    const { currentUser } =useAuth()
    //the below hook tracks whether the create form is shown/hidden and usf tab:
    //this is hook 2:
    const [showCreate, setShowCreate] = useState(false)

    //Filtering steps - use .filter() to create a limited list of resources.
  //1. Create a hook that will store values for what the user wants to filter resources by...this hook will store the categoryId for the category they want to filter by.
  //2. place the conditional rendering for when filter === 0 in the initial map of resources
  //3. Create FilterCat to give the buttons to the user to filter by
  //4. Render in resources...see below
  //5. Create the conditional rendering for when filter !== 0...see below

  const [filter, setFilter] = useState(0)
  //0 is not an ID in Resource database so we can use it as a value to show all resources

    const getTodos = () => {
        axios.get(`http://todoapi.harrisonwsmith.com/api/Todos`).then(response => {
        console.log(response)
        setTodos(response.data)
        })
    }
    useEffect(() => {
        getTodos() 

        }, [])
    
  return (
    <section className="todos">
        <article className="bg-info p-5">
            <h1 className="text-center">ToDos Dashboard</h1>
        </article>
        {/* BEGIN CREATE UI */}
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
         <div className="bg-dark p-2 mb-3 text-center">
          <button className="btn btn-info" onClick={() => setShowCreate(!showCreate)}>
            {!showCreate ? 'Create New Todo' : 'Close Form'}
          </button>
          <div className="createContainer">
            {showCreate &&
             //BELOW we render the Create form when showCreate is true
             <TodoCreate setShowCreate={setShowCreate} getTodos={getTodos}/>
            }
          </div>
         </div>
        }
        {/* END CREATE UI */}
        <FilterCat setFilter={setFilter} />
        <Container>
            <article className="todoGallery row justify content center">
                {/* Below we write conditional rendering to see if the user is trying to filter results or not, and display the right 
                resources according to what they want. */}
                {filter === 0 ? todos.map( r => 
              //Below we .map our single resource component for each resource in our collection
              <SingleTodo key={r.todoId} todo={r} getTodos={getTodos} />    
            ) :
            todos.filter(r => r.categoryId === filter).map(r =>
              <SingleTodo key={r.todoId} todo={r} getTodos={getTodos} />
            )}
            {/* Below we throw a message to the user if there are no resources in the category */}
            {filter !== 0 && todos.filter(r => r.categoryId === filter).length === 0 &&
              <h2 className="alert alert-warning text-dark">
                There are no results for this category
              </h2>

            }
            </article>
        </Container>
    </section>
  )
}
