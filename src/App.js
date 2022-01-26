import { useMemo, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Router from "./Router";
import Category from "./list/Category";
import categories from "./list/categories.json";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  const [category, setCategory] = useState(categories[0]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Category.Provider value={{ category, setCategory }}>
        <Router />
      </Category.Provider>
    </ThemeProvider>
  );
};

export default App;
