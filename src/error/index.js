import { Typography, Card, CardContent, Container, Button } from "@mui/material";
import { navigate } from "@reach/router";

const Error = () => (
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
        <Typography variant="h1" display="block" align="center" gutterBottom>
          ⚠️
        </Typography>
        <Typography variant="h6" display="block" align="center" gutterBottom>
          Algum erro ocorreu
        </Typography>
        <Typography variant="body2" display="block" align="center" gutterBottom>
          Verifique sua conexão com a internet. Se estiver tudo certo, talvez este erro seja porque atingimos o limite
          diário de requisições de hinos. Tente novamente mais tarde, amanhã preferencialmente.
        </Typography>
        <Typography variant="body2" display="block" align="center" gutterBottom>
          Note que mesmo sem conexão ainda é possível ouvir os hinos que já foram baixados.
        </Typography>
        <Button
          disableRipple
          fullWidth
          sx={{ marginTop: 3 }}
          onClick={() => {
            navigate("/");
          }}
        >
          Voltar
        </Button>
      </CardContent>
    </Card>
  </Container>
);

export default Error;
