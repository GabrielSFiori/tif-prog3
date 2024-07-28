import React, { useState } from "react";

const CategoryDropdown = ({
  categories,
  selectedCategories,
  onSelectCategory,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleDropdownClick = (event) => {
    event.preventDefault();
    setIsActive(!isActive);
  };

  const handleCategorySelect = (event, category) => {
    event.preventDefault();
    onSelectCategory(category);
  };

  return (
    <div className={`dropdown ${isActive ? "is-active" : ""}`}>
      <div className="dropdown-trigger ml-2">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdownClick}
        >
          <span>
            {selectedCategories.length > 0
              ? selectedCategories.map((cat) => cat.name).join(", ")
              : "Select Categories"}
          </span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {categories.map((category) => (
            <a
              key={category.id}
              href="#!"
              className={`dropdown-item ${
                selectedCategories.some((cat) => cat.id === category.id)
                  ? "is-active"
                  : ""
              }`}
              onClick={(event) => handleCategorySelect(event, category)}
            >
              {category.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;
