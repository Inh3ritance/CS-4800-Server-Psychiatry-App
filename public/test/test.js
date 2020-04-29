    //Finds highest score in list of emotion scores. Returns array: [highest-score, index-of-score];
  function findHighestScore(list) {
      var highest = list[0];
      var highestIndex = 0;
      for (var x=1;x<list.length;x++) {
          if (list[x]>highest) {
              highest = list[x];
              highestIndex = x;
          }
      }
      var results = [highest, highestIndex];
      return results;
  }

  QUnit.test("Highest Score Test #1", (assert) => {
    let list = [1,3,5,2];
    let result = findHighestScore(list);
    assert.ok(result[0]==5 && result[1]==2);
  });

  QUnit.test( "findHighestScore Test #2", (assert)=> {
    assert.ok(findHighestScore([1,2,3]), "Highest function works" );
  });

  QUnit.test( "true test", (assert) => {
    assert.ok( true, "true succeeds" );
  });