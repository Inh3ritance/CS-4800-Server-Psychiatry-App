const assert = require('assert');
const projectConfig = {
  databaseURL: 'https://cs-4800-backend-server.firebaseio.com/',
  storageBucket: 'cs-4800-backend-server.appspot.com',
  projectId: 'cs-4800-backend-server',
}
const test = require('firebase-functions-test')(projectConfig, '../serviceAccountKey.json');
const request = require('supertest');

describe('Cloud Functions', () => {
    let server;

    /* Initialize Cloud Functions */
    before(() => {
      server = require('../index');
    });

    /* When done testing clean up */
    after(() => {
      test.cleanup();
      //admin.database().ref('messages').remove(); // remove Conversation at location
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
        .send({ text: "Hope", userId: "User1"})
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