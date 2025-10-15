import { RouterProvider } from "react-router-dom";
import { Router } from "./Routers";
import { ConfigProvider } from "antd";

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#eb8844",
        },
      }}
    >
      <RouterProvider router={Router} />
    </ConfigProvider>
  );
};

export default App;
