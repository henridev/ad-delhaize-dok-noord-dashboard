import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

export default function MaterialUIPickers(props) {
  const { label, isStart, filterValues, setFilterValues } = props;

  const handleDateChange = date => {
    console.log("date", date);
    if (isStart) {
      setFilterValues({ ...filterValues, startDate: date });
    } else {
      setFilterValues({ ...filterValues, endDate: date });
    }
  };
  console.log("filterValues.startDate", filterValues.startDate);
  console.log("filterValues.endDate", filterValues.endDate);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        id="date-picker-inline"
        label={label}
        value={isStart ? filterValues.startDate : filterValues.endDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
