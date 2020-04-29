import React from "react";
import { createIngredientsString } from "../../functions/functions";

import {
  List,
  ListItem,
  ListItemText,
  Divider,
  makeStyles
} from "../../modules/material";

import { enchancedTableStyle } from "../../styles/material/makeStyles";

const useStyles = makeStyles(enchancedTableStyle);

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function Sandwich_List({ sandwich }) {
  const classes = useStyles();
  console.log("sandwich", sandwich);
  if (!sandwich) {
    return <div>no orders at the moment</div>;
  }
  return (
    <div
      className={classes.root}
      style={{
        width: "300px",
        margin: "5px 10px",
        padding: "5px",
        border: "1px solid black",
        borderRadius: "5%"
      }}
    >
      <List component="nav" aria-label="main sandwich_overview">
        <ListItem>
          <ListItemText primary={sandwich.name} />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem>
          <ListItemText primary={sandwich.price} />
        </ListItem>
        <ListItem>
          <ListItemText primary={sandwich.isWhite ? "wit" : "bruin"} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={createIngredientsString(sandwich.ingredients)}
          />
        </ListItem>
      </List>
    </div>
  );
}
