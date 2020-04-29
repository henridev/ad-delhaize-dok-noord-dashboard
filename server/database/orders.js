const { db } = require("../config/index");

const getOrders = async () => {
  const snapshot = await db.collection("orders").get();
  let orders = snapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id };
  });
  return orders;
};

const deleteOrder = async orderId => {
  await db
    .collection("orders")
    .doc(orderId)
    .delete();

  return;
};

module.exports = {
  getOrders,
  deleteOrder
};
