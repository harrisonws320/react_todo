import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Formik, Field, Form } from 'formik'
import { todoSchema } from '../../utilities/validationSchema'

export default function TodoForm(props) {
    //we need to get categories from the API to populate the dropdown list in our form and then (usf + tab)
    const [categories, setCategories] = useState([])

    //this was c and p'd from FilterCat.js:
    useEffect(() => {
        axios.get(`http://todoapi.harrisonwsmith.com/api/Categories`).then(response => {
        console.log(response)
        setCategories(response.data)
    })
        
    }, [])

const handleSubmit = (values) => {
    console.log(values)
    if(!props.todo){
        //when there is not props.resource, we're in create mode w/in these scopes
        //and we change the end point of the url below to refer to the page
        //we changed it to 'Resources'
        const todoToCreate = values

        axios.post(`http://todoapi.harrisonwsmith.com/api/Todos`, todoToCreate).then(() => {
            props.setShowCreate(false)//closes create form
            props.getTodos()//updates resources in our tiled view
        })
    }else {
        //when there is a props.resource we are in edit mode inside of these scopes
        //start with a temp object
        const todoToEdit = {
            todoId: props.todo.todoId,
            name: values.name,
            url: values.url,
            linkText: values.linkText,
            description: values.description,
            categoryId: values.categoryId
        }
        //send the temp object to the API in a put request:
        axios.put(`http://todoapi.harrisonwsmith.com/api/Todos/${props.todo.todoId}`, todoToEdit).then(() => {
            props.setShowEdit(false)//this closes the edit form
            props.getTodos()//this refreshes the resource in our tiled view
        })
    }   
}

//add three props inside Formik opening tag:
//we got props from validationSchema.js:
  return (
    <Formik
    initialValues={{
        name: props.todo ? props.todo.name : '',
        url: props.todo ? props.todo.url : '',
        linkText: props.todo ? props.todo.linkText : '',
        description: props.todo ? props.todo.description : '',
        categoryId: props.todo ? props.todo.categoryId : ''
    }}
    validationSchema={todoSchema}
    onSubmit={(values) => handleSubmit(values)}>
        {/* below is the spot where we destructure errors and touched from Formik.
        Star with the syntax below AND place your <Form></Form> in the empty parens: 
        {({errors, touched}) => ()} */}
        {({errors, touched}) => (
            <Form id='todoForm'> 
             <div className="form-group m-3">
                <Field name='name' className="form-control" placeholder='Name' />
                {errors.name && touched.name &&
                 <div className="text-danger">{errors.name}</div>
                }
             </div>
             <div className="form-group m-3">
                <Field name='url' className="form-control" placeholder='Url' />
                {errors.url && touched.url &&
                 <div className="text-danger">{errors.url}</div>
                }
             </div>
             <div className="form-group m-3">
                <Field name='linkText' className="form-control" placeholder='Link Text' />
                {errors.linkText && touched.linkText &&
                 <div className="text-danger">{errors.linkText}</div>
                }
             </div>
             <div className="form-group m-3">
                <Field 
                name='description' 
                className="form-control" 
                as='textarea' 
                placeholder='Description'
                style={{ resize: 'none', height: '5em'}} />
                {/*  As a reminder:   5em = 5 lines tall of text, literally 5 Ms  */}
                {errors.description && touched.description &&
                 <div className="text-danger">{errors.description}</div>
                }
             </div>
             <div className="form-group m-3">
                <Field as='select' name='categoryId' className='form-control'>
                  <option value='' disabled>
                    [--PLEASE CHOOSE--]
                    {/* BELOW we will map out an option for every category in the API */}
                    </option>
                    {categories.map(cat =>
                   <option key={cat.categoryId} value={cat.catId}>
                     {cat.catName}      
                  </option>
                  )}
                </Field>
             </div>
             <div className="form-group m-3">
                <button type='submit' className="btn btn-success m-3">
                    Submit ToDo to API
                </button>
             </div>
            </Form>
        )}
    </Formik>
   
  )
}
