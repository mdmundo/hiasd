import { useEffect, useContext, useState } from "react";
import { CircularProgress, Typography, Card, CardContent, Container } from "@mui/material";
import { navigate } from "@reach/router";
import { getHymn } from "./hymn";
import { getPath } from "./parser";

const Loader = ({ mode, hymn }) => {
  const [progress, setProgress] = useState(0);
  const path = getPath({ mode, hymn });

  useEffect(() => {
    getHymn(path, setProgress).then((hymnURI) => {
      if (hymnURI) {
        // URIDispatch(hymnURI);
        // NAVIGATE TO PLAYER
      } else {
        navigate("/error");
      }
    });
  }, [path]);

  return (
    <Container
      sx={{
        marginTop: 2,
        marginBottom: 2,
        padding: (3, 2),
      }}
      maxWidth="xs"
    >
      <Card>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }} variant="subtitle2" display="block" align="center" gutterBottom>
            Carregando
          </Typography>
          <CircularProgress
            sx={{ display: "block", margin: "auto" }}
            variant={progress === 0 || progress === 100 ? "indeterminate" : "determinate"}
            size="3.5rem"
            value={progress}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default Loader;
