import React, { useState, useEffect } from 'react'
//we installed axios to manage API requests with npm + install + axios
import axios from 'axios'
//Below we use the default import syntax for react-bootstrap Container
// import Container from 'react-bootstrap/Container'
import SingleCategory from './SingleCategory';
import { Container, Table } from 'react-bootstrap'
//the imports below are for creating functionality:
import { useAuth } from '../../contexts/AuthContext';
import CatCreate from './CatCreate';


//Steps to Read functionality
//1. add useState and useEffect to the react import
//2. install and import axios
//3. create the hook to store the data
//4. create the function that uses axios to get the categories
//5. create useEffect to automate retrieval of data in this component
//----- You should now have your data stored, and now on to the UI
//6. use .map to render each category to the screen (also add any supplemental UI (table and thead)...combo of Categories and SingleCategory)

//Steps to Create functionality
//1. Create validationSchema and form specific to Categories
//2. import currentUser from the context
//3. Create a react hook to show/hide the form
//4. Create and render CatCreate in the conditonal rendering, based on whether the user is an admin or not
//5. Update the create functionality in CatForm.js

export default function Categories() {
//the below hook will store the data returned from the API
const [categories, setCategories] = useState([]);
//we have to have the empty [] in the parentheses for useState so .map doesn't throw an error. 
//we can't .map categories unless it's ALWAYS a collection

//The two hooks below are for create functionality
const { currentUser } = useAuth()
//the second hook will track whether our create form is showing/hidden
const [showCreate, setShowCreate] = useState(false);

//Below is the function that uses axios to fetch the categories from our API
const getCategories = () => {
    axios.get(`http://todoapi.harrisonwsmith.com/api/Categories`).then(response => {
        console.log(response)
        setCategories(response.data)
    })
}

useEffect(() => {
    getCategories()
}, []);

  return (
    <section className="categories">
       <article className="bg-light p-5">
        <h1 className='text-center'>
          <span className='custom-heading'>Categories Dashboard</span>
          </h1>
    </article>
    {/* BEGIN CREATE UI */}
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
          <div className="bg-dark p-2 mb-3 text-center">
            {showCreate ?
              <>
                <button onClick={() => setShowCreate(false)} className="btn btn-danger text-white p-3 mb-3">
                    Cancel
                </button>
                <CatCreate getCategories={getCategories} setShowCreate={setShowCreate} />
              </> :
              <button onClick={() => setShowCreate(true)} className="btn btn-danger text-white p-3 mb-3">
                Create New Category
              </button>
            }
          </div>
        }
    {/* END CREATE UI */}

    <Container className='p-2'>
    <Table className="table table-dark bg-info my-3">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    {/* Conditionally reander a third <th></th> if user is the admin */}
                    {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
                     <th>Actions</th>
                    }
                </tr>
            </thead>
            <tbody>
              {/* below begins our read UI */}
                {categories.map(cat => 
                //below we map out SingleCategory from each item in the categories hook
                //we add getCategories as a prop so we can call this functionality from SingleCategory component
                <SingleCategory key={cat.categoryId} category={cat} getCategories={getCategories}
                />
                    )}
            </tbody>
            </Table>
    </Container>
    </section>
  )
}

