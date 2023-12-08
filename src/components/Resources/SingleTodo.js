import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import {FaEdit, FaTrashAlt } from 'react-icons/fa'
import axios from 'axios'
import TodoEdit from './TodoEdit'

export default function SingleTodo(props) {
    const { name, description, url, linkText, todoId} = props.todo
    //we added resourceId
    // the ABOVE consts will be referenced below in <h3></h3>

    //the 2 hooks below are added for Edit functionality:
    //1st hook:
    const { currentUser } = useAuth()
    //this 2nd hook tracks whether the Edit form is shown/hidden
    const [showEdit, setShowEdit] = useState(false);

    //Below is our delete function:
    const deleteTodo = (id) => {
      if(window.confirm(`Are you sure you want to delete ${name}?`)){
          // ABOVE we reference the 'name' from the const on line 8
    //AND we only enter these scopes if our user clicks "OK"
    axios.delete(`http://todoapi.harrisonwsmith.com/api/Todos/${id}`).then(() => {
      props.getTodos()//this refreshes the resources tiled view
    }) 
      }
    
    }

  return (
    <div className='singleTodo col-md-5 m-4'>
      {/* the below currentUser.email... was c and p'd from Resource.js */}
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div>
          <button id="editLink" onClick={() => setShowEdit(true)}>
          <FaEdit />
          </button>
          <button id="deleteLink" onClick={() => deleteTodo(todoId)}> 
          <FaTrashAlt />
          </button>
          {showEdit &&
          // below are the 4 props from ResourceEdit.js (thus <ResourceEdit />)
            <TodoEdit 
             showEdit={showEdit}
             setShowEdit={setShowEdit}
             getTodos={props.getTodos}
             todo={props.todo} />
          }
        </div>
      }
     <h3>{name}</h3>
     {description !== null ?
     <p>{description}</p> : <p> No Description Provided</p> 
    }
    <a href={url} target='_blank' rel='noreferrer' className="btn btn-info">
       Visit {linkText}
    </a>
    </div>
  )
}
