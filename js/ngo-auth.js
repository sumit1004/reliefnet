

// Firebase config for NGO
const ngoFirebaseConfig = {
    apiKey: "AIzaSyBB7xNTgCBvCm4UdEq4CwJLrdoDzjLfGXU",
    authDomain: "reliefnet-ngo.firebaseapp.com",
    databaseURL: "https://reliefnet-ngo-default-rtdb.firebaseio.com",
    projectId: "reliefnet-ngo",
    storageBucket: "reliefnet-ngo.firebasestorage.app",
    messagingSenderId: "726996101151",
    appId: "1:726996101151:web:80970999af3f0b483fcd2a",
    measurementId: "G-86P79VT5EE"
};

let ngoApp;
if (!firebase.apps.some(app => app.name === "ngoApp")) {
    ngoApp = firebase.initializeApp(ngoFirebaseConfig, "ngoApp");
} else {
    ngoApp = firebase.app("ngoApp");
}
const ngoAuth = ngoApp.auth();
const ngoDb = ngoApp.database();

// NGO Login
const ngoLoginForm = document.getElementById('ngoLoginForm');
if (ngoLoginForm) {
    ngoLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('ngoLoginEmail').value.trim();
        const password = document.getElementById('ngoLoginPassword').value;
        const errorDiv = document.getElementById('ngoLoginError');
        const successDiv = document.getElementById('ngoLoginSuccess');
        errorDiv.textContent = '';
        if (successDiv) successDiv.style.display = 'none';
        ngoAuth.signInWithEmailAndPassword(email, password)
            .then(() => {
                if (successDiv) successDiv.style.display = 'block';
                setTimeout(() => {
                    window.location.href = "ngo/ngoDashboard.html";
                }, 1000);
            })
            .catch(err => {
                errorDiv.textContent = err.message || 'Login failed.';
            });
    });
}

// NGO Signup
const ngoSignupForm = document.getElementById('ngoSignupForm');
if (ngoSignupForm) {
    ngoSignupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('ngoSignupName').value.trim();
        const email = document.getElementById('ngoSignupEmail').value.trim();
        const password = document.getElementById('ngoSignupPassword').value;
        const contact = document.getElementById('ngoSignupContact').value.trim();
        const address = document.getElementById('ngoSignupAddress').value.trim();
        const reg = document.getElementById('ngoSignupReg').value.trim();
        const errorDiv = document.getElementById('ngoSignupError');
        const successDiv = document.getElementById('ngoSignupSuccess');
        errorDiv.textContent = '';
        successDiv.style.display = 'none';
        ngoAuth.createUserWithEmailAndPassword(email, password)
            .then(userCred => {
                const uid = userCred.user.uid;
                return ngoDb.ref('ngos/' + uid).set({
                    name,
                    email,
                    contact,
                    address,
                    registrationNumber: reg
                });
            })
            .then(() => {
                if (successDiv) successDiv.style.display = 'block';
                ngoSignupForm.reset();
                setTimeout(() => {
                    window.location.href = "ngo/ngoDashboard.html";
                }, 1000);
            })
            .catch(err => {
                errorDiv.textContent = err.message || 'Signup failed.';
            });
    });
}
