import { useState } from "react";
import { Typography, Card, CardContent, Container, Button, Zoom } from "@mui/material";
import { navigate } from "@reach/router";

const Share = ({ mode, hymn }) => {
  const [out, setOut] = useState(false);

  return (
    <Container
      sx={{
        marginTop: 2,
        marginBottom: 2,
        padding: (3, 2),
      }}
      maxWidth="xs"
    >
      <Zoom
        in={!out}
        timeout={300}
        onExited={() => {
          navigate(`/load/${mode}/${hymn}`);
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h1" display="block" align="center" gutterBottom>
              💌
            </Typography>
            <Typography variant="h6" display="block" align="center" gutterBottom>
              Sobre
            </Typography>
            <Typography variant="body2" display="block" align="center" gutterBottom>
              Este aplicativo foi construído para reproduzir hinos do Hinário Adventista do Sétimo Dia. Os hinos e as
              letras são propriedades da Casa Publicadora Brasileira.
            </Typography>
            <Button
              disableRipple
              fullWidth
              sx={{ marginTop: 3 }}
              onClick={() => {
                setOut(true);
              }}
            >
              Entendi
            </Button>
          </CardContent>
        </Card>
      </Zoom>
    </Container>
  );
};

export default Share;
