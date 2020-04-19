const assert = require('assert');
const projectConfig = {
  databaseURL: 'https://cs-4800-backend-server.firebaseio.com/',
  storageBucket: 'cs-4800-backend-server.appspot.com',
  projectId: 'cs-4800-backend-server',
}
const test = require('firebase-functions-test')(projectConfig, '../serviceAccountKey.json');
const request = require('supertest');
const app = require('express');

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
  
    describe('GET /users', () => {
      it('respond with json containing a list of all users', (done) => {
          request(server)
              .get('/users')
              .set('Accept', 'application/json')
              .expect('Content-Type','text/html; charset=utf-8')
              .expect(200, done);
      });
  });
})