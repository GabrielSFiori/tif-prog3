import React, { useEffect, createContext, useState } from "react";

export const DarkModeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const DarkModeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(prefersDarkMode.matches ? "dark" : "light");

    const handleChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    prefersDarkMode.addEventListener("change", handleChange);

    return () => {
      prefersDarkMode.removeEventListener("change", handleChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <DarkModeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`section ${
          theme === "dark" ? "has-background-dark has-text-white" : ""
        }`}
      >
        {children}
      </div>
    </DarkModeContext.Provider>
  );
};
