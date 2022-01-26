import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Autocomplete,
  Grid,
  Tooltip,
  IconButton,
  Typography,
  Container,
  Stack,
  ListItem,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { MusicOff, MusicNote } from "@mui/icons-material";
import { navigate } from "@reach/router";
import Instrumental from "./InstrumentalIcon";
import hymns from "./options.json";
import { getFavorites } from "../common/favorites";

const List = () => {
  const [hymn, setHymn] = useState(1);
  const [mode, setMode] = useState("sung");
  const [options, setOptions] = useState(hymns);

  //   const onSubmit = (e) => {
  //     e.preventDefault();

  //     if (isNaN(hymn) || parseInt(hymn) < 1 || parseInt(hymn) > 613) return;

  //     navigate(`/load/${mode}/${hymn}`);
  //     // maybe save current hymn and mode...
  //   };

  useEffect(() => {
    getFavorites().then((favorites) => {
      const favoritesToOptions = favorites.map((favorite) => {
        const option = hymns[favorite - 1];

        return { ...option, category: "Favoritos" };
      });

      const favoritesPlusHymns = favoritesToOptions.concat(hymns);

      setOptions(favoritesPlusHymns);
    });
  }, []);

  return (
    <Container sx={{ my: 2 }}>
      <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
        {hymns.map((hymn) => (
          <Grid item>
            <Card>
              <CardContent>
                <Typography variant="button" display="block" align="center" gutterBottom>
                  {hymn.number}
                </Typography>
                <Typography>{hymn.hymn}</Typography>
                <Typography color="text.secondary" variant="caption" display="block">
                  {hymn.category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default List;
