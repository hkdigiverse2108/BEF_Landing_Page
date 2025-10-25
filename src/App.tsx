import { RouterProvider } from "react-router-dom";
import { Router } from "./Routers";
import { ConfigProvider } from "antd";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { Store } from "./Store/Store";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#eb8844",
      },
    },
    components: {
      MuiTabs: {
        styleOverrides: {
          indicator: {
            background: "linear-gradient(90deg, var(--color-primary), var(--color-success))",
            height: "2px",
          },
        },
      },
    },
  });

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#eb8844",
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <Provider store={Store}>
          <RouterProvider router={Router} />
        </Provider>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default App;
