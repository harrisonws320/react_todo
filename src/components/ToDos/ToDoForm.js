import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import { toDoSchema } from '../../utilities/validationSchema'
import axios from 'axios'

export default function ToDoForm(props) {
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        axios.get(`http://todoapi.harrisonwsmith.com/api/Categories`).then(response => setCategories(response.data))
    }

    const handleSubmit = (values) => {
        console.log(values)
        if (!props.todo) {
            const newToDo = {
                name: values.name,
                done: false,
                categoryId: values.categoryId
            }

            axios.post(`http://todoapi.harrisonwsmith.com/api/ToDos`, newToDo).then(() => {
                props.getToDos()
                props.setShowCreate(false)
            })
        }
        else {
            const taskToEdit = {
                toDoId: props.todo.toDoId,
                name: values.name,
                done: props.todo.done,
                categoryId: values.categoryId
            }

            axios.put(`http://todoapi.harrisonwsmith.com/api/ToDos/${props.todo.toDoId}`, taskToEdit).then(() => {
                props.getToDos()
                props.setShowEdit(false)
            })
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

  return (
    <Formik
        initialValues={{
            name: props.todo ? props.todo.name : '',
            done: props.todo ? props.todo.done : false,
            categoryId: props.todo ? props.todo.categoryId : ''
        }}
        validationSchema={toDoSchema}
        onSubmit={(values) => handleSubmit(values)}>
        {({errors, touched}) => (
            <Form id='toDoForm'>
                <div className="form-group m-3">
                    <Field name='name' className='form-control' placeholder='New Task' />
                    {errors.name && touched.name ? (
                        <div className="text-danger">{errors.linkText}</div>
                    ) : null}
                </div>
                <div className="form-group m-3">
                    <Field name='categoryId' as='select' className='form-control'>
                        <option value='' disabled>[--Choose a Category--]</option>
                        {categories.map(cat =>
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.catName}
                            </option>    
                        )}
                    </Field>
                </div>
                <div className="form-group m-3">
                    <button className="btn btn-danger m-3" type='submit'>Submit</button>
                </div>
            </Form>
        )}
    </Formik>
  )
}
