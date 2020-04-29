import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import {
  Toolbar,
  Typography,
  Tooltip,
  DeleteIcon,
  FilterListIcon,
  IconButton,
  lighten,
  makeStyles
} from "../../../modules/material";

import { enchancedTableToolbarStyle } from "../../../styles/material/makeStyles";

const useToolbarStyles = makeStyles(enchancedTableToolbarStyle);

export default function EnhancedTableToolbar(props) {
  const classes = useToolbarStyles();
  const { numSelected, title } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} geselecteerd
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          overzicht {title}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={props.handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};
