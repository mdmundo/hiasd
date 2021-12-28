import { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, CardContent, CardActions, Grid, IconButton, Tooltip, Container, Box } from "@mui/material";
import { ArrowBack, Favorite } from "@mui/icons-material";
import { navigate } from "@reach/router";
// import context from "../../context";
import hymns from "./hymns";
import { setFavorite, getFavorites } from "../common/favorites";

// const useStyles = makeStyles((theme) => ({
//   action: {
//     marginTop: theme.spacing(5),
//   },
//   caption: {
//     marginBottom: theme.spacing(2),
//   },

//   stanza: {
//     marginBottom: theme.spacing(2),
//   },
//   lyrics: {
//     marginTop: theme.spacing(8),
//   },
// }));

const Player = ({ mode, hymn: number, url }) => {
  // const { hymnState, URIDispatch, finishedDispatch } = useContext(context);

  // const hymn = hymns[hymnState - 1];
  const hymn = hymns[number - 1];

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    getFavorites().then((favorites) => {
      setIsFavorite(favorites.includes(number));
    });
    // }, [hymnState]);
  }, [number]);

  // const onFinished = () => {
  //   URIDispatch('');
  //   finishedDispatch(true);
  // };

  const onFavorite = async () => {
    // await setFavorite(hymnState, isFavorite);
    await setFavorite(number, isFavorite);
    setIsFavorite(!isFavorite);
  };

  // const classes = useStyles();

  return (
    <Container
      sx={{
        marginTop: 2,
        marginBottom: 2,
        // padding: (3, 2),
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
