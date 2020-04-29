const express = require("express");
const router = express.Router();
const uploader = require("../config/cloudinary");
const {
  uploadPhoto,
  uploadText,
  uploadKasboekRow
} = require("../database/uploads");

router.post(
  "/photo/:photo_optie",
  uploader.single("photo"),
  (req, res, next) => {
    const photo_url = req.file.url;
    const photo_optie = req.params.photo_optie;
    console.log(photo_url, photo_optie);
    uploadPhoto(photo_optie, photo_url)
      .then(returnvalue => {
        console.log(returnvalue);
        res.status(200).json({ msg: "succesfull upload" });
      })
      .catch(err => {
        console.error(err);
      });
    console.log(photo_url);
  }
);

router.post("/text/:text_optie", (req, res, next) => {
  console.log("req body", req.body);
  const new_text = req.body.text;
  const text_optie = req.params.text_optie;
  console.log(new_text, text_optie);
  uploadText(text_optie, new_text)
    .then(returnvalue => {
      console.log(returnvalue);
      res.send("succesfull upload text");
    })
    .catch(err => {
      console.error(err);
    });
  console.log(new_text);
});

router.post("/kasboek", (req, res, next) => {
  const newRow = req.body.newKasboekRow;
  console.log(newRow);
  uploadKasboekRow(newRow)
    .then(returnvalue => {
      console.log(returnvalue);
      res.send("succesfull upload row");
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;
