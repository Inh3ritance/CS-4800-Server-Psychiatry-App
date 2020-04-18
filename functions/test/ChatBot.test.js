let chai = require('chai');
//chai.assert();
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const projectConfig = {
    databaseURL: 'https://my-project.firebaseio.com',
    storageBucket: 'my-project.appspot.com',
    projectId: 'my-project',
}
const test = require('firebase-functions-test')(projectConfig, '../serviceAccountKey.json');

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
  
    describe('post', () => {
      it('should return a 500 redirect', (done) => {
        const req = { query: {text: 'input'}, body:{userid: "123345456"}};
        const res = {
          redirect: (code, url) => {
            assert.equal(code, 500);
            const expectedRef = new RegExp(projectConfig.databaseURL + '/messages/');
            assert.isTrue(expectedRef.test(url));
            done();
          }
        };

        server.post(req, res);
      });
    });
  })