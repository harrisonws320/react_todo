import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Table } from 'react-bootstrap'
import SingleToDo from './SingleToDo'
import './ToDos.css'
import FilterCat from './FilterCat'
import { useAuth } from '../../contexts/AuthContext'
import ToDoCreate from './ToDoCreate'

export default function ToDos() {
  const [toDos, setToDos] = useState([])
  const { currentUser } = useAuth()
  const [showCreate, setShowCreate] = useState();

  const [filter, setFilter] = useState(0)
  const [showDone, setShowDone] = useState(false)

  const getToDos = () => {
    axios.get(`http://todoapi.harrisonwsmith.com/api/ToDos`).then(response => {
      console.log(response)
      setToDos(response.data)
    })
  }

  useEffect(() => {
    getToDos()
  }, [])

  return (
    <section className="categories">
    <article className="bg-light p-5">
        <h1 className='text-center'>
          <span className='custom-heading'>ToDos Dashboard</span>
          </h1>
    </article>
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div className="bg-dark p-2 mb-3 text-center">
          {!showCreate ?
            <button className="btn btn-danger text-white p-3 mb-3" onClick={() => setShowCreate(true)}>
              Create New Task
            </button> :
            <button className="btn btn-danger text-white p-3 mb-3" onClick={() => setShowCreate(false)}>
              Close Form
          </button>
          }
          {showCreate &&
            <div className="createContainer w-75 m-auto">
                <ToDoCreate getToDos={getToDos} setshowCreate={setShowCreate} />
            </div>
          }
        </div>
      }
      <FilterCat setFilter={setFilter} showDone={showDone} setShowDone={setShowDone} />
      <Container className='pt-4'>
        <Table className="table table-dark bg-info my-3">
          <thead>
            <tr>
              <th>Completed?</th>
              <th>Task</th>
              <th>Category</th>
              {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
                <th>Actions</th>
              }
            </tr>
          </thead>
          <tbody>
            {!showDone ?
              <>
               {filter === 0 ? toDos.filter(x => x.done === false).map(x =>
                <SingleToDo key={x.toDoId} todo={x} getToDos={getToDos}/>
                ) :
                toDos.filter(x => x.done === false && x.categoryId === filter).map(x =>
                  <SingleToDo key={x.toDoId} todo={x} getToDos={getToDos} />
              )}
            </> :
            <>
              {filter === 0 ? toDos.map(x =>
                  <SingleToDo key={x.toDoId} todo={x} getToDos={getToDos}/>
                ) :
                toDos.filter(x => x.categoryId === filter).map(x =>
                  <SingleToDo key={x.toDoId} todo={x} getToDos={getToDos} />
              )}
            </>
            }
          </tbody>
        </Table>
            {!showDone ?
            <>
            {filter !== 0 && toDos.filter(x => x.done === false && x.categoryId === filter).length === 0 &&
              <h2 className="alert alert-warning text-dark">
                There are no incomplete To Do items in this category.
              </h2>
            }
            </> :
            <>
              {filter !== 0 && toDos.filter(x => x.categoryId === filter).length === 0 &&
              <h2 className="alert alert-warning text-dark">
                There are no To Do items in this category.
              </h2>
            }
            </>

            }
      </Container>
        
    </section>
  )
}