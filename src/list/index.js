import { useState, useEffect } from "react";
import { Chip, Grid, IconButton, Typography, Container, Card, CardContent, CardActions } from "@mui/material";
import { MusicOff, MusicNote } from "@mui/icons-material";
import { navigate } from "@reach/router";
import Instrumental from "./InstrumentalIcon";
import sorted from "./categories.json";
import hymns from "./options.json";
import categories from "./list.json";
import { getFavorites } from "../common/favorites";

const List = () => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(categories[0]);

  useEffect(() => {
    getFavorites().then((numbers) => {
      const favorites = numbers.map((favorite) => {
        const { hymn, number } = hymns[favorite - 1];

        return { hymn, number };
      });

      const options = { ...sorted, Favoritos: favorites };

      setOptions(options);
    });
  }, []);

  return (
    <Container sx={{ my: 2 }}>
      <Grid container sx={{ mb: 2 }} direction="row" justifyContent="center" alignItems="flex-start" spacing={0.7}>
        {["Favoritos", ...categories].map((category) => (
          <Grid key={category} item>
            <Chip
              label={category}
              variant={selected === category ? "filled" : "outlined"}
              color="primary"
              size="small"
              onClick={() => {
                if (selected !== category) {
                  setSelected(category);
                }
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
        {options[selected]?.length > 0 &&
          options[selected].map((option, index) => (
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
