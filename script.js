// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// Smooth scroll for nav links
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
            navMenu.classList.remove('open');
        }
    });
});

// Fade-in animation on scroll
function revealOnScroll() {
    const revealEls = document.querySelectorAll('section, .feature-card, .step');
    const windowHeight = window.innerHeight;
    revealEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight - 60) {
            el.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// How It Works Popup
const howBtn = document.getElementById('howItWorksBtn');
const howModal = document.getElementById('HowItWorks');
const howClose = document.getElementById('howItWorksClose');

howBtn.addEventListener('click', () => {
    howModal.classList.add('active');
});
howClose.addEventListener('click', () => {
    howModal.classList.remove('active');
});
howModal.addEventListener('click', (e) => {
    if (e.target === howModal) {
        howModal.classList.remove('active');
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        howModal.classList.remove('active');
    }
});

// --- Signup Modal Logic ---
const signupModal = document.getElementById('signupModal');
const signupClose = document.getElementById('signupClose');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const signupForm = document.getElementById('signupForm');
const signupError = document.getElementById('signupError');
const signupSuccess = document.getElementById('signupSuccess');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const loginSuccess = document.getElementById('loginSuccess');
const loginBtn = document.getElementById('loginBtn');

// Only add event listeners if elements exist
if (showSignup) {
    showSignup.addEventListener('click', function(e) {
        e.preventDefault();
        if (loginModal) loginModal.classList.remove('active');
        if (signupModal) signupModal.classList.add('active');
        if (signupError) signupError.textContent = '';
        if (signupSuccess) signupSuccess.style.display = 'none';
    });
}
if (showLogin) {
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        if (signupModal) signupModal.classList.remove('active');
        if (loginModal) loginModal.classList.add('active');
        if (loginError) loginError.textContent = '';
        if (loginSuccess) loginSuccess.style.display = 'none';
    });
}
if (signupClose) {
    signupClose.addEventListener('click', () => {
        signupModal.classList.remove('active');
        signupError.textContent = '';
        signupSuccess.style.display = 'none';
    });
}
if (signupModal) {
    signupModal.addEventListener('click', (e) => {
        if (e.target === signupModal) {
            signupModal.classList.remove('active');
            signupError.textContent = '';
            signupSuccess.style.display = 'none';
        }
    });
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (signupModal) signupModal.classList.remove('active');
        if (signupError) signupError.textContent = '';
        if (signupSuccess) signupSuccess.style.display = 'none';
    }
});

// --- Firebase Signup ---
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        signupError.textContent = '';
        signupSuccess.style.display = 'none';
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const aadhar = document.getElementById('signupAadhar').value;
        const mobile = document.getElementById('signupMobile').value;
        const address = document.getElementById('signupAddress').value;
        const name = document.getElementById('signupName').value;
        const dob = document.getElementById('signupDOB').value;
        const gender = document.getElementById('signupGender').value;

        // Basic validation for aadhar and mobile
        if (!/^\d{12}$/.test(aadhar)) {
            signupError.textContent = "Please enter a valid 12-digit Aadhar number.";
            return;
        }
        if (!/^\d{10}$/.test(mobile)) {
            signupError.textContent = "Please enter a valid 10-digit mobile number.";
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Store extra user info in Realtime Database
                const userId = userCredential.user.uid;
                return firebase.database().ref('users/' + userId).set({
                    email,
                    aadhar,
                    mobile,
                    address,
                    name,
                    dob,
                    gender
                });
            })
            .then(() => {
                signupSuccess.style.display = 'block';
                setTimeout(() => {
                    signupModal.classList.remove('active');
                    signupSuccess.style.display = 'none';
                    loginModal.classList.add('active');
                }, 1200);
            })
            .catch(err => {
                signupError.textContent = err.message.replace('Firebase:', '');
            });
    });
}

// --- Login Modal Logic ---
if (loginBtn) {
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (loginModal) loginModal.classList.add('active');
        if (loginError) loginError.textContent = '';
        if (loginSuccess) loginSuccess.style.display = 'none';
    });
}

if (loginClose) {
    loginClose.addEventListener('click', () => {
        if (loginModal) loginModal.classList.remove('active');
        if (loginError) loginError.textContent = '';
        if (loginSuccess) loginSuccess.style.display = 'none';
    });
}
if (loginModal) {
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
            if (loginError) loginError.textContent = '';
            if (loginSuccess) loginSuccess.style.display = 'none';
        }
    });
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (loginModal) loginModal.classList.remove('active');
        if (loginError) loginError.textContent = '';
        if (loginSuccess) loginSuccess.style.display = 'none';
    }
});

// --- Firebase Login ---
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (loginError) loginError.textContent = '';
        if (loginSuccess) loginSuccess.style.display = 'none';
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                if (loginSuccess) loginSuccess.style.display = 'block';
                setTimeout(() => {
                    if (loginModal) loginModal.classList.remove('active');
                    if (loginSuccess) loginSuccess.style.display = 'none';
                    window.location.href = "home.html"; // Immediate redirect after login
                }, 1200);
            })
            .catch(err => {
                if (loginError) loginError.textContent = err.message.replace('Firebase:', '');
            });
    });
}

// --- Google Sign-In ---
const googleSignInBtn = document.getElementById('googleSignInBtn');
if (googleSignInBtn) {
    googleSignInBtn.addEventListener('click', function() {
        if (loginError) loginError.textContent = '';
        if (loginSuccess) loginSuccess.style.display = 'none';
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(() => {
                if (loginSuccess) loginSuccess.style.display = 'block';
                setTimeout(() => {
                    if (loginModal) loginModal.classList.remove('active');
                    if (loginSuccess) loginSuccess.style.display = 'none';
                    window.location.href = "home.html"; // Immediate redirect after login
                }, 1200);
            })
            .catch(err => {
                if (loginError) loginError.textContent = err.message.replace('Firebase:', '');
            });
    });
}

// --- Auth State & Logout Button ---
function setAuthButton(user) {
    const oldLogout = document.getElementById('logoutBtn');
    if (oldLogout) oldLogout.remove();

    if (user) {
        if (loginBtn) loginBtn.style.display = 'none';
        const logoutBtn = document.createElement('a');
        logoutBtn.href = "#logout";
        logoutBtn.id = "logoutBtn";
        logoutBtn.className = "btn btn-secondary";
        logoutBtn.style.marginLeft = "1.5rem";
        logoutBtn.textContent = "Logout";
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            firebase.auth().signOut().then(() => {
                window.location.href = "index.html"; // Redirect to index.html after logout
            });
        });
        navMenu.appendChild(logoutBtn);
    } else {
        if (loginBtn) loginBtn.style.display = '';
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) logoutBtn.remove();
    }
}

// --- Auth State & Page Access Control ---
firebase.auth().onAuthStateChanged(function(user) {
    setAuthButton(user);
    const isIndex = window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/") || window.location.pathname === "/index.html";
    const isHome = window.location.pathname.endsWith("home.html");
    if (user) {
        // If logged in and on index, redirect to home
        if (isIndex) {
            window.location.href = "home.html";
        }
    } else {
        // If not logged in and on home, redirect to index
        if (isHome) {
            window.location.href = "index.html";
        }
    }
});

// --- Mobile Login Modal Logic ---
const showMobileLoginBtn = document.getElementById('showMobileLoginBtn');
const mobileLoginModal = document.getElementById('mobileLoginModal');
const mobileLoginClose = document.getElementById('mobileLoginClose');
const showEmailLogin = document.getElementById('showEmailLogin');
const mobileLoginForm = document.getElementById('mobileLoginForm');
const mobileLoginError = document.getElementById('mobileLoginError');
const mobileLoginSuccess = document.getElementById('mobileLoginSuccess');
const loginMobileInput = document.getElementById('loginMobile');
const loginWithMobileBtn = document.getElementById('loginWithMobileBtn');
const otpSection = document.getElementById('otpSection');
const loginOtpInput = document.getElementById('loginOtp');
const verifyOtpBtn = document.getElementById('verifyOtpBtn');
let confirmationResult = null;

if (showMobileLoginBtn) {
    showMobileLoginBtn.addEventListener('click', function() {
        if (loginModal) loginModal.classList.remove('active');
        if (mobileLoginModal) mobileLoginModal.classList.add('active');
        if (mobileLoginError) mobileLoginError.textContent = '';
        if (mobileLoginSuccess) mobileLoginSuccess.style.display = 'none';
        if (otpSection) otpSection.style.display = 'none';
    });
}
if (showEmailLogin) {
    showEmailLogin.addEventListener('click', function(e) {
        e.preventDefault();
        if (mobileLoginModal) mobileLoginModal.classList.remove('active');
        if (loginModal) loginModal.classList.add('active');
        if (loginError) loginError.textContent = '';
        if (loginSuccess) loginSuccess.style.display = 'none';
    });
}
if (mobileLoginClose) {
    mobileLoginClose.addEventListener('click', () => {
        if (mobileLoginModal) mobileLoginModal.classList.remove('active');
        if (mobileLoginError) mobileLoginError.textContent = '';
        if (mobileLoginSuccess) mobileLoginSuccess.style.display = 'none';
        if (otpSection) otpSection.style.display = 'none';
    });
}
if (mobileLoginModal) {
    mobileLoginModal.addEventListener('click', (e) => {
        if (e.target === mobileLoginModal) {
            mobileLoginModal.classList.remove('active');
            if (mobileLoginError) mobileLoginError.textContent = '';
            if (mobileLoginSuccess) mobileLoginSuccess.style.display = 'none';
            if (otpSection) otpSection.style.display = 'none';
        }
    });
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (mobileLoginModal) mobileLoginModal.classList.remove('active');
        if (mobileLoginError) mobileLoginError.textContent = '';
        if (mobileLoginSuccess) mobileLoginSuccess.style.display = 'none';
        if (otpSection) otpSection.style.display = 'none';
    }
});

// --- Login with Mobile Number and OTP (in mobile modal) ---
if (loginWithMobileBtn && loginMobileInput) {
    loginWithMobileBtn.addEventListener('click', function () {
        if (mobileLoginError) mobileLoginError.textContent = '';
        if (mobileLoginSuccess) mobileLoginSuccess.style.display = 'none';
        const mobile = loginMobileInput.value.trim();
        if (!/^\d{10}$/.test(mobile)) {
            mobileLoginError.textContent = "Please enter a valid 10-digit mobile number.";
            return;
        }
        // Setup reCAPTCHA
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                size: 'invisible',
                callback: function(response) {}
            });
        }
        const appVerifier = window.recaptchaVerifier;
        // Send OTP
        firebase.auth().signInWithPhoneNumber("+91" + mobile, appVerifier)
            .then(function(result) {
                confirmationResult = result;
                if (otpSection) otpSection.style.display = '';
                mobileLoginError.textContent = "OTP sent to your mobile number.";
            })
            .catch(function(error) {
                mobileLoginError.textContent = error.message.replace('Firebase:', '');
                if (window.recaptchaVerifier) {
                    window.recaptchaVerifier.clear();
                    window.recaptchaVerifier = null;
                }
            });
    });
}

if (verifyOtpBtn && loginOtpInput) {
    verifyOtpBtn.addEventListener('click', function () {
        if (!confirmationResult) {
            mobileLoginError.textContent = "Please request OTP first.";
            return;
        }
        const otp = loginOtpInput.value.trim();
        if (!/^\d{6}$/.test(otp)) {
            mobileLoginError.textContent = "Please enter a valid 6-digit OTP.";
            return;
        }
        confirmationResult.confirm(otp)
            .then(function(result) {
                // User signed in successfully.
                if (mobileLoginSuccess) mobileLoginSuccess.style.display = 'block';
                setTimeout(() => {
                    if (mobileLoginModal) mobileLoginModal.classList.remove('active');
                    if (mobileLoginSuccess) mobileLoginSuccess.style.display = 'none';
                    window.location.href = "home.html"; // Immediate redirect after login
                }, 1200);
            })
            .catch(function(error) {
                mobileLoginError.textContent = error.message.replace('Firebase:', '');
            });
    });
}


