const { db } = require("../config/index");

const getKasboek = async () => {
  const snapshot = await db.collection("kasboek").get();
  let kasboek = snapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id };
  });
  if (kasboek.length < 1) {
    return {
      statuscode: 304,
      message: "no info in kasboek",
      kasboek: []
    };
  } else {
    return {
      statuscode: 200,
      message: "kasboekinfo",
      kasboek: kasboek
    };
  }
};

const deleteKasboek = async kasboekId => {
  await db
    .collection("kasboek")
    .doc(kasboekId)
    .delete();
  return "deleted";
};

module.exports = {
  getKasboek,
  deleteKasboek
};
