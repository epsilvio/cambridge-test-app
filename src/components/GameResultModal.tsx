import { ResultModalProps } from "./types";
import {
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";

const GameResultModal: React.FC<ResultModalProps> = ({
  onConfirm,
  showResult,
  activity_name,
  questions,
  order,
}) => {
  const handleClose = () => {
    // Prevent closing the modal when the button is pressed
    return;
  };

  const handleConfirm = () => {
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

export default GameResultModal;
