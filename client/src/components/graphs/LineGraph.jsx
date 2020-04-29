import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import {
  Select,
  MenuItem,
  ListSubheader,
  InputLabel,
  makeStyles,
  FormControl
} from "../../modules/material";
import React, { useState } from "react";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function LineGraph(props) {
  const classes = useStyles();
  const [yAxisValue, setyAxisValue] = useState("totaal");
  const { data } = props;
  const options = Object.keys(data[0]);

  console.log(data);
  return (
    <div>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey={yAxisValue} stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip />
        <XAxis dataKey="datum" />
        <YAxis />
      </LineChart>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">grafiek voor</InputLabel>
        <Select
          defaultValue=""
          id="grouped-select"
          onChange={e => setyAxisValue(e.target.value)}
        >
          {options.map(option => {
            return <MenuItem value={option}>{option}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
