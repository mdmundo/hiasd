import { useState, useEffect } from "react";
import { Grid, IconButton, Typography, Container, Card, CardContent, CardActions } from "@mui/material";
import { MusicOff, MusicNote } from "@mui/icons-material";
import { navigate } from "@reach/router";
import Instrumental from "./InstrumentalIcon";
import hymns from "./options.json";
import { getFavorites } from "../common/favorites";

const List = () => {
  const [options, setOptions] = useState(hymns);

  useEffect(() => {
    getFavorites().then((favorites) => {
      const favoritesToOptions = favorites.map((favorite) => {
        const option = hymns[favorite - 1];

        return { ...option, category: "Favoritos" };
      });

      const favoritesPlusHymns = hymns.concat(favoritesToOptions);

      setOptions(favoritesPlusHymns);
    });
  }, []);

  return (
    <Container sx={{ my: 2 }}>
      <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
        {options.map((option, index) => (
          <Grid item key={`${index}${option.number}`}>
            <Card>
              <CardContent>
                <Typography variant="button" display="block" align="center" gutterBottom>
                  {option.number}
                </Typography>
                <Typography>{option.hymn}</Typography>
                <Typography color="text.secondary" variant="caption" display="block">
                  {option.category}
                </Typography>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <IconButton
                  size="small"
                  disableRipple
                  onClick={() => {
                    navigate(`/load/sung/${option.number}`);
                  }}
                >
                  <MusicNote fontSize="small" color="primary" />
                </IconButton>
                <IconButton
                  size="small"
                  disableRipple
                  onClick={() => {
                    navigate(`/load/instrumental/${option.number}`);
                  }}
                >
                  <Instrumental fontSize="small" color="primary" />
                </IconButton>
                <IconButton
                  size="small"
                  disableRipple
                  onClick={() => {
                    navigate(`/load/lyrics/${option.number}`);
                  }}
                >
                  <MusicOff fontSize="small" color="primary" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default List;
