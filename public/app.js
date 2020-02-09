//Snapshot is the a rep of the diff data inside the firestore collection
db.collection('Inputs').get().then((snapshot) => {
    console.log(snapshot.docs);
})