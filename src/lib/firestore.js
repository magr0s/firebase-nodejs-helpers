const admin = require('firebase-admin');

class Firestore {
  constructor () {
    this.db = admin.firestore()
  }

  /**
   * Get a collection of documents
   * @param {string} path - Collection path
   * @param {object} params - Query params
   * @returns {Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>}
   */
  list (path, params = {}) {
    const {
      conditions,
      orderBy,
      limit = 0
    } = params;

    let ref = this.db.collection(path);

    if (Array.isArray(conditions)) {
      conditions.forEach((condition) => {
        const {
          field,
          operator,
          value
        } = condition;

        if (field && operator && value) {
          ref = ref.where(field, operator, value);
        }
      })
    }

    if (typeof (orderBy) === 'string') {
      const [field, order = 'asc'] = orderBy.split('|');

      ref.orderBy(field, order);
    }

    limit && ref.limit(limit);

    return ref.get();
  }

  /**
   * Get the document from the collection
   * @param {string} path - Document path
   * @returns {Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>>}
   */
  get (path) {
    return this.db.doc(path)
      .get();
  }

  /**
   * Create a new document in the collection
   * @param {string} path - The path to the document
   * @param {object} params - Document data
   * @returns {Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>}
   */
  create (path, params) {
    return this.db.collection(path)
      .add(params);
  }

  /**
   * Create a new document or update the document
   * @param {string} path - The path to the document
   * @param {object} params - Document data
   * @param {boolean} merge - Update method
   * @returns {Promise<FirebaseFirestore.WriteResult>}
   */
  set (path, params, merge = false) {
    return this.db.doc(path)
      .set(params, { merge });
  }

  /**
   * Update the document data
   * @param {string} path - The path to the document
   * @param {object} params - Document data
   * @returns {Promise<FirebaseFirestore.WriteResult>}
   */
  update (path, params) {
    return this.db.doc(path)
      .update(params);
  }

  /**
   * Remove the document from the collection
   * @param {string} path - The path to the document
   * @returns {Promise<FirebaseFirestore.WriteResult>}
   */
  delete (path) {
    return this.db.doc(path)
      .delete();
  }
}

module.exports = Firestore;
