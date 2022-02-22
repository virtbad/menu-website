import { NextPage } from "next";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContext {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  switchTheme: () => void;
}

const defaultValues: ThemeContext = {
  theme: "light",
  setTheme: () => {},
  switchTheme: () => {},
};

export const ThemeContext = createContext<ThemeContext>(defaultValues);

/**
 * Provider for the theme context to manage the users preferenced theme
 */

export const ThemeProvider: NextPage = ({ children }): JSX.Element => {
  const [theme, updateTheme] = useState<"light" | "dark">(defaultValues.theme);
  const hasWindow: boolean = typeof window === "object";

  useEffect(() => {
    updateTheme(getTheme());
  }, []);

  /**
   * Get the current theme
   */

  const getTheme = (): "light" | "dark" => {
    if (!hasWindow) return defaultValues.theme;
    if (localStorage.theme === "light" || localStorage.theme === "dark") return localStorage.theme;
    else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
      else setTheme("light");
      return getTheme();
    }
  };

  /**
   * Update the theme
   *
   * @param theme new theme
   */

  const setTheme = (theme: "light" | "dark"): void => {
    localStorage.theme = theme;
    document.documentElement.setAttribute("theme", theme);
    updateTheme(theme);
  };

  return <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme, switchTheme: () => setTheme(getTheme() === "dark" ? "light" : "dark") }} children={children} />;
};

/**
 * Access the theme values
 */

export const useTheme = (): ThemeContext => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
