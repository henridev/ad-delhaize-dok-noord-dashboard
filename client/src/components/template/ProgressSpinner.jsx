import React from "react";

import { spinnerStyle } from "../../styles/material/makeStyles";

import { CircularProgress, makeStyles } from "../../modules/material";

const useStyles = makeStyles(spinnerStyle);

export default function ProgressSpinner(props) {
  const classes = useStyles();
  const { waittext } = props;
  return (
    <div className={classes.root}>
      <CircularProgress />
      <hr />
      <div>
        <b>{waittext}</b>
      </div>
    </div>
  );
}
