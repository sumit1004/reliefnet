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