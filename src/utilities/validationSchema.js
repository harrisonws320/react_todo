//THIS FILE INTERACTS WITH/PULLS FROM/REFERS TO/ETC. OUR SQL SCHEMA!!!!

//This file will house the schemas for both resources and categories for the create/edit form.
//To bring in a simple validation implementation, we are going to use Yup by installing it in
//our app -- npm install yup...see implementation below

//Yup will work in tandem with Formik, which is an npm package that creates and stores form
//inputs for each item (categoryName, categoryDescription) that we need to capture in our forms. 
//npm install formik

/* This is what we need for category POST...These are inputs we need in the form. 
    {
        "categoryName": "Test",
        "categoryDescription": "Test desc"
    }
*/
//the 'yup' string refers to the yup folder in node_modules
import * as Yup from 'yup'

const catSchema = Yup.object().shape({
    //Below we call to each property that will need to be validated and use Yup 
    //to define the requirements for each property (required, maxLength, etc.)
    //reminds me of metadata
    //below required means not nullable in our database/table/sql schema/....
    catName: Yup.string().max(25, 'Max 25 Characters').required('Required'),
    // below is nullable, so no .required()
    catDesc: Yup.string().max(50, 'Max 50 characters')
})

const todoSchema = Yup.object().shape({
    name: Yup.string().max(25, 'Max 25 Characters').required(),
    description: Yup.string().max(50, 'Max 50 characters'),
    url: Yup.string().max(75, 'Max 75 characters').required(),
    linkText: Yup.string().max(25, 'Max 25 characters').required(),
    categoryId: Yup.number().required()
})

//what we are exporting is what we built/typed above--ie we're exporting each const from above
export { catSchema, todoSchema }