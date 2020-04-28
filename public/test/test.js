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

  QUnit.test( "findHighestScore Test", (assert)=> {
    assert.equal([3,2],findHighestScore([1,2,3]));
  });

  QUnit.test( "findHighestScore Test", (assert)=> {
    assert.ok(findHighestScore([1,2,3]), "Highest function works" );
  });

  