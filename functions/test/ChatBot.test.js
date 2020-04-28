const assert = require('assert');
const projectConfig = {
  databaseURL: 'https://cs-4800-backend-server.firebaseio.com/',
  storageBucket: 'cs-4800-backend-server.appspot.com',
  projectId: 'cs-4800-backend-server',
}
const test = require('firebase-functions-test')(projectConfig, '../serviceAccountKey.json');
const request = require('supertest');
const admin = require('firebase-admin');

//const db = admin.firestore();
describe('Cloud Functions', () => {
    let server;

    /* Initialize Cloud Functions */
    before(() => {
      server = require('../index');
    });

    /* When done testing clean up */
    after(() => {
      test.cleanup();
      deleteCollection(admin.firestore(), "messages/users/TestAccount", 1);
    });

    describe('GET /message', () => {
      it('respond with json containing a list of all users', (done) => {
          request(server)
              .get('/message')
              .set('Accept', 'application/json')
              .expect(200, done);
      });
  });

  describe("POST /message", () => {
    it("should be 200 if msg sent to database", (done) => {
      request(server)
        .post("/message")
        .send({ text: "This is a test", userId: "TestAccount"})
        .expect(200)
        .end((err, res)=>{
          if (err) done(err);
          done();
        });
    });
  });

  describe("POST /message EMPTY arguments", () => {
    it("it should return status code 500 if sent empty JSON", (done) => {
      request(server)
        .post("/message")
        .send({})
        .expect(500)
        .expect('Content-Type', "text/html; charset=utf-8")
        .end((err, res)=>{
          if (err) done(err);
          done();
        });
    });
  });
})



/* Delete and clean up mock testing*/
function deleteCollection(db, collectionPath, batchSize) {
  let collectionRef = db.collection(collectionPath);
  let query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve, reject);
  });
}

function deleteQueryBatch(db, query, resolve, reject) {
  query.get()
    .then((snapshot) => {
      // When there are no documents left, we are done
      if (snapshot.size === 0) {
        return 0;
      }

      // Delete documents in a batch
      let batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      return batch.commit().then(() => {
        return snapshot.size;
      });
    }).then((numDeleted) => {
      if (numDeleted === 0) {
        resolve();
        return;
      }
      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, query, resolve, reject);
      });
      return null;
    })
    .catch(reject);
}