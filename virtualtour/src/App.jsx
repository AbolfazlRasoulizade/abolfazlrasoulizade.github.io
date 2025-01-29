import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { router } from "./routers/router";
import { RouterProvider } from "react-router-dom";

const App = () => {
  
  const theme = createTheme({
    typography: { fontFamily: "Roboto" },
    colorSchemes: {
      dark: true,
    },
  });
  
  return (
    <>
        <ThemeProvider theme={theme} defaultMode="dark">
          <CssBaseline enableColorScheme />
            <RouterProvider router={router} />
        </ThemeProvider>
    </>
  );
};

export default App;
