const { db } = require("../config/index");

const get_sandwiches = async () => {
  const snapshot = await db.collection("broodjes").get();
  let sandwiches = snapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id };
  });
  return sandwiches;
};

const patch_sandwich = async (sandwichId, changes) => {
  let sandwichRef = db.collection("broodjes").doc(sandwichId);
  let updateSingle = await sandwichRef.update(changes);
  return updateSingle;
};

const delete_sandwich = async sandwichName => {
  await db
    .collection("broodjes")
    .doc(sandwichName)
    .delete();
  return "deleted";
};

const create_sandwich = async values => {
  await db.collection("broodjes").add(values);
  return "created";
};

module.exports = {
  get_sandwiches,
  delete_sandwich,
  patch_sandwich,
  create_sandwich
};
