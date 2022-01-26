import Selector from "./selector";
import List from "./list";
import Loader from "./loader";
import Share from "./share";
import Error from "./error";
import Player from "./player";
import { Router } from "@reach/router";

const AppRouter = () => (
  <Router>
    {/* <Selector default path="/" /> */}
    <List default path="/" />
    <Selector path="/selector" />
    <Loader path="/load/:mode/:hymn" />
    <Share path="/share/:mode/:hymn" />
    <Error path="/error" />
    <Player path="/play/:mode/:hymn" />
  </Router>
);

export default AppRouter;
