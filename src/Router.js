import Selector from "./selector";
import Loader from "./loader";
import Error from "./error";
import Player from "./player";
import { Router } from "@reach/router";

const AppRouter = () => (
  <Router>
    <Selector default path="/" />
    <Loader path="/load/:mode/:hymn" />
    <Error path="/error" />
    <Player path="/play/:hymn" />
    <Player path="/play/:hymn/:url" />
  </Router>
);

export default AppRouter;
