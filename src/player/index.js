import { useState, useEffect } from "react";
import { Typography, Card, CardContent, CardActions, Grid, IconButton, Tooltip, Container, Box } from "@mui/material";
import { ArrowBack, Favorite } from "@mui/icons-material";
import { navigate } from "@reach/router";
import hymns from "./hymns";
import { setFavorite, getFavorites } from "../common/favorites";

const Player = ({ hymn: number, url }) => {
  const hymn = hymns[number - 1];

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    getFavorites().then((favorites) => {
      setIsFavorite(favorites.includes(number));
    });
  }, [number]);

  const onFavorite = async () => {
    await setFavorite(number, isFavorite);
    setIsFavorite(!isFavorite);
  };

  return (
    <Container
      sx={{
        marginTop: 2,
        marginBottom: 2,
      }}
      maxWidth="xs"
    >
      <Card>
        <CardContent sx={{ minHeight: 40 }}>
          <Typography variant="caption" display="block" color="textSecondary" align="center" gutterBottom>
            {number}
          </Typography>
          <Typography sx={{ marginTop: 2, marginBottom: 5 }} variant="h3" align="center">
            {hymn.attributes.title}
          </Typography>
          <Typography
            sx={{ marginBottom: 1.5 }}
            variant="subtitle2"
            display="block"
            color="textSecondary"
            align="center"
          >
            {hymn.attributes.author}
          </Typography>
          <Typography
            sx={{ fontStyle: "italic" }}
            variant="caption"
            display="block"
            color="textSecondary"
            align="center"
          >
            {hymn.attributes.verse}
          </Typography>
          <Box sx={{ marginTop: 8 }}>
            {hymn.text.map((stanza, index) => {
              return (
                <Box key={index} sx={{ marginBottom: 2 }}>
                  {stanza.split("\n").map((str, index) => (
                    <Typography key={index} variant="body1">
                      {str}
                    </Typography>
                  ))}
                </Box>
              );
            })}
          </Box>
        </CardContent>
        <CardActions disableSpacing sx={{ marginTop: 5 }}>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Tooltip title="Voltar" placement="top-start">
              <IconButton
                onClick={() => {
                  navigate("/");
                }}
              >
                <ArrowBack />
              </IconButton>
            </Tooltip>
            <Tooltip title={isFavorite ? "Desfavoritar" : "Favoritar"} placement="top-end">
              <IconButton onClick={onFavorite} color={isFavorite ? "primary" : "default"}>
                <Favorite />
              </IconButton>
            </Tooltip>
          </Grid>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Player;
