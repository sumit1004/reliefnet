// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });
}

// How It Works Popup
const howBtn = document.getElementById('howItWorksBtn');
const howModal = document.getElementById('HowItWorks');
const howClose = document.getElementById('howItWorksClose');
if (howBtn && howModal) {
    howBtn.addEventListener('click', () => {
        howModal.classList.add('active');
    });
}
if (howClose && howModal) {
    howClose.addEventListener('click', () => {
        howModal.classList.remove('active');
    });
}
if (howModal) {
    howModal.addEventListener('click', (e) => {
        if (e.target === howModal) {
            howModal.classList.remove('active');
        }
    });
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && howModal) {
        howModal.classList.remove('active');
    }
});

// Logout button logic
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (typeof firebase !== "undefined" && firebase.auth) {
            firebase.auth().signOut().then(function() {
                window.location.href = "index.html";
            });
        } else {
            window.location.href = "index.html";
        }
    });
}
