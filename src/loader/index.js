import { useEffect, useState } from "react";
import { CircularProgress, Typography, Card, CardContent, Container, Fade } from "@mui/material";
import { navigate } from "@reach/router";
import { getHymn } from "./hymn";
import { getPath } from "./parser";

const Loader = ({ mode, hymn }) => {
  const [progress, setProgress] = useState(0);
  const [navStr, setNavStr] = useState();
  const [navOptions, setNavOptions] = useState();
  const [out, setOut] = useState(false);
  const path = getPath({ mode, hymn });

  useEffect(() => {
    let userStillAwaiting = true;
    if (mode !== "lyrics") {
      getHymn(path, setProgress).then((hymnURI) => {
        if (userStillAwaiting) {
          if (hymnURI) {
            setNavStr(`/play/${mode}/${hymn}`);
            setNavOptions({ state: { url: hymnURI }, replace: true });
            setOut(true);
          } else {
            setNavStr("/error");
            setNavOptions({ replace: true });
            setOut(true);
          }
        }
      });
    } else {
      setNavStr(`/play/${mode}/${hymn}`);
      setNavOptions({ replace: true });
      setOut(true);
    }

    return () => {
      userStillAwaiting = false;
    };
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
      <Fade
        in={!out}
        timeout={300}
        onExited={() => {
          navigate(navStr, navOptions);
        }}
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
      </Fade>
    </Container>
  );
};

export default Loader;
