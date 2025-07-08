const adminFirebaseConfig = {
  apiKey: "AIzaSyDgNYKQB0cuL4LnEEz897Mcq0_N_dQ_a1o",
  authDomain: "reliefnet-admin.firebaseapp.com",
  databaseURL: "https://reliefnet-admin-default-rtdb.firebaseio.com",
  projectId: "reliefnet-admin",
  storageBucket: "reliefnet-admin.firebasestorage.app",
  messagingSenderId: "76512879742",
  appId: "1:76512879742:web:9a834f2991c0b09198a42f",
  measurementId: "G-6W1RHH9L62"
};

const adminApp = firebase.initializeApp(adminFirebaseConfig, "adminApp");
const adminAuth = adminApp.auth();
const adminDb = adminApp.database();
document.addEventListener('DOMContentLoaded', function() {
const adminLoginForm = document.getElementById('adminLoginForm');
const adminLoginError = document.getElementById('adminLoginError');
const adminLoginSuccess = document.getElementById('adminLoginSuccess');


if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            adminLoginError.textContent = '';
            adminLoginSuccess.style.display = 'none';

            const email = document.getElementById('adminLoginEmail').value.trim();
            const password = document.getElementById('adminLoginPassword').value;


 adminAuth.signInWithEmailAndPassword(email, password)
                .then(userCredential => {
                    adminLoginSuccess.style.display = 'block';
                    setTimeout(() => {
                        window.location.href = "admin/dashboard.html";
                    }, 1200);
                })
                .catch(error => {
                    adminLoginError.textContent = "Invalid credentials or user does not exist.";
                });
        });
    }
});
