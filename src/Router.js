import Selector from "./selector";
import { Router } from "@reach/router";

const AppRouter = () => (
  <Router>
    <Selector path="/" />
    {/* <Player path="dashboard" /> */}
  </Router>
);

export default AppRouter;
