import { Helmet } from "react-helmet";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getDataFromAxios } from "./api/fetchQuestions";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import LoadingScreen from "./components/LoadingScreen";
import ScoresModal from "./components/ScoresModal";
import ActivityOne from "./components/ActivityOne";
import ActivityTwo from "./components/ActivityTwo";
import {
  Button,
  Box,
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  Link,
  Grid,
  Stack,
  Container,
} from "@mui/material";
import {
  ActivityProps,
  HomeScreenProps,
  GameScreenProps,
  APIdata,
} from "./components/types";

const HomeScreen: React.FC<HomeScreenProps> = ({
  name,
  description,
  activities,
}) => {
  const [pageContent, setPageContent] = useState<string>("home");

  useEffect(() => {
    setPageContent("home");
  }, []);

  const HomeContent = () => (
    <main>
      {/* Hero unit */}
      <Box
        sx={{
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
            {name}
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
          >
            {description}
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              onClick={() => {
                setPageContent("game1");
              }}
              sx={{ backgroundColor: "#a009db" }}
            >
              Activity One
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setPageContent("game2");
              }}
              sx={{ backgroundColor: "#a009db" }}
            >
              Activity Two
            </Button>
            <ScoresModal />
          </Stack>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
            sx={{ marginTop: 5 }}
          >
            <strong>Instructions:</strong> A sentence would be flashed in the
            screen. Check if it's grammatically "Correct" or "Incorrect" by
            pressing the appropriate button. Refer to the highlighted part of
            the sentence for the tip.
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}></Grid>
      </Container>
    </main>
  );

  const GameContent: React.FC<GameScreenProps> = ({ activity }) => (
    <main>
      {/* Hero unit */}
      <Box
        sx={{
          pt: 28,
          pb: 6,
        }}
      >
        <Container maxWidth="sm"></Container>
        {activity.order === 1 ? (
          <ActivityOne
            activity_name={activity.activity_name}
            order={activity.order}
            questions={activity.questions}
          />
        ) : (
          <ActivityTwo
            activity_name={activity.activity_name}
            order={activity.order}
            questions={activity.questions}
          />
        )}
      </Box>
    </main>
  );

  return (
    <>
      {pageContent === "home" ? (
        <HomeContent />
      ) : pageContent === "game1" ? (
        <GameContent
          activity={
            activities.filter(
              (activity: ActivityProps) => activity.order === 1
            )[0]
          }
        />
      ) : pageContent === "game2" ? (
        <GameContent
          activity={
            activities.filter(
              (activity: ActivityProps) => activity.order === 2
            )[0]
          }
        />
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

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

const useStyles = makeStyles(() => ({
  logo: {
    marginRight: defaultTheme.spacing(2),
    height: defaultTheme.mixins.toolbar.minHeight,
  },
}));

const App = () => {
  // Initialize state variables and hooks
  const [apiData, setApiData] = useState<APIdata | null>();
  const [isReady, setReady] = useState<boolean>(false);
  const classes = useStyles();

  useEffect(() => {
    getDataFromAxios(
      "https://s3.eu-west-2.amazonaws.com/interview.mock.data/payload.json"
    )
      .then((val) => setApiData(val.data))
      .catch((error) => alert(error));
  }, []);

  useEffect(() => {
    apiData !== null && apiData !== undefined
      ? setReady(true)
      : setReady(false);
  }, [apiData]);

  return (
    <>
      {!!isReady && apiData ? (
        <ThemeProvider theme={defaultTheme}>
          <Helmet>
            <title>Error Find</title>
            <meta
              name="description"
              content="This game teaches you to find mistakes in written text."
            />
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Helmet>
          <CssBaseline />
          <AppBar position="relative" sx={{ backgroundColor: "#a009db" }}>
            <Toolbar>
              <img src="/CUPA-logo.png" alt="Logo" className={classes.logo} />
              <Typography variant="h6" color="inherit" noWrap></Typography>
            </Toolbar>
          </AppBar>
          <HomeScreen
            name={apiData.name}
            description={apiData.heading}
            activities={apiData.activities}
          />
          {/* Footer */}
          <Box
            textAlign="center"
            position="relative"
            left={0}
            bottom={0}
            width="100%"
            p={2}
            sx={{
              bgcolor: "background.paper",
              p: 6,
              zIndex: 1000, // Adjust the z-index value as needed
              "@media (max-width: 768px)": {
                position: "relative",
                bottom: "auto",
              },
            }}
            component="footer"
          >
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

export default App;
