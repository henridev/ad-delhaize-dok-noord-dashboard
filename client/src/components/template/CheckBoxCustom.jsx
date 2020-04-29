import React, { useState } from "react";
import { Checkbox, FormControlLabel } from "../../modules/material";

export default function CheckBoxCustom({ setFormValues, formValues }) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          onChange={() => {
            setFormValues({ ...formValues, isMonth: !formValues.isMonth });
          }}
          checked={formValues.isMonth}
          value="isMonth"
          color="primary"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      }
      label="broodje van de maand?"
    />
  );
}
