import React from "react";
import DatePicker from "../template/DatePicker";
import {
  Card,
  CardContent,
  Typography,
  makeStyles
} from "../../modules/material";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: "20px"
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

export default function Filter({ filterValues, setFilterValues, children }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className="filter-item">
          <DatePicker
            label="start"
            filterValues={filterValues}
            isStart={true}
            setFilterValues={setFilterValues}
          ></DatePicker>
        </div>
        <div className="filter-item">
          <DatePicker
            label="einde"
            filterValues={filterValues}
            isStart={false}
            setFilterValues={setFilterValues}
          ></DatePicker>
        </div>
        <div className="filter-item">{children}</div>
      </CardContent>
    </Card>
  );
}
