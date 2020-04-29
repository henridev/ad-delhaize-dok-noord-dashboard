import React, { useEffect, useState } from "react";
import api from "../../api/sandwich";
import {
  TableContainer,
  Paper,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
  EditIcon,
  AddCircleIcon,
  DeleteIcon,
  makeStyles,
  Fab
} from "../../modules/material";

import ProgressSpinner from "../template/ProgressSpinner";
import EditForm from "../sandwich_screen/EditForm";
import CreateForm from "../sandwich_screen/CreateForm";
import Alerter from "../Alerter";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "naam"
  },
  { id: "price", numeric: true, disablePadding: true, label: "prijs" },
  {
    id: "ingredients",
    numeric: false,
    disablePadding: false,
    label: "ingredienten"
  },
  {
    id: "edit",
    numeric: false,
    disablePadding: false,
    label: "aanpassen"
  }
];

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  root: {
    position: "fixed",
    bottom: "20px",
    left:
      "50%" /* position the left edge of the element at the middle of the parent */,
    transform:
      "translate(-50%, -50%)" /* This is a shorthand of
                                         translateX(-50%) and translateY(-50%) */
  }
});

export default function EditSandwiches(props) {
  const classes = useStyles();
  const [sandwiches, setSandwiches] = useState([]);
  const [selectedSandwich, setSelectedSandwich] = useState(null);
  const [open, setOpen] = useState(false);
  const [alerterInfo, setAlerterInfo] = useState({
    type: "succes",
    text: "succesvol sandwich toegevoegd",
    open: false,
    time: 1000
  });
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    api.getSandwiches().then(_sandwiches => {
      setSandwiches(_sandwiches);
    });
  }, []);

  const handleClick = sandwich => {
    setSelectedSandwich(sandwich);
    setOpen(true);
  };

  const handleDelete = sandwich => {
    api.deleteSandwich(sandwich.id).then(() => {
      setAlerterInfo({
        ...alerterInfo,
        text: "succesvol sandwich verwijderd",
        time: 2000,
        open: true
      });
    });
  };

  if (!sandwiches || !sandwiches.length) {
    return <ProgressSpinner waittext={`laden van sandwiches tabel`} />;
  }

  return (
    <>
      {open && (
        <EditForm
          open={open}
          sandwich={selectedSandwich}
          setOpen={setOpen}
        ></EditForm>
      )}
      {openAdd && <CreateForm open={openAdd} setOpen={setOpenAdd}></CreateForm>}
      {alerterInfo.open && (
        <Alerter
          type={alerterInfo.type}
          text={alerterInfo.text}
          open={alerterInfo.open}
          setOpen={() => {
            setAlerterInfo({ ...alerterInfo, open: false });
          }}
          time={alerterInfo.time}
        />
      )}
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {headCells.map((cell, i) => {
                return (
                  <TableCell key={i} align="center">
                    {cell.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {sandwiches.map(sandwich => (
              <TableRow key={sandwich.id}>
                <TableCell component="th" scope="row">
                  {sandwich.name}
                </TableCell>
                <TableCell align="center">{sandwich.price}</TableCell>
                <TableCell align="center">
                  {sandwich.ingredients.join(" / ")}
                </TableCell>
                <TableCell align="center">
                  <div style={{ display: "flex" }}>
                    <Fab
                      color="primary"
                      size="small"
                      onClick={handleClick.bind(this, sandwich)}
                    >
                      <EditIcon></EditIcon>
                    </Fab>
                    <Fab
                      color="primary"
                      size="small"
                      onClick={handleDelete.bind(this, sandwich)}
                    >
                      <DeleteIcon></DeleteIcon>
                    </Fab>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab
        className={classes.root}
        color="primary"
        variant="extended"
        onClick={e => {
          console.log(openAdd);
          setOpenAdd(true);
        }}
      >
        <AddCircleIcon></AddCircleIcon>
        voeg nieuw broodje toe
      </Fab>
    </>
  );
}
