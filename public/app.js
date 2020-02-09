/*const inputList = document.querySelector('#input-list');

//create element and render Inputs
function renderInput(doc){
    //types in index.html
    let li = document.createElement('li');
    let hello = document.createElement('span');
    let greetings = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    hello.textContent = doc.data().Hello;
    greetings.textContent = doc.data().Greetings;

    li.appendChild(hello);
    li.appendChild(greetings);

    inputList.appendChild(li);
}
*/

var docRef = db.collection("Inputs").doc("Greeting");

docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    // something just goes wrong and an error message pops up
    console.log("Error getting document:", error);
});
