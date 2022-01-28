import { useState, useEffect, useContext } from "react";
import {
  Chip,
  Grid,
  IconButton,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Tooltip,
  RadioGroup,
  Radio,
  Grow,
  Zoom,
} from "@mui/material";
import { MusicOff, MusicNote } from "@mui/icons-material";
import { navigate } from "@reach/router";
import Category from "./Category";
import Instrumental from "./InstrumentalIcon";
import sorted from "./sorted.json";
import hymns from "./hymns.json";
import categories from "./categories.json";
import { getFavorites } from "../common/favorites";

const List = () => {
  const { category: selected, setCategory: setSelected } = useContext(Category);

  const [options, setOptions] = useState(sorted);
  const [growOut, setGrowOut] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);
  const [category, setCategory] = useState(selected);
  const [onExit, setOnExit] = useState();

  useEffect(() => {
    getFavorites().then((numbers) => {
      const favorites = numbers.map((favorite) => hymns[favorite - 1]);

      const options = { ...sorted, Favoritos: favorites };

      setOptions(options);
    });
  }, []);

  return (
    <Container sx={{ my: 2 }}>
      <Zoom
        in={!zoomOut}
        timeout={300}
        onExited={() => {
          navigate(onExit);
        }}
      >
        <div>
          <RadioGroup
            value={selected}
            onChange={(e, value) => {
              setGrowOut(true);
              setSelected(value);
            }}
          >
            <Grid
              container
              sx={{ mb: 2 }}
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              spacing={0.7}
            >
              {["Favoritos", ...categories].map((category) => {
                return (
                  <Grid key={category} item>
                    <Radio
                      sx={{
                        p: 0,
                        "&:hover": {
                          background: "none",
                        },
                      }}
                      icon={<Chip label={category} variant="outlined" color="primary" size="small" />}
                      checkedIcon={<Chip label={category} variant="filled" color="primary" size="small" />}
                      value={category}
                      size="small"
                      disableRipple
                    />
                  </Grid>
                );
              })}
            </Grid>
          </RadioGroup>
          <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
            {options[category]?.length > 0 ? (
              options[category].map((option, index) => (
                <Grow
                  key={`${index}${option.number}`}
                  timeout={growOut ? 300 : 200 * index}
                  in={!growOut}
                  onExited={() => {
                    if (growOut) {
                      setGrowOut(false);
                      setCategory(selected);
                    }
                  }}
                >
                  <Grid item>
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
                        <Tooltip title="Cantado">
                          <IconButton
                            size="small"
                            disableRipple
                            onClick={() => {
                              setOnExit(`/load/sung/${option.number}`);
                              setZoomOut(true);
                            }}
                          >
                            <MusicNote fontSize="small" color="primary" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Instrumental">
                          <IconButton
                            size="small"
                            disableRipple
                            onClick={() => {
                              setOnExit(`/load/instrumental/${option.number}`);
                              setZoomOut(true);
                            }}
                          >
                            <Instrumental fontSize="small" color="primary" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Letra">
                          <IconButton
                            size="small"
                            disableRipple
                            onClick={() => {
                              setOnExit(`/load/lyrics/${option.number}`);
                              setZoomOut(true);
                            }}
                          >
                            <MusicOff fontSize="small" color="primary" />
                          </IconButton>
                        </Tooltip>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grow>
              ))
            ) : (
              <Grow
                timeout={300}
                in={!growOut}
                onExited={() => {
                  setGrowOut(false);
                  setCategory(selected);
                }}
              >
                <Grid item>
                  <Card>
                    <CardContent>
                      <Typography sx={{ p: 2 }} variant="h1" display="block" align="center">
                        {"🍪"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grow>
            )}
          </Grid>
        </div>
      </Zoom>
    </Container>
  );
};

export default List;
