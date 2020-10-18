var firestore = firebase.firestore();
firebase.firestore().collection('Music-App').doc("users").collection("spotandjake").doc("playlists").collection("playlist name").doc("song name").set({
	name: "song name",
	id: "song id"
}).catch(function(error) {
	console.error('Error writing new message to Firebase Database', error);
});