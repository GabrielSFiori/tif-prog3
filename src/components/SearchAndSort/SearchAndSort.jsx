import React, { useState } from "react";

export const SearchAndSort = ({ categoriesMap, onSearch }) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");

  const handleSearch = () => {
    if (typeof onSearch === "function") {
      onSearch({
        title: searchTitle,
        categories: selectedCategory,
        ordering: selectedOrder,
      });
    } else {
      console.error("onSearch is not a function");
    }
  };

  return (
    <div className="box">
      <div className="field">
        <label className="label">Search by Title</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Enter article title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Filter by Category</label>
        <div className="control">
          <div className="select">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>

              {Object.entries(categoriesMap).map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Sort by</label>
        <div className="control">
          <div className="select">
            <select
              value={selectedOrder}
              onChange={(e) => setSelectedOrder(e.target.value)}
            >
              <option value="">Select order</option>
              <option value="title">Title (A-Z)</option>
              <option value="-title">Title (Z-A)</option>
              <option value="created_at">Date (Oldest First)</option>
              <option value="-created_at">Date (Newest First)</option>
              <option value="view_count">Views (Low to High)</option>
              <option value="-view_count">Views (High to Low)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button className="button is-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
