import React from 'react'

const CategorySelector = ({ onChange }) => {
    const categories = ['genre', 'price', 'venue']
    return (
        <select onChange={onChange}>

            <option> >Choose Category</option>
            {categories.map(category => {
                return <option value={category}> {category} </ option >
            })}

        </select>
    )

}


export default CategorySelector