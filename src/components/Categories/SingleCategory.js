import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
//below we bring in 2 icons from React Icons npm package
//npm install react-icons (SEE DOCS: https://react-icons.github.io/react-icons/)
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from 'axios'
import CatEdit from './CatEdit';

export default function SingleCategory(props) {
    //below we destructure the name and description properties off our category in the props
    //put consts in <td></td>
    const { catName, catDesc, categoryId } = props.category

    //The two hooks below are added for EDIT functionality
    const { currentUser} = useAuth()
    //this hook below tracks whether the form is shown/hidden
    const [showEdit, setShowEdit] = useState(false)

    //Below is the delete function, which checks if the user really wants to delete before executing:
    const deleteCat = (id) => {
      if(window.confirm(`Do you really want to permanently delete ${catName}?`)) {
        //The coe in these scopes can only execute in the user clicks "ok"
        axios.delete(`http://todoapi.harrisonwsmith.com/api/Categories/${id}`).then(() => {
          props.getCategories()
        })
      }
    }

  return (
    <tr>
        <td>{catName}</td>
        <td>{catDesc}</td>
        {/* BEGIN EDIT UI */}
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL && 
        <td>
          <button onClick={() => setShowEdit(true)} className="m-1 rounded" id="editLink">
            <FaEdit />
          </button>
          <button onClick={() => deleteCat(categoryId)} className="m-1 rounded" id="deleteLink">
            <FaTrashAlt />
          </button>
          {showEdit &&
            <CatEdit
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            getCategories={props.getCategories}
            category={props.category} />  
          }
        </td>
        }
        {/* END EDIT UI */}
    </tr>
  )
}
