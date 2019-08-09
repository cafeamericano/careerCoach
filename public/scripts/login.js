//FIREBASE SETUP#########################################################################

var firebaseConfig = {
    apiKey: "AIzaSyAZip6sFehin_K3ByAKpabqOwnxD9OHZNg",
    authDomain: "careercoach-52d3e.firebaseapp.com",
    databaseURL: "https://careercoach-52d3e.firebaseio.com",
    projectId: "careercoach-52d3e",
    storageBucket: "",
    messagingSenderId: "843759964171",
    appId: "1:843759964171:web:65f8f3ab4bcd20ec"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        user.UID = firebaseUser.uid
        console.log('***** ' + user.UID)
        window.location.replace("/viewall");
    } else {
        console.log('not logged in')
    };
})

//VARIABLES##############################################################################

const inputEmail = document.getElementById('inputEmail')
const inputPassword = document.getElementById('inputPassword')
const loginButton = document.getElementById('loginButton')
const signUpButton = document.getElementById('signUpButton')

//EVENT LISTENERS########################################################################

//Login
$(document).on('submit', '#loginForm', function () {
    event.preventDefault()
    const email = inputEmail.value;
    const pass = inputPassword.value;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(function (error) {
        if (error.message === 'The email address is badly formatted.') {
            M.toast({ html: 'The email provided is not a valid email address.' })
        } else if (error.message === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
            M.toast({ html: 'The entered email address is incorrect.' })
        } else if (error.message === 'The password is invalid or the user does not have a password.') {
            M.toast({ html: 'The entered password is incorrect.' })
        }
    });
})

//Sign up
signUpButton.addEventListener('click', e => {
    const email = inputEmail.value;
    const pass = inputPassword.value;
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
        //.then(user => console.log(user))
        .catch(e => console.log(e.message));
})