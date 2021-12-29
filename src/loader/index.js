import { useEffect, useState } from "react";
import { CircularProgress, Typography, Card, CardContent, Container } from "@mui/material";
import { navigate } from "@reach/router";
import { getHymn } from "./hymn";
import { getPath } from "./parser";

const Loader = ({ mode, hymn }) => {
  const [progress, setProgress] = useState(0);
  const path = getPath({ mode, hymn });

  useEffect(() => {
    if (mode !== "lyrics") {
      getHymn(path, setProgress).then((hymnURI) => {
        if (hymnURI) {
          navigate(`/play/${mode}/${hymn}/${encodeURIComponent(hymnURI)}`, { replace: true });
        } else {
          navigate("/error", { replace: true });
        }
      });
    } else {
      navigate(`/play/${mode}/${hymn}`, { replace: true });
    }
  }, [path, hymn, mode]);

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
