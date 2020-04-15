const assert = require('assert');
const test = require('firebase-functions-test')({
    databaseURL: 'https://my-project.firebaseio.com',
    storageBucket: 'my-project.appspot.com',
    projectId: 'my-project',
}, '../serviceAccountKey.json');
const functions = require('firebase-functions');
const myFunctions = require('../index.js');


describe('Cloud Functions', () => {
    let myFunctions;
  
    /* Initialize Cloud Functions */
    before(() => {
      myFunctions = require('../index');
    });
    
    /* When done testing clean up */
    after(() => {
      test.cleanup();
      //admin.database().ref('messages').remove(); // remove Conversation at location
    });
  
    describe('addMessage', () => {
      it('should return a 303 redirect', (done) => {
        const req = { query: {text: 'input'} };
        const res = {
          redirect: (code, url) => {
            assert.equal(code, 303);
            const expectedRef = new RegExp(projectConfig.databaseURL + '/messages/');
            assert.isTrue(expectedRef.test(url));
            done();
          }
        };
        myFunctions.addMessage(req, res);
      });
    });
  })