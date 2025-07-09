const volunteerFirebaseConfig = {
  apiKey: "AIzaSyB--dzAihIn7xoGBHpPYHFDxd5cwJGhNLc",
  authDomain: "reliefnet-volunteer.firebaseapp.com",
  projectId: "reliefnet-volunteer",
  storageBucket: "reliefnet-volunteer.firebasestorage.app",
  messagingSenderId: "207099035894",
  appId: "1:207099035894:web:245fc66d81a73b5de96cd7",
  measurementId: "G-3V4EJMLYFX"
};

// for seperate firebase auth and darabase for volunteer 

let volunteerApp;
try {
      volunteerApp = firebase.apps.find(app => app.name === 'volunteerApp');
  if (!volunteerApp) {
    volunteerApp = firebase.initializeApp(volunteerFirebaseConfig, 'volunteerApp');
  }
} catch (e) {
  volunteerApp = firebase.initializeApp(volunteerFirebaseConfig, 'volunteerApp');
}

const volunteerAuth = volunteerApp.auth();
const volunteerDb = volunteerApp.database ? 
volunteerApp.database() : null;

//volunteer signup

function handleVolunteerSignup(e) {
  e.preventDefault();
  const name = document.getElementById('volunteerSignupName').value.trim();
  const email = document.getElementById('volunteerSignupEmail').value.trim();
  const password = document.getElementById('volunteerSignupPassword').value;
  const mobile = document.getElementById('volunteerSignupMobile').value.trim();
  const skills = document.getElementById('volunteerSignupSkills').value.trim();
  const location = document.getElementById('volunteerSignupLocation').value.trim();
  const errorDiv = document.getElementById('volunteerSignupError');
  const successDiv = document.getElementById('volunteerSignupSuccess');
  errorDiv.textContent = '';
  successDiv.style.display = 'none';
  volunteerAuth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;
      if (volunteerDb) {
        return volunteerDb.ref('volunteers/' + user.uid).set({
          name,
          email,
          mobile,
          skills,
          location,
          createdAt: new Date().toISOString()
        });
      }
    })
    .then(() => {
      successDiv.style.display = 'block';
      errorDiv.textContent = '';
      setTimeout(function() {
        window.location.href = "volunteer/dashboard.html";
      }, 1200);
    })
    .catch(err => {
      errorDiv.textContent = err.message || 'Signup failed. Please try again.';
    });
}

function handleVolunteerLogin(e) {
  e.preventDefault();
  const email = document.getElementById('volunteerLoginEmail').value.trim();
  const password = document.getElementById('volunteerLoginPassword').value;
  const errorDiv = document.getElementById('volunteerLoginError');
  const successDiv = document.getElementById('volunteerLoginSuccess');
  errorDiv.textContent = '';
  successDiv.style.display = 'none';
  volunteerAuth.signInWithEmailAndPassword(email, password)
    .then(() => {
      successDiv.style.display = 'block';
      errorDiv.textContent = '';
      setTimeout(function() {
        window.location.href = "volunteer/dashboard.html";
      }, 1000);
    })
    .catch(err => {
      errorDiv.textContent = err.message || 'Login failed. Please try again.';
    });
}


window.addEventListener('DOMContentLoaded', function() {
  const volunteerSignupForm = document.getElementById('volunteerSignupForm');
  if (volunteerSignupForm) {
    volunteerSignupForm.removeEventListener('submit', handleVolunteerSignup);
    volunteerSignupForm.addEventListener('submit', handleVolunteerSignup);
  }
  const volunteerLoginForm = document.getElementById('volunteerLoginForm');
  if (volunteerLoginForm) {
    volunteerLoginForm.removeEventListener('submit', handleVolunteerLogin);
    volunteerLoginForm.addEventListener('submit', handleVolunteerLogin);
  }
});
