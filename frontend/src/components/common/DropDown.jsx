import React from 'react'
import '../../global.css'
import './DropDown.css'



/**
 * Creates a new HTML `<select>` element, with `<option>`'s
 * @param Title What is shown next to the dropdown menu button 
 * @param Label gets matched from the text to the selector
 * 
 */
// todo fill that out later ^
export default function DropDown({title, label, items, onSelect, selected}) {

const handleChange = (e) => {
  // console.log(e.target.value)
  onSelect(e.target.value) // <- call function inside parent
}

  return (
    <div id='dropDownHolder'>
      <label html={label} id='textlabel'>{title}</label>
      <select name={label} id='dropDown' onChange={handleChange} value={selected}>
        <option value='' >Choose an option...</option>
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}