const { db } = require("../config/index");

const uploadKasboekRow = async (newRow) => {
  console.log(newRow);
  newRow.datum_dateformat = new Date(newRow.datum_dateformat);
  db.collection("kasboek")
    .add(newRow)
    .then((ref) => {
      console.log("Added document with ID: ", ref.id);
      return "Added document with ID: " + ref.id;
    });
};

module.exports = {
  uploadKasboekRow,
};
