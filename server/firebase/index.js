var admin = require('firebase-admin');

var serviceAccount = require('../config/fbServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://last-e-commerce-default-rtdb.europe-west1.firebasedatabase.app',
});

module.exports = admin;
