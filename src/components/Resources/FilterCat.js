//this component will house a button for each Category and an ALL button to remove filtering
import React, { useState, useEffect} from 'react'
import axios from 'axios'

export default function FilterCat(props) {
    //We need to access and store categories from the API for this component to work:
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get(`http://todoapi.harrisonwsmith.com/api/Categories`).then(response => {
        console.log(response)
        setCategories(response.data)
    })
        
    }, [])


  return (
    <div className="text-center mt-5">
        <button onClick={() => props.setFilter(0)} className="btn btn-outline-info bg-dark m-1">
            All
        </button>
        {/* Below we map all categories to a button that will filter resources on that category */}
        {categories.map(cat => 
         <button key={cat.categoryId} className="btn btn-outline-info bg-dark m-1"
         onClick={() => props.setFilter(+cat.categoryId)}>
            {cat.catName}
         </button>    
        )}
    </div>
  )
}
