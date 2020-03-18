const admin = require('firebase-admin');

class FirebaseAdmin {
  /**
   * Initialize firebase-admin
   * @param {object} params
   */
  static init (params) {
    const { config } = params;

    admin.initializeApp({
      credential: admin.credential.cert(config)
    });
  }
}

module.exports = FirebaseAdmin;
