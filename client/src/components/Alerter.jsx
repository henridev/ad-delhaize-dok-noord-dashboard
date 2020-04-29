import React, { useEffect } from "react";
import {
  makeStyles,
  Alert,
  Dialog,
  DialogContent,
  DialogActions,
  Button
} from "../modules/material";
import { useState } from "react";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function Alerter({ type, text, open, setOpen, time }) {
  const classes = useStyles();
  useEffect(() => {
    setTimeout(() => {
      setOpen();
    }, Number(time));
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Alert severity={type}>{text}</Alert>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
