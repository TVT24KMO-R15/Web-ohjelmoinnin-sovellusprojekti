import React from 'react'
import '../../global.css'
import './DropDown.css'


/**
 * Creates a new HTML `<select>` element, with `<option>`'s
 * @param Title what is shown next to the dropdown menu button 
 * @param Label gets matched from the text to the selector
 * @param Items array of items to be shown in the dropdown menu
 * @param onSelect function that is called when an item is selected, with the selected item as an argument
 * @param selected currently selected item
 * 
 * returns a dropdown menu component
 * 
 * Example usage:
 * ```
 * <DropDown
 *   title="Sort by"
 *   label="sort"
 *   items={['Popularity', 'Release Date', 'Revenue', 'Primary Release Date', 'Original Title', 'Vote Average', 'Vote Count']}
 *   onSelect={(item) => console.log("Selected item: ", item)}
 *   selected={selectedItem}
 * />
 * ```
 */
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
  if this component ever gets refactored to use a more complex implementation,
  also see moviesearch for how to use the more complex array version
  and update all dependencies 
  ... refactored out for simplicitys sake, since TMDB only really has one filter worth using a dropdown menu for
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
*/
