import React from 'react'
import Modal from 'react-bootstrap/Modal'
import TodoForm from './TodoForm'

//we need to pass 4 different props, which we get from SingleResource.js
export default function TodoEdit(props) {
    return (
      <Modal
       show={props.showEdit}
       onHide={() => props.setShowEdit(false)} 
       size='lg'>
          <Modal.Header className='bg-info' closeButton>
              <h3>Editing {props.todo.name}</h3>
          </Modal.Header>
          <Modal.Body>
              <TodoForm 
               getTodos={props.getTodos}
               setShowEdit={props.setShowEdit}
               todo={props.todo} />
          </Modal.Body>
  
      </Modal>
    )
  }
  