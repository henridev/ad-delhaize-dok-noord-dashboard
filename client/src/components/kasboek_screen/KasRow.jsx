import React, { useState } from "react";
import { Button, TableCell, TableRow, Checkbox } from "../../modules/material";

export default function KasRow({
  row,
  headCells,
  labelId,
  selectedItems,
  handleClick
}) {
  const isSelected = name => selectedItems.indexOf(name) !== -1;

  return (
    <>
      <TableRow key={row.datum}>
        <TableCell padding="checkbox">
          <Checkbox
            onClick={e => handleClick(e, row.id)}
            checked={isSelected(row.id)}
            inputProps={{ "aria-labelledby": labelId }}
          />
        </TableCell>
        {headCells.map(({ id, numeric }) => {
          const cellid = id;
          if (cellid === "som_totaal") {
            return (
              <TableCell align="center">{row.som_totaal.toFixed(2)}</TableCell>
            );
          }
          if (cellid === "verschil") {
            return (
              <TableCell align="center">{row.verschil.toFixed(2)}</TableCell>
            );
          }
          return <TableCell align="center">{row[cellid]}</TableCell>;
        })}
      </TableRow>
    </>
  );
}
