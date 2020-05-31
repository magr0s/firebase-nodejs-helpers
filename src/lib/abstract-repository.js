const Firestore = require('./firestore')

class AbstractRepository {
  /**
   * Class constructor
   * @param {string} path - Path to repository
   */
  constructor (path) {
    if (!path) throw new Error('Property "path" can`t be empty.')

    this.path = path
  }

  /**
   * Get a collection of documents
   * @param params - Query params
   * @returns {Promise<*[]>}
   */
  list (params) {
    return Firestore.list(this.path, params)
      .then(({ docs }) => (
        docs.map((doc) => {
          const { id } = doc

          return Object.assign({}, doc.data(), { id })
        })
      ))
  }

  /**
   * Get the document from the collection
   * @param {string|number} id - Document ID
   * @returns {Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>>}
   */
  get (id) {
    return Firestore.get(`${this.path}/${id}`)
      .then((doc) => {
        const { id, exists } = doc

        return exists ? Object.assign({}, doc.data(), { id }) : null
      })
  }

  /**
   * Create a new document in the collection
   * @param {object} params - Document data
   * @returns {Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>}
   */
  create (params) {
    return Firestore.create(this.path, params)
  }

  /**
   * Create a new document or update the document
   * @param {string|number} id - Document ID
   * @param {object} params - Document data
   * @param {boolean} merge - Update method
   * @returns {Promise<FirebaseFirestore.WriteResult>}
   */
  set (id, params, merge) {
    return Firestore.set(`${this.path}/${id}`, params, merge)
  }

  /**
   * Update the document data
   * @param {string|number} id - Document ID
   * @param {object} params - Document data
   * @returns {Promise<FirebaseFirestore.WriteResult>}
   */
  update (id, params) {
    return Firestore.update(`${this.path}/${id}`, params)
  }

  /**
   * Remove the document from the collection
   * @param {string|number} id - Document ID
   * @returns {Promise<FirebaseFirestore.WriteResult>}
   */
  delete (id) {
    return Firestore.delete(`${this.path}/${id}`)
  }

  /**
   * Create a new documents or update the documents
   * @param {string} key - Key to use as an ID
   * @param {array.<object>} payload - Documents data
   * @param {object} [options]
   * @returns {Promise<FirebaseFirestore.WriteResult[][]>}
   */
  batchSet (key, payload, options) {
    const chunks = []

    for (let i = 0; i < payload.length; i += 500) {
      chunks.push(
        payload.slice(i, i+500)
      )
    }

    return Promise.all(
      chunks.map(data => (Firestore.batchSet(this.path, key, data, options)))
    );
  }
}

module.exports = AbstractRepository
