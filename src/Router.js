import Selector from "./selector";
import Loader from "./loader";
import { Router } from "@reach/router";

const AppRouter = () => (
  <Router>
    <Selector default path="/" />
    <Loader path="/load/:mode/:hymn" />
    {/* <Player path="/play/:mode/:hymn" /> */}
  </Router>
);

export default AppRouter;
