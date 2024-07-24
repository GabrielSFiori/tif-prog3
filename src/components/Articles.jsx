import React from "react";
import ConnApi from "../hooks/ConnApi";

const Articles = () => {
  return (
    <div className="container">
      <h1 className="title">Articles</h1>
      <ConnApi />
    </div>
  );
};

export default Articles;
