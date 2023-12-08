import React from 'react'
//Below we import 3 components necessary to build a Formik form
import { Formik, Form, Field } from 'formik'
import { catSchema } from '../../utilities/validationSchema'
import axios from 'axios'
//again, 'axios' is a folder inside the node_modules folder

export default function CatForm(props) {

    const handleSubmit = (values) => {
        console.log(values)
        if(!props.category){
          //If there is no props.category, we are in create mode inside these scopes.
          //first, make a temp object to send in our request:
          const catToCreate = values

          //THEN send temp object in a POST request to our API:
          axios.post(`http://todoapi.harrisonwsmith.com/api/Categories`, catToCreate).then(() => {
            //Once the new cateogry is posted to the API, we want to close this form and refresh the table categories
            props.setShowCreate(false)//this will close the create form in Categories.js
            props.getCategories()//this will refresh the Categories table
          })
        } else {
          //if there is a props.category, we're in edit mode inside these scopes.
          //make our temp object to send in the put request
          const catToEdit = {
            categoryId: props.category.categoryId, 
            //BELOW we get the name and description from the form values
            catName: values.catName,
            catDesc: values.catDesc
          }

          axios.put(`http://todoapi.harrisonwsmith.com/api/Categories/${props.category.categoryId}`, catToEdit).then(() => {
            props.setShowEdit(false)
            props.getCategories()
          })

        }
    }

  return (
   <div className='createCategory m-2 text-white text-center'>
    <Formik
     initialValues={{
        // Below is a ternary operator that makes our form behave differently based on whether 
        // we have a prop called category. (ie Editing a category)
        catName: props.category ? props.category.catName : '',
        catDesc: props.category ? props.category.catDesc : ''
     }}
     validationSchema={catSchema}
     onSubmit={(values) => handleSubmit(values)}>
        {({errors, touched}) => (
            //We will build our form inside these parens, bringing in the destructed errors
            //and touched objects from the parent Formik component.
            <Form id='catForm' className='row text-center m-auto'>
                <div className="form-group m-1 p-1">
                  <Field name='catName' className='form-control' placeholder='Name' />
                  {errors.catName && touched.catName &&
                    <div className="text-danger">{errors.catName}</div>
                  }
                </div>
                <div className="form-group m-1 p-1">
                  <Field name='catDesc' className='form-control' placeholder='Description' />
                  {errors.catDesc && touched.catName &&
                    <div classDescription="text-danger">{errors.catDesc}</div>
                  }
                </div>
                <div className='form-group m-1'>
                    <button type='submit' className='btn btn-success'>
                        Submit Category to API
                    </button>

                </div>
            </Form>
        )}
    </Formik>
   </div>
  )
}
