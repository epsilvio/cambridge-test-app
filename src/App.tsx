import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import fetchData from "./api/fetchQuestions";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import LoadingScreen from "./components/LoadingScreen";

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/epsilvio">
        Elisha Silvio
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface APIdata {
  name: string;
  heading: string;
  activities: string[];
}

const useStyles = makeStyles(() => ({
  logo: {
    marginRight: defaultTheme.spacing(2),
    height: defaultTheme.mixins.toolbar.minHeight,
  },
}));

const HomeScreen = () => {
  // Initialize state variables
  const [apiData, setApiData] = useState<APIdata | null>();
  const [isReady, setReady] = useState<boolean>(false);

  useEffect(() => {
    try {
      fetchData("/api/payload.json").then((response) => {
        setApiData(response);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    apiData !== null ? setReady(true) : void 0;
  }, [apiData]);

  const classes = useStyles();

  return (
    <>
      {!!isReady ? (
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <AppBar position="relative" sx={{ backgroundColor: "#7C7C7C" }}>
            <Toolbar>
              <img src="/CUPA-logo.png" alt="Logo" className={classes.logo} />
              <Typography variant="h6" color="inherit" noWrap></Typography>
            </Toolbar>
          </AppBar>
          <main>
            {/* Hero unit */}
            <Box
              sx={{
                bgcolor: "background.paper",
                pt: 28,
                pb: 6,
              }}
            >
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  {apiData?.name}
                </Typography>
                <Typography
                  variant="h6"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  {apiData?.heading}
                </Typography>
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#7C7C7C" }}
                  >
                    Start Quiz!
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ borderColor: "#7C7C7C", color: "#7C7C7C" }}
                  >
                    View My Scores
                  </Button>
                </Stack>
              </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
              {/* End hero unit */}
              <Grid container spacing={4}>
                <br />
                <br />
                <br />
                <br />
                <br />
              </Grid>
            </Container>
          </main>
          {/* Footer */}
          <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
              Error Find
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              component="p"
            >
              This is a test application for Cambridge built in React and
              TypeScript.
            </Typography>
            <Copyright />
          </Box>
          {/* End footer */}
        </ThemeProvider>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default HomeScreen;
