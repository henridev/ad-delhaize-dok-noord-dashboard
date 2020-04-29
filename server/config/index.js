const admin = require("firebase-admin");
const { service_account } = require("./firestore");

admin.initializeApp({
  credential: admin.credential.cert(service_account)
});

const db = admin.firestore();

module.exports = { db, admin };
