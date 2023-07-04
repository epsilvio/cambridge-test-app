import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";

type ActivityProps = {
  activity_name: string;
  order: number;
  questions: QuestionType[];
};

type FormattedStringProps = {
  text: string;
};

type ResultModalProps = {
  onConfirm: () => void;
};

interface QuestionType {
  round_title?: string;
  questions?: Question[];
  is_correct?: boolean;
  stimulus?: string;
  order?: number;
  user_answers?: boolean[];
  feedback?: string;
}

interface Question {
  is_correct: boolean;
  stimulus: string;
  order: number;
  user_answers: boolean[];
  feedback: string;
}

const setScoreCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + value + expires + "; path=/";
};

const ActivityField: React.FC<ActivityProps> = ({
  activity_name,
  order,
  questions,
}) => {
  const [roundNum, setRoundNum] = useState<number>(1);
  const [qCount, setQcount] = useState<number>(1);
  const [currentQ, setCurrentQ] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);

  const FormattedString: React.FC<FormattedStringProps> = ({ text }) => {
    const parts = text.split("*");
    const formattedText = parts.map((part, index) => {
      if (index % 2 === 0) {
        return part;
      } else {
        return <strong key={index}>{part}</strong>;
      }
    });

    return (
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        {formattedText}
      </Typography>
    );
  };

  useEffect(() => {
    if (order === 1) {
      questions.map((question) => {
        if (question?.order === qCount) {
          question?.stimulus && setCurrentQ(question.stimulus);
        }
        return null;
      });
    } else if (order === 2) {
      questions.map((round) => {
        round?.questions &&
          round.questions.map((question) => {
            if (round.order === roundNum) {
              if (question.order === qCount) setCurrentQ(question.stimulus);
            }
            return null;
          });
        return null;
      });
    }
  }, [qCount]);

  const showScores = () => {
    var counter = 0;
    if (order === 1) {
      questions.map((question) => {
        if (
          question?.user_answers &&
          question.is_correct === question.user_answers[0]
        )
          counter++;
        return null;
      });

      setScoreCookie("act1_score", counter.toString(), 365);
    } else if (order === 2) {
      questions.map((round) => {
        round?.questions &&
          round.questions.map((question) => {
            if (
              question?.user_answers &&
              question.is_correct === question.user_answers[0]
            )
              counter++;
            return null;
          });
        return null;
      });

      setScoreCookie("act2_score", counter.toString(), 365);
    }
    setShowResult(true);
  };

  const GameResultModal: React.FC<ResultModalProps> = ({ onConfirm }) => {
    const handleClose = () => {
      // Prevent closing the modal when the button is pressed
      return;
    };

    const handleConfirm = () => {
      setShowResult(false);
      onConfirm();
    };

    return (
      <Dialog open={showResult} onClose={handleClose}>
        <DialogTitle>
          <strong>{activity_name} Results</strong>
        </DialogTitle>
        <Divider sx={{ margin: 0 }} />
        <DialogContent>
          {order === 1
            ? questions.map((question, index) => (
                <Typography
                  key={"question-" + index}
                  variant="h6"
                  align="left"
                  color="text.secondary"
                  paragraph
                >
                  {question?.user_answers &&
                    "Question " +
                      (index + 1) +
                      " - " +
                      (question.is_correct === question.user_answers[0]
                        ? "CORRECT"
                        : "INCORRECT")}
                </Typography>
              ))
            : questions.map((round, index1) => {
                return (
                  <>
                    <Typography
                      key={"round-" + (index1 + 1)}
                      variant="h6"
                      align="left"
                      color="text.secondary"
                      paragraph
                    >
                      <strong>Round {index1 + 1}</strong>
                    </Typography>
                    {round.questions?.map((question, index2) => (
                      <Typography
                        key={
                          "round-" + (index1 + 1) + "-question-" + (index2 + 1)
                        }
                        variant="h6"
                        align="left"
                        color="text.secondary"
                        paragraph
                      >
                        {question?.user_answers &&
                          "Question " +
                            (index2 + 1) +
                            " - " +
                            (question.is_correct === question.user_answers[0]
                              ? "CORRECT"
                              : "INCORRECT")}
                      </Typography>
                    ))}
                  </>
                );
              })}
        </DialogContent>
        <Divider sx={{ margin: 0 }} />
        <Button
          variant="contained"
          sx={{ backgroundColor: "#a009db" }}
          onClick={handleConfirm}
        >
          Go To Home
        </Button>
      </Dialog>
    );
  };

  const ActivityOne = () => {
    return (
      <>
        <GameResultModal onConfirm={() => window.location.reload()} />
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          {activity_name}
        </Typography>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          {"Q" + qCount + "."}
        </Typography>
        <FormattedString text={currentQ} />
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            onClick={() => {
              questions
                .filter((val) => val.order === qCount)[0]
                .user_answers?.push(true);
              qCount < questions.length ? setQcount(qCount + 1) : showScores();
            }}
            sx={{ backgroundColor: "#a009db" }}
          >
            Correct
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              questions
                .filter((val) => val.order === qCount)[0]
                .user_answers?.push(false);
              qCount < questions.length ? setQcount(qCount + 1) : showScores();
            }}
            sx={{ backgroundColor: "#a009db" }}
          >
            Incorrect
          </Button>
        </Stack>
      </>
    );
  };

  const ActivityTwo = () => {
    const nextRound = () => {
      setRoundNum(roundNum + 1);
      setQcount(1);
    };

    return (
      <>
        <GameResultModal onConfirm={() => window.location.reload()} />
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          {activity_name}
        </Typography>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          {"Round #" + roundNum + " Q" + qCount + "."}
        </Typography>
        <FormattedString text={currentQ} />
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            onClick={() => {
              questions.map((round) => {
                if (round.order === roundNum) {
                  round?.questions &&
                    round.questions
                      .filter((question) => question.order === qCount)[0]
                      .user_answers.push(true);
                }
                return null;
              });
              questions.map((round) => {
                round?.questions && qCount < round.questions.length
                  ? setQcount(qCount + 1)
                  : roundNum < questions.length
                  ? nextRound()
                  : showScores();

                return null;
              });
            }}
            sx={{ backgroundColor: "#a009db" }}
          >
            Correct
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              questions.map((round) => {
                if (round.order === roundNum) {
                  round?.questions &&
                    round.questions
                      .filter((question) => question.order === qCount)[0]
                      .user_answers.push(false);
                }
                return null;
              });
              questions.map((round) => {
                round?.questions && qCount < round.questions.length
                  ? setQcount(qCount + 1)
                  : roundNum < questions.length
                  ? nextRound()
                  : showScores();

                return null;
              });
            }}
            sx={{ backgroundColor: "#a009db" }}
          >
            Incorrect
          </Button>
        </Stack>
      </>
    );
  };

  return (
    <>
      <Container maxWidth="sm">
        {order === 1 ? <ActivityOne /> : <ActivityTwo />}
      </Container>
    </>
  );
};

export default ActivityField;
