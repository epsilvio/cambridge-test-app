import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { NextRoundModalProps } from "./types";

const NextRoundModal: React.FC<NextRoundModalProps> = ({ onConfirm, show }) => {
  const handleClose = () => {
    // Prevent closing the modal when the button is pressed
    return;
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle>
        <strong>Next Round</strong>
      </DialogTitle>
      <Divider sx={{ margin: 0 }} />
      <DialogContent>
        You just finished this round. Going to the next one...
      </DialogContent>
      <Divider sx={{ margin: 0 }} />
      <Button
        variant="contained"
        sx={{ backgroundColor: "#a009db" }}
        onClick={handleConfirm}
      >
        LET'S GO!
      </Button>
    </Dialog>
  );
};

export default NextRoundModal;
