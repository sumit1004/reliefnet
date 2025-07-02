const firebaseConfig = {
    apiKey: "AIzaSyCtbphQnrs9-GRWU-rXV29ryfOo4nRwVOs",
    authDomain: "reliefnet-ca9c3.firebaseapp.com",
    databaseURL: "https://reliefnet-ca9c3-default-rtdb.firebaseio.com",
    projectId: "reliefnet-ca9c3",
    storageBucket: "reliefnet-ca9c3.firebasestorage.app",
    messagingSenderId: "511314183423",
    appId: "1:511314183423:web:d419ebe1a552b393b1f8ca",
    measurementId: "G-G89QL5968J"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

loginClose.addEventListener('click', () => {
    loginModal.classList.remove('active');
    loginError.textContent = '';
    loginSuccess.style.display = 'none';
});
loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('active');
        loginError.textContent = '';
        loginSuccess.style.display = 'none';
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        loginModal.classList.remove('active');
        loginError.textContent = '';
        loginSuccess.style.display = 'none';
    }
});

// --- Firebase Login ---
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    loginError.textContent = '';
    loginSuccess.style.display = 'none';
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            loginSuccess.style.display = 'block';
            setTimeout(() => {
                loginModal.classList.remove('active');
                loginSuccess.style.display = 'none';
            }, 1200);
        })
        .catch(err => {
            loginError.textContent = err.message.replace('Firebase:', '');
        });
});

// --- Google Sign-In ---
googleSignInBtn.addEventListener('click', function() {
    loginError.textContent = '';
    loginSuccess.style.display = 'none';
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(() => {
            loginSuccess.style.display = 'block';
            setTimeout(() => {
                loginModal.classList.remove('active');
                loginSuccess.style.display = 'none';
            }, 1200);
        })
        .catch(err => {
            loginError.textContent = err.message.replace('Firebase:', '');
        });
});


firebase.initializeApp(firebaseConfig);
