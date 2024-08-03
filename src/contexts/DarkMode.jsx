import React, { useContext } from "react";
import { DarkModeContext } from "./DarkModeProvider";

export const DarkMode = () => {
  const { theme, toggleTheme } = useContext(DarkModeContext);

  return (
    <button className="button is-primary mb-3 mr-3" onClick={toggleTheme}>
      <span className="icon">
        <i className={theme === "dark" ? "fas fa-sun" : "fas fa-moon"}></i>
      </span>
    </button>
  );
};
