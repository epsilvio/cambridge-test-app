import React, { useState, useEffect } from "react";
import { Typography, Button, Stack } from "@mui/material";
import GameResultModal from "./GameResultModal";
import { ActivityProps, FormattedStringProps } from "./types";

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

const setScoreCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + value + expires + "; path=/";
};

const ActivityTwo: React.FC<ActivityProps> = ({
  activity_name,
  order,
  questions,
}) => {
  const [roundNum, setRoundNum] = useState<number>(1);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [qCount, setQcount] = useState<number>(1);
  const [currentQ, setCurrentQ] = useState<string>("");

  const nextRound = () => {
    setRoundNum(roundNum + 1);
    setQcount(1);
  };

  const showScores = () => {
    var counter = 0;
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
    setShowResult(true);
  };

  useEffect(() => {
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
  }, [qCount]);

  return (
    <>
      <GameResultModal
        onConfirm={() => window.location.reload()}
        showResult={showResult}
        activity_name={activity_name}
        order={order}
        questions={questions}
      />
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
      <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
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

export default ActivityTwo;
