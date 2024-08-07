import React, { useContext } from "react";
import { DarkModeContext } from "./DarkModeProvider";

export const DarkMode = () => {
  const { theme, toggleTheme } = useContext(DarkModeContext);

  return (
    <button className="button-prueba is-primary" onClick={toggleTheme}>
      <span className="icon">
        <i className={theme === "dark" ? "fas fa-sun" : "fas fa-moon"}></i>
      </span>
    </button>
  );
};
