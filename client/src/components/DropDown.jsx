import React, { useState } from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  makeStyles
} from "../modules/material";

const useStyles = makeStyles(theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function DropDown({
  all_options_json,
  all_options_keys,
  option,
  setOption,
  optionLabel
}) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleChange = event => {
    console.log("change value to ", event.target.value);
    setOption(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">
          {optionLabel}
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={option}
          onChange={handleChange}
        >
          {all_options_keys.map(key => {
            return <MenuItem value={key}>{all_options_json[key]}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
