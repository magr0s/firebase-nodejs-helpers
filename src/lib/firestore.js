const admin = require('firebase-admin')

class Firestore {
  /**
   * Firestore
   * @returns {FirebaseFirestore.Firestore}
   */
  static get db () {
    return admin.firestore()
  }

  /**
   * Get a collection of documents
   * @param {string} path - Collection path
   * @param {object} params - Query params
   * @returns {Promise<FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>>}
   */
  static list (path, params = {}) {
    const {
      conditions,
      orderBy,
      limit = 0
    } = params

    let ref = Firestore.db.collection(path)

    if (Array.isArray(conditions)) {
      conditions.forEach((condition) => {
        const {
          field,
          operator,
          value
        } = condition

        if (field && operator && value) {
          ref = ref.where(field, operator, value)
        }
      })
    }

    if (typeof (orderBy) === 'string') {
      const [field, order = 'asc'] = orderBy.split('|')

      ref = ref.orderBy(field, order)
    }

    if (limit) ref = ref.limit(limit)

    return ref.get()
  }

  /**
   * Get the document from the collection
   * @param {string} path - Document path
   * @returns {Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>>}
   */
  static get (path) {
    return Firestore.db.doc(path)
      .get()
  }

  /**
   * Create a new document in the collection
   * @param {string} path - The path to the document
   * @param {object} params - Document data
   * @returns {Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>}
   */
  static create (path, params) {
    return Firestore.db.collection(path)
      .add(params)
  }

  /**
   * Create a new document or update the document
   * @param {string} path - The path to the document
   * @param {object} params - Document data
   * @param {boolean} merge - Update method
   * @returns {Promise<FirebaseFirestore.WriteResult>}
   */
  static set (path, params, merge = false) {
    return Firestore.db.doc(path)
      .set(params, { merge })
  }

  /**
   * Update the document data
   * @param {string} path - The path to the document
   * @param {object} params - Document data
   * @returns {Promise<FirebaseFirestore.WriteResult>}
   */
  static update (path, params) {
    return Firestore.db.doc(path)
      .update(params)
  }

  /**
   * Remove the document from the collection
   * @param {string} path - The path to the document
   * @returns {Promise<FirebaseFirestore.WriteResult>}
   */
  static delete (path) {
    return Firestore.db.doc(path)
      .delete()
  }

  /**
   * Create a new documents or update the documents
   * @param {string} path - The path to the collection
   * @param {string} key - Key to use as an ID
   * @param {array.<object>} payload - Documents data
   * @returns {Promise<FirebaseFirestore.WriteResult[]>}
   */
  static batchSet (path, key, payload) {
    const ref = Firestore.db.collection(path)
    const batch = Firestore.db.batch()

    payload.forEach(data => (
      (typeof (data[key]) !== 'undefined') && batch.set(ref.doc(data[key]), data)
    ))

    return batch.commit()
  }
}

module.exports = Firestore
