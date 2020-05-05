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
// repository.js
const { Firestore } = require('firebase-nodejs-helpers')

class Repository {
  constructor (path) {
    this.path = path
  }

  list (conditions, orderBy, limit) {
    return Firestore.list(this.path, { conditions, orderBy, limit })
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
Firestore.list(
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
Firestore.get('path/to/document')
```

##### Create a new document in the collection
```js
// Example
Firestore.create(
  'path/to/collection',
  { /* some data */ }
)
```

##### Create a new document or update the document
```js
// Example
Firestore.set(
  'path/to/document',
  { /* some data */ },
  true // merging document data, false - set new document data
)
```

##### Update the document data
```js
// Example
Firestore.update(
  'path/to/document',
  { /* some data */ }
)
```

##### Remove the document from the collection
```js
// Example
Firestore.delete('path/to/document')
```

##### Create a new or update the documents collection
```js
// Example
Firestore.batchSet('path/to/document', 'id', payload)
```
