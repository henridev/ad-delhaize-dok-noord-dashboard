import React, { useState } from "react";
import api from "../../api/sandwich";

import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog,
  TextField,
  Button,
  List,
  DeleteIcon,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  makeStyles,
  AddCircleOutlineIcon
} from "../../modules/material";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));

export default function EditForm({ open, sandwich, setOpen }) {
  const classes = useStyles();
  const [newIngredient, setNewIngredient] = useState("");
  const [formValues, setFormValues] = useState({
    name: sandwich.name.trim(),
    price: sandwich.price,
    ingredients: sandwich.ingredients,
    isMonth: sandwich.isMonth
  });

  /* HANDLERS */

  const handleSend = () => {
    console.log(sandwich);
    api.editSandwich(formValues);
  };
  const handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDelete = ingredient => {
    setFormValues({
      ...formValues,
      ingredients: formValues.ingredients.filter(ing => ing !== ingredient)
    });
  };

  const addIngredient = () => {
    if (newIngredient.length < 3) {
      return;
    }
    setFormValues({
      ...formValues,
      ingredients: [...formValues.ingredients, newIngredient]
    });
    setNewIngredient("");
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Aanpassing</DialogTitle>
      <DialogContent>
        <DialogContentText>aanpassing van het broodje</DialogContentText>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <TextField
              label="naam"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              autoFocus
              disabled
            />
            <TextField
              label="prijs"
              name="price"
              value={formValues.price}
              onChange={handleChange}
              type="number"
            />
          </div>
          <div>
            <List className={classes.root}>
              {formValues.ingredients.map(ingredient => {
                return (
                  <ListItem key={ingredient} role={undefined} dense button>
                    <ListItemText primary={`${ingredient}`} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={handleDelete.bind(this, ingredient)}
                      >
                        <DeleteIcon></DeleteIcon>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
            <div class="ingredient-edit">
              <TextField
                label="voeg ingredient toe"
                name="newingredient"
                value={newIngredient}
                onChange={e => setNewIngredient(e.target.value)}
              />
              <IconButton
                color="primary"
                aria-label="add to ingredients"
                onClick={addIngredient}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </div>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
          }}
          color="primary"
        >
          annuleer
        </Button>
        <Button onClick={handleSend} color="primary">
          pas aan
        </Button>
      </DialogActions>
    </Dialog>
  );
}
