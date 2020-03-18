# Node.js helper classes for Firebase (firebase-nodejs-helpers)

## Installation
```text
npm install firebase-nodejs-helpers
```

## Usage
```js
// index.js
const { FirebaseAdmin } = require('firebase-nodejs-helpers')
const config = require(`path/to/config/${process.env.GCLOUD_PROJECT}.json`)

FirebaseAdmin.init({ config })
```

```js
// model.js
const { Firestore } = require('firebase-nodejs-helpers')
const firestore = new Firestore()

class Model {
  constructor (path) {
    this.path = path
  }

  list (conditions, orderBy, limit) {
    return firestore.list(this.path, { conditions, orderBy, limit })
      .then(({ docs }) => (
        docs.map((doc) => {
          const { id } = doc

          return Object.assign({}, doc.data(), { id })
        })
      ))
  }
}
```

## Documentation

### FirebaseAdmin

##### Initialize firebase-admin
```js
const config = require('./path/to/service-account.json')

FirebaseAdmin.init({ config })
```

### Firestore

##### Get a collection of documents
```js
// Example
const firestore = new Firestore()

firestore.list(
  'path/to/collection',
  {
    conditions: [
      {
        field: 'field-name',
        operator: '==',
        value: 'field-value'
      }
    ],
    orderBy: 'field-name|order',
    limit: 10
  }
)
```

##### Get the document from the collection
```js
// Example
const firestore = new Firestore()

firestore.get('path/to/document')
```

##### Create a new document in the collection
```js
// Example
const firestore = new Firestore()

firestore.create(
  'path/to/collection',
  { /* some data */ }
)
```

##### Create a new document or update the document
```js
// Example
const firestore = new Firestore()

firestore.set(
  'path/to/document',
  { /* some data */ },
  true // merging document data, false - set new document data
)
```

##### Update the document data
```js
// Example
const firestore = new Firestore()

firestore.update(
  'path/to/document',
  { /* some data */ }
)
```

##### Remove the document from the collection
```js
// Example
const firestore = new Firestore()

firestore.delete('path/to/document')
```
