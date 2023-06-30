import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getDataFromAxios } from "./api/fetchQuestions";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import LoadingScreen from "./components/LoadingScreen";
import ScoresModal from "./components/ScoresModal";
import ActivityField from "./components/ActivityField";
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

type HomeScreenProps = {
  name: string;
  description: string;
  activities: ActivityType[];
};

type GameScreenProps = {
  activity: ActivityType;
};

interface APIdata {
  name: string;
  heading: string;
  activities: ActivityType[];
}

interface ActivityType {
  activity_name: string;
  order: number;
  questions: QuestionType[];
}

interface QuestionType {
  round_title?: string;
  questions?: Question[];
  is_correct?: boolean;
  stimulus?: string;
  order?: number;
  user_answers?: [];
  feedback?: string;
}

interface Question {
  is_correct: boolean;
  stimulus: string;
  order: number;
  user_answers: boolean[];
  feedback: string;
}

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
        <ActivityField
          activity_name={activity.activity_name}
          order={activity.order}
          questions={activity.questions}
        />
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
              (activity: ActivityType) => activity.order === 1
            )[0]
          }
        />
      ) : pageContent === "game2" ? (
        <GameContent
          activity={
            activities.filter(
              (activity: ActivityType) => activity.order === 2
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
            position="fixed"
            left={0}
            bottom={0}
            width="100%"
            p={2}
            sx={{ bgcolor: "background.paper", p: 6 }}
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
