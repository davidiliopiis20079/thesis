import React, { useState } from 'react';

function Dropdown({ onSelect, activeItem, items, className }) {
  // State for dropdown visibility
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Function to toggle the visibility of the dropdown menu
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  }

  // Function to handle selection of an item from the dropdown menu
  const selectItem = (item) => {
    setDropdownVisible(!dropdownVisible); // Close dropdown after selecting an item
    onSelect(item); // Call the onSelect function passed as prop with the selected item
  }

  return (
    <div className={`dropdown ${className}`}>
      {/* Button to toggle dropdown visibility */}
      <button 
        className="btn btn-secondary dropdown-toggle" 
        type="button" 
        onClick={toggleDropdown}
      >
        {/* Display the label of the active item */}
        {activeItem.label}
      </button>
      {/* Dropdown menu */}
      <div className={`dropdown-menu ${dropdownVisible ? 'visible' : ''}`}>
        {/* Render dropdown items */}
        {items && items.map((item, i) => ( 
          <button 
            className={`dropdown-item ${item.value === activeItem.value ? 'active' : ''}`} 
            key={i}
            onClick={() => selectItem(item.value)}
          >
            {/* Display item label */}
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;
