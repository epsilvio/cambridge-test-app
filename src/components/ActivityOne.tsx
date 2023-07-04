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

const ActivityOne: React.FC<ActivityProps> = ({
  activity_name,
  order,
  questions,
}) => {
  const [showResult, setShowResult] = useState<boolean>(false);
  const [qCount, setQcount] = useState<number>(1);
  const [currentQ, setCurrentQ] = useState<string>("");

  const showScores = () => {
    var counter = 0;
    questions.map((question) => {
      if (
        question?.user_answers &&
        question.is_correct === question.user_answers[0]
      )
        counter++;
      return null;
    });

    setScoreCookie("act1_score", counter.toString(), 365);
    setShowResult(true);
  };

  useEffect(() => {
    questions.map((question) => {
      if (question?.order === qCount) {
        question?.stimulus && setCurrentQ(question.stimulus);
      }
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
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        {"Q" + qCount + "."}
      </Typography>
      <FormattedString text={currentQ} />
      <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
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

export default ActivityOne;
