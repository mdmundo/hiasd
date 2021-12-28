import { useState, useEffect } from "react";
import { Button, TextField, Autocomplete, Grid, Tooltip, IconButton, Container } from "@mui/material";
import { MusicOff, MusicNote } from "@mui/icons-material";
import Instrumental from "./InstrumentalIcon";
import hymns from "./options.json";
import { getFavorites } from "../common/favorites";

const Selector = () => {
  const [input, setInput] = useState("");
  const [hymn, setHymn] = useState(1);
  const [mode, setMode] = useState("sung");
  const [options, setOptions] = useState(hymns);

  const onSubmit = (e) => {
    e.preventDefault();

    if (isNaN(hymn) || parseInt(hymn) < 1 || parseInt(hymn) > 613) return;

    // NAVIGATE TO ROUTE
    // maybe save current hymn and mode...
  };

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
    <Container
      sx={{
        marginTop: 2,
        marginBottom: 2,
        padding: (3, 2),
      }}
      maxWidth="xs"
    >
      <form
        sx={{
          width: "100%",
          marginTop: 1,
          paddingBottom: 3,
        }}
        onSubmit={onSubmit}
        noValidate
      >
        <Autocomplete
          value={hymns[hymn - 1]}
          onChange={(e, value) => setHymn(value.number)}
          inputValue={input}
          onInputChange={(e, value) => setInput(value)}
          autoHighlight
          disableClearable
          sx={{ paddingBottom: 2 }}
          fullWidth
          options={options}
          noOptionsText="Sem Opções"
          groupBy={(option) => option.category}
          getOptionLabel={(option) => `${parseInt(option.number)} \u2012 ${option.hymn}`}
          renderInput={(params) => <TextField {...params} label="Selecione o Hino" variant="outlined" />}
        />
        <Grid container direction="row" justify="space-around" alignItems="center" spacing={1}>
          <Grid item xs={2}>
            <Tooltip title="Cantado">
              <IconButton
                onClick={() => {
                  setMode("sung");
                }}
              >
                <MusicNote color={mode === "sung" ? "primary" : "action"} />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Instrumental">
              <IconButton
                onClick={() => {
                  setMode("instrumental");
                }}
              >
                <Instrumental color={mode === "instrumental" ? "primary" : "action"} />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Letra">
              <IconButton
                onClick={() => {
                  setMode("lyrics");
                }}
              >
                <MusicOff color={mode === "lyrics" ? "primary" : "action"} />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              {mode !== "lyrics" ? "Tocar Hino" : "Ver Letra"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Selector;
