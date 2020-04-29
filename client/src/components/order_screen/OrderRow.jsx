import React, { useState } from "react";

import { readableDate } from "../../functions/functions";
import Sandwich_List from "./Sandwich_list";

import { Button, TableCell, TableRow, Checkbox } from "../../modules/material";

export default function Order({
  row,
  headCells,
  handleClick,
  labelId,
  selectedItems
}) {
  const [showDetails, setShowDetails] = useState(false);
  const isSelected = name => selectedItems.indexOf(name) !== -1;
  return (
    <>
      <TableRow
        hover
        onClick={event => handleClick(event, row.id)}
        role="checkbox"
        aria-checked={isSelected(row.id)}
        tabIndex={-1}
        key={row.name}
        selected={isSelected(row.id)}
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked={isSelected(row.id)}
            inputProps={{ "aria-labelledby": labelId }}
          />
        </TableCell>
        {headCells.map(({ id, numeric }) => {
          const cellid = id;
          if (cellid !== "details") {
            return (
              <TableCell
                component="th"
                align={numeric ? "center" : "left"}
                id={labelId}
                scope="row"
                padding="none"
              >
                {cellid !== "timeOrder"
                  ? row[cellid]
                  : readableDate(row[cellid])}
              </TableCell>
            );
          }
          return (
            <TableCell align="right">
              <Button
                style={{
                  color: showDetails ? "white" : "white",
                  backgroundColor: showDetails ? "red" : "green"
                }}
                onClick={e => {
                  e.stopPropagation();
                  setShowDetails(!showDetails);
                }}
              >
                {showDetails ? "verberg details" : "toon"}
              </Button>
            </TableCell>
          );
        })}
      </TableRow>
      {showDetails && (
        <TableRow>
          <TableCell align="right" colSpan={7}>
            <div className="sandwich_list_wrapper">
              {row.orders.map(sandwich => {
                return (
                  <Sandwich_List
                    key={sandwich.id}
                    sandwich={sandwich}
                  ></Sandwich_List>
                );
              })}
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
