import { useRoutes } from "react-router-dom";

import "./app.scss";
import routes from "./routes";

function App() {
  return useRoutes(routes);
}

export default App;
