import {
  Modal,
  Button,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { useState, useEffect } from "react";

interface ScoreType {
  act1_score: number;
  act2_score: number;
}

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const getScoreCookies = (): ScoreType => {
  let score_temp: ScoreType = { act1_score: 0, act2_score: 0 };
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split("=");
    if (cookieName === "act1_score") {
      score_temp.act1_score = parseInt(cookieValue);
    }
    if (cookieName === "act2_score") {
      score_temp.act2_score = parseInt(cookieValue);
    }
  }
  return score_temp;
};

const ScoresModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [act1Score, setAct1Score] = useState<number>(0);
  const [act2Score, setAct2Score] = useState<number>(0);
  const classes = useStyles();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setAct1Score(getScoreCookies().act1_score);
    setAct2Score(getScoreCookies().act2_score);
  }, []);

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpen}
        sx={{ borderColor: "#a009db", color: "#a009db" }}
      >
        View My Scores
      </Button>
      <Modal className={classes.modal} open={open} onClose={handleClose}>
        <Card>
          <CardHeader
            title="My Score History"
            titleTypographyProps={{ variant: "h6" }}
          />
          <Divider sx={{ margin: 0 }} />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  Your last score in Activity 1 was{" "}
                  <strong>{act1Score + "/5"}</strong>
                </Typography>
                <Typography variant="h6">
                  Your last score in Activity 2 was{" "}
                  <strong>{act2Score + "/4"}</strong>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  sx={{ backgroundColor: "#a009db" }}
                >
                  Go to Home
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default ScoresModal;
