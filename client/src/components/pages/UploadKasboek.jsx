import React, { useRef, useState } from "react";
import { creatJSONfromCSV } from "../../functions/handlecsv";
import api from "../../api/upload";
import { Button } from "../../modules/bootstrap";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  FolderIcon,
  ListItemText,
  Snackbar,
  MuiAlert,
  List,
  Typography,
  Alert
} from "../../modules/material";
import * as XLSX from "xlsx";

export default function UploadKasboek(props) {
  const [fileList, setfileList] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "succesvolle upload",
    severity: "success"
  });
  const fileinput = useRef(null);

  function handleClick() {
    console.log(fileinput.current.files);
    if (fileinput.current.files.length >= 1) {
      for (let i = 0; i < fileinput.current.files.length; i++) {
        const file = fileinput.current.files[i];
        handleFile(file);
      }
    }
  }

  function handleFile(file) {
    const reader = new FileReader();
    reader.onload = evt => {
      const bstr = evt.target.result; // parse data
      const wb = XLSX.read(bstr, { type: "binary" }); // read it
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 }); // convert
      const kasrowJSON = creatJSONfromCSV(data);
      console.log("handle file");
      api
        .postCSV(kasrowJSON)
        .then(res => {
          setAlert({
            open: true,
            message: "succesvolle upload",
            severity: "success"
          });
          setfileList([]);
          fileinput.current.value = "";
        })
        .catch(err =>
          setAlert({
            open: true,
            message: "niet succesvolle upload",
            severity: "error"
          })
        );
    };
    reader.readAsBinaryString(file);
  }

  const renderFileItems = () => {
    console.log("herere");
    let filenames = [];
    for (let i = 0; i < fileinput.current.files.length; i++) {
      const file = fileinput.current.files[i].name;
      filenames.push(file);
    }
    console.log("filenames", filenames);
    return filenames.map(name => {
      console.log("name", name);
      return (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} />
        </ListItem>
      );
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  return (
    <div>
      <input
        ref={fileinput}
        onChange={e => setfileList(fileinput.current.files)}
        type="file"
        id="input"
        multiple
      />
      <Button
        disabled={fileList.length > 0 ? false : true}
        onClick={handleClick}
      >
        upload kasboekrij
      </Button>
      {fileList.length > 0 && (
        <List
          style={{
            marginTop: "10vh",
            border: "2px solid #3F51B5",
            borderRadius: "20px",
            margin: "10vh auto"
          }}
          className="file-list"
        >
          <Typography display="h5" variant="h5">
            bestanden geselecteerd
          </Typography>
          {renderFileItems()}
        </List>
      )}
      <Snackbar open={alert.open} autoHideDuration={2000} onClose={handleClose}>
        <Alert severity={alert.severity}>{alert.message}</Alert>
      </Snackbar>
      {fileList.length < 1 && (
        <Typography style={{ marginTop: "20vh" }} display="h3" variant="h3">
          nog geen bestanden geselecteerd
        </Typography>
      )}
    </div>
  );
}
