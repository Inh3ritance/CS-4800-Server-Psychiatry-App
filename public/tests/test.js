//Functions
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

//Tests
QUnit.test("HighestScore Works", function( assert) {
  let list = [1,3,5,2];
  let result = findHighestScore(list);
  assert.ok(result[0]==5 && result[1]==2);
});