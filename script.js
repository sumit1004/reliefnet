const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', function() {
        // Mobile menu open or close
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        menuToggle.addEventListener('click', function() {
       navMenu.classList.toggle('open');
            if (navMenu.classList.contains('open')) {
                document.body.classList.add('nav-open');
            } else {
                document.body.classList.remove('nav-open');
            }
        });

        document.addEventListener('click', function(e) {
            if (
                navMenu.classList.contains('open') &&
                !navMenu.contains(e.target) &&
                e.target !== menuToggle &&
                !menuToggle.contains(e.target)
            ) {
                navMenu.classList.remove('open');
                document.body.classList.remove('nav-open');
            }
        });
        //on clicking on button close the sidebar
        navMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 900) {
                    navMenu.classList.remove('open');
                    document.body.classList.remove('nav-open');
                }
            });
        });
    });

    // --- toggle login for mobile ---
    document.addEventListener('DOMContentLoaded', function() {
        var menuToggle = document.getElementById('menuToggle');
        var navMenu = document.getElementById('navMenu');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                navMenu.classList.toggle('open');
                if (navMenu.classList.contains('open')) {
                    document.body.classList.add('nav-open');
                } else {
                    document.body.classList.remove('nav-open');
                }
            });

            // Close sidebar on clicking outside  
            document.addEventListener('click', function(e) {
                if (
                    navMenu.classList.contains('open') &&
                    !navMenu.contains(e.target) &&
                    e.target !== menuToggle &&
                    !menuToggle.contains(e.target)
                ) {
                    navMenu.classList.remove('open');
                    document.body.classList.remove('nav-open');
                }
            });

            // close sidebar on navigation link click 
            navMenu.querySelectorAll('a').forEach(function(link) {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 900) {
                        navMenu.classList.remove('open');
                        document.body.classList.remove('nav-open');
                    }
                });
            });
        }
    });

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


document.addEventListener('DOMContentLoaded', function() {
        const loginBtn = document.getElementById('loginBtn');
        const loginRoleModal = document.getElementById('loginRoleModal');
        const loginRoleClose = document.getElementById('loginRoleClose');
        const victimLoginBtn = document.getElementById('victimLoginBtn');
        const loginModal = document.getElementById('loginModal');


        if (loginModal) {
            loginModal.classList.remove('active');
        }
        if (loginBtn && loginRoleModal) {
            loginBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (loginModal) loginModal.classList.remove('active');
                loginRoleModal.style.display = 'block';
            });
        }
        if (loginRoleClose && loginRoleModal) {
            loginRoleClose.addEventListener('click', function() {
                loginRoleModal.style.display = 'none';
            });
        }
        // Close login popup  on when clicking outside login page
        if (loginRoleModal) {
            loginRoleModal.addEventListener('click', function(e) {
                if (e.target === loginRoleModal) {
                    loginRoleModal.style.display = 'none';
                }
            });
        }
        // Victim Login 
        if (victimLoginBtn && loginModal && loginRoleModal) {
            victimLoginBtn.addEventListener('click', function() {
                loginRoleModal.style.display = 'none';
                loginModal.classList.add('active');
            });
        }

    });

    document.addEventListener('DOMContentLoaded', function() {
        // Mobile menu toggle logic
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        menuToggle.addEventListener('click', function() {
       navMenu.classList.toggle('open');
            if (navMenu.classList.contains('open')) {
                document.body.classList.add('nav-open');
            } else {
                document.body.classList.remove('nav-open');
            }
        });     
        // on clicking outside sidebar is close
        document.addEventListener('click', function(e) {
            if (
                navMenu.classList.contains('open') &&
                !navMenu.contains(e.target) &&
                e.target !== menuToggle &&
                !menuToggle.contains(e.target)
            ) {
                navMenu.classList.remove('open');
                document.body.classList.remove('nav-open');
            }
        });
        //on clicking on button close the sidebar
        navMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 900) {
                    navMenu.classList.remove('open');
                    document.body.classList.remove('nav-open');
                }
            });
        });
    });

    // --- toggle login for mobile ---
    document.addEventListener('DOMContentLoaded', function() {
        var menuToggle = document.getElementById('menuToggle');
        var navMenu = document.getElementById('navMenu');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                navMenu.classList.toggle('open');
                if (navMenu.classList.contains('open')) {
                    document.body.classList.add('nav-open');
                } else {
                    document.body.classList.remove('nav-open');
                }
            });

            // Close sidebar on clicking outside  
            document.addEventListener('click', function(e) {
                if (
                    navMenu.classList.contains('open') &&
                    !navMenu.contains(e.target) &&
                    e.target !== menuToggle &&
                    !menuToggle.contains(e.target)
                ) {
                    navMenu.classList.remove('open');
                    document.body.classList.remove('nav-open');
                }
            });

            // close sidebar on navigation link click 
            navMenu.querySelectorAll('a').forEach(function(link) {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 900) {
                        navMenu.classList.remove('open');
                        document.body.classList.remove('nav-open');
                    }
                });
            });
        }
    });


// --- Signup Logic ---
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