import * as React from "react";
import Button from "@mui/material/Button";
import { responsiveFontSizes, styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { WidthFull } from "@mui/icons-material";
import { text } from "stream/consumers";
import { colors } from "@mui/material";
import Link from "@mui/material/Link";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "50rem",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
interface SuccessMessageProps {
  open: boolean;
  handleClose: () => void;
}
export default function SuccessDialog({
  open,
  handleClose,
}: SuccessMessageProps) {
  return (
    <React.Fragment>
      <BootstrapDialog
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Success
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Typography
            gutterBottom
            sx={{ fontSize: "2rem", textAlign: "center" }}
          >
            Your Account is Created !
          </Typography>
        </DialogContent>

        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Link href={"/"} sx={{ color: "white" }}>
            <Button
              sx={{
                width: "20rem",
                background: "#2563eb",
                color: "white",
                ":hover": {
                  background: "#3b82f6",
                },
              }}
            >
              {" "}
              Sign in
            </Button>
          </Link>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
