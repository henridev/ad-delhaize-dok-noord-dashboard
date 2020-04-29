import React, { useState, useEffect, useRef } from "react";
import DragDrop from "../DragDrop";
import api from "../../api/upload";
import DropDown from "../DropDown";
import photomapping from "../../data/photomapping";
import { Button } from "../../modules/bootstrap";
import Alerter from "../Alerter";

export default function EditPictures() {
  const [pictureFile, setPictureFile] = useState(null);
  const [photo_option, set_photo_option] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const imageRef = useRef();
  const imageContainerRef = useRef();

  function handleFileChange_btn(e) {
    const file = e.target.files[0];
    setPictureFile(file);
    onFileSelected(file);
  }

  function handleFileChange(file) {
    setPictureFile(file);
    onFileSelected(file);
  }

  function onFileSelected(pictureFile) {
    var reader = new FileReader();

    var imgtag = imageRef.current;
    var imgContainer = imageContainerRef.current;
    imgtag.title = pictureFile.name;
    imgContainer.classList.remove("hidden");

    reader.onload = function(event) {
      imgtag.onload = () => {
        console.log("this width", this.width);
        imgtag.style.maxWidth = "500px";
      };
      imgtag.src = event.target.result;
    };

    reader.readAsDataURL(pictureFile);
  }

  function handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    let data = pictureFile;
    console.log(photomapping[photo_option.toString()]);
    api.postPhoto(data, photomapping[photo_option.toString()]).then(res => {
      console.log(res, "uploaded picture");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    });
  }

  return (
    <div className="pictureedit">
      <div className="pictureedit__btndropdownmsgimg">
        <Button
          disabled={pictureFile && photo_option ? false : true}
          onClick={handleClick}
        >
          verander photo
        </Button>
        <DropDown
          all_options_keys={Object.keys(photomapping)}
          all_options_json={photomapping}
          option={photo_option}
          setOption={set_photo_option}
          optionLabel="foto opties"
        ></DropDown>
        {!pictureFile && (
          <div className="pictureedit__btndropdownmsgimg__msg">
            klik hier om afbeelding te uploaden of drop een afbeelding in dit
            gebied
          </div>
        )}
        {showAlert && (
          <Alerter
            type="success"
            text={`foto ${photomapping[photo_option.toString()]} is veranderd`}
          ></Alerter>
        )}
        <div className="image_container hidden" ref={imageContainerRef}>
          <img alt="image placeholder" id="image" ref={imageRef} />
        </div>
      </div>
      <DragDrop handleFileChange={handleFileChange}>
        <input
          type="file"
          //   value={pictureFile}
          name="file"
          id="file"
          onChange={handleFileChange_btn}
          className="inputs-edit-file hidden"
        />
        <label className="label-for-image" for="file"></label>
      </DragDrop>
    </div>
  );
}
