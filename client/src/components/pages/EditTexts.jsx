import React, { useState, useEffect, useRef } from "react";
import api from "../../api/upload";
import DropDown from "../DropDown";
import textmapping from "../../data/textmapping";
import { Button } from "../../modules/bootstrap";
import { TextField } from "../../modules/material";
import Alerter from "../Alerter";

export default function EditTexts() {
  const [showAlert, setShowAlert] = useState(false);
  const [text_option, set_text_option] = useState(null);
  const [new_text, set_new_text] = useState("");

  function handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    api
      .postText(new_text, textmapping[text_option])
      .then(res => {
        console.log(res, "uploaded text");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <div className="textedit">
      <TextField
        id="outlined-basic"
        label="geef in tekst"
        variant="outlined"
        multiline
        rows="7"
        value={new_text}
        onChange={e => set_new_text(e.target.value)}
      />
      <div className="textedit_btndrop">
        <Button
          disabled={text_option && new_text.length > 5 ? false : true}
          onClick={handleClick}
        >
          verander tekst
        </Button>
        <DropDown
          all_options_keys={Object.keys(textmapping)}
          all_options_json={textmapping}
          option={text_option}
          setOption={set_text_option}
          optionLabel="text opties"
        ></DropDown>
        {showAlert && (
          <Alerter
            type="success"
            text={`text ${textmapping[text_option.toString()]} is veranderd`}
          ></Alerter>
        )}
      </div>
    </div>
  );
}
