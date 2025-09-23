import React from 'react'
import './DropDown.css'



const handleChange = (e) => {
    console.log(e.target.value)
}

/**
 * Creates a new HTML `<select>` element, with `<option>`'s
 * @param Title What is shown next to the dropdown menu button 
 * @param Label gets matched from the text to the selector
 *  
 */
export default function DropDown({title, label, items}) {
  return (
  <>
    <div id='dropDownHolder'>
      <label html={label}>
        {title}
      </label>

      <select name={label} id="todo something here later" onChange={handleChange}>
        <option value='' >Choose an option...</option>
        {items.map(item => (
          <option value={item}>{item}</option>
        ))}
      </select>
    </div>
  </>
  )
}