import { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  Tooltip,
  Container,
  Box,
  Zoom,
} from "@mui/material";
import { ArrowBack, Favorite, Share } from "@mui/icons-material";
import { navigate } from "@reach/router";
import hymns from "./hymns";
import { setFavorite, getFavorites } from "../common/favorites";

const Player = ({
  mode,
  hymn: number,
  location: {
    state: { url },
  },
}) => {
  const hymn = hymns[number - 1];

  const [isFavorite, setIsFavorite] = useState(false);
  const [out, setOut] = useState(false);

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
      <Zoom
        in={!out}
        timeout={1500}
        onExited={() => {
          navigate("/");
        }}
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
          <video autoPlay height={0} width={0} src={url} />
          <CardActions disableSpacing sx={{ marginTop: 5 }}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
              <Tooltip title="Voltar" placement="top-start">
                <IconButton
                  onClick={() => {
                    setOut(true);
                  }}
                >
                  <ArrowBack />
                </IconButton>
              </Tooltip>
              <Tooltip title="Compartilhar" placement="top">
                <IconButton
                  onClick={() => {
                    navigator.share({
                      title: "Hinário Adventista",
                      text: `${number} - ${hymn.attributes.title}`,
                      url: `${process.env.PUBLIC_URL}/share/${mode}/${number}`,
                    });
                  }}
                >
                  <Share />
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
      </Zoom>
    </Container>
  );
};

export default Player;
