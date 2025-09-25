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
  // console.log("HandleChange value inside of DropDown.jsx: ", e.target.value)
  onSelect(e.target.value) // <- call onSelect function inside parent
}

const convertedItems = Array.isArray(items) ? items : Object.values(items); // convert to array if its json object

  return (
    <div id='dropDownHolder'>
      <label html={label} id='textlabel'>{title}</label>
      <select name={label} id='dropDown' onChange={handleChange} value={selected}>
        <option value='' >Choose an option...</option>
        {convertedItems.map((item) => (
          <option value={item}>
            {item}
          </option>
        ))
        }
      </select>
    </div>
  )
}

/* old version of items map filtering, which would give ability to use this component on many other ones
  ... refactored out for simplicitys sake, since TMDB only really has one filter worth using a dropdown menu for
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
*/
