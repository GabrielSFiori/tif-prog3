import React, { useContext } from "react";
import { DarkModeContext } from "../contexts/DarkModeProvider";

const Footer = () => {
  const { theme } = useContext(DarkModeContext);

  return (
    <footer
      className={`footer ${
        theme === "dark" ? "has-background-dark" : "has-background-light"
      }`}
    >
      <div className="content has-text-centered">
        <p className={theme === "dark" ? "has-text-light" : "has-text-dark"}>
          <strong>My Application</strong> by{" "}
          <a href="https://github.com/GabrielSFiori/tif-prog3">
            <p
              className={theme === "dark" ? "has-text-light" : "has-text-dark"}
            >
              Code Collaborators
            </p>
          </a>
        </p>
        <p className={theme === "dark" ? "has-text-light" : "has-text-dark"}>
          <span>&#169;</span> All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
