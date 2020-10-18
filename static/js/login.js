const firebaseConfig = {
	apiKey: "AIzaSyCX81l3Z2zmvUL_62Wc_b4Et3VZPAhK7lE",
	authDomain: "rest-api-242421.firebaseapp.com",
	databaseURL: "https://rest-api-242421.firebaseio.com",
	projectId: "rest-api-242421",
	storageBucket: "rest-api-242421.appspot.com",
	messagingSenderId: "391610696825",
	appId: "1:391610696825:web:3bc88f4c8b70ed2d95c0a8"
};
firebase.initializeApp(firebaseConfig);
firebase.auth().useDeviceLanguage();

//google
async function login_google() {
	var provider = new firebase.auth.GoogleAuthProvider();
	await firebase.auth().signInWithPopup(provider).then(function(result) {
		var token = result.credential.accessToken;
		var user = result.user;
	}).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		var email = error.email;
		var credential = error.credential;
	});
	return logedin()
}
//github
async function login_github() {
	var provider = new firebase.auth.GithubAuthProvider();
	await firebase.auth().signInWithPopup(provider).then(function(result) {
		var token = result.credential.accessToken;
		var user = result.user;
	}).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		var email = error.email;
		var credential = error.credential;
	});
	return logedin()
}
//email
function signup(email, password) {
	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(function(result) {
			return true;
		}).catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			return false;
		});
}
async function login_email(email, password) {
	await firebase.auth().signInWithEmailAndPassword(email, password)
		.then(function(result) {}).catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
		});
	return logedin()
}
//login and out
async function login(prov) {
	switch (prov) {
		case 1:
			var accepted = await login_google();
			break;
		case 2:
			var accepted = await login_github();
			break;
		case 3:
			var accepted = await login_email();
			break;
		default:
			var accepted = false;
	}
	if (accepted) {
		document.getElementById("Logintype").style.display = "none";
		var info = userdata()
		if (info != false) {
			personal(info);
		}
	} else {
		return false;
	}
}
function logout() {
	firebase.auth().signOut().then(function() {
		document.getElementById("user").innerHTML = "Sign In";
		document.getElementById("user").onclick=function(){typeopen()};
		return true;
	}).catch(function(error) {
		return false;
	});
}
//actions
function userdata() {
	var user = firebase.auth().currentUser;
	var uid, emailVerified, info;
	if (user != null) {
		info = {
			"name": user.displayName,
			"email": user.email,
			"photoUrl": user.photoURL,
			"emailverified": user.emailVerified,
			"uid": user.uid
		}
		return info;
	} else {
		return false;
	}
}
function logedin() {
	var user = firebase.auth().currentUser;
	if (user) {
		return true;
	} else {
		return false;
	}
}
function personal(info) {
	if (logedin) {
		document.getElementById("user").innerHTML = info.name;
		document.getElementById("user").onclick=function(){logout()};
	}
}
// login selector
// Get the modal
var Logintype = document.getElementById("Logintype");

function typeopen() {
	Logintype.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
document.getElementsByClassName("close")[0].onclick = function() {
	Logintype.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == Logintype) {
		Logintype.style.display = "none";
	}
}

document.getElementById("logingoogle").onclick = async function() {
	await login(1);
}
document.getElementById("logingit").onclick = async function() {
	await login(2);
}
