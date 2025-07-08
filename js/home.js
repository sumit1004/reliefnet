// Logout 
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (typeof firebase !== "undefined" && firebase.auth) {
            firebase.auth().signOut().then(function () {
                window.location.href = "index.html";
            });
        } else {
            window.location.href = "index.html";
        }
    });
}

// --- Firebase Init ---
const firebaseConfig = {
    apiKey: "AIzaSyCtbphQnrs9-GRWU-rXV29ryfOo4nRwVOs",
    authDomain: "reliefnet-ca9c3.firebaseapp.com",
    databaseURL: "https://reliefnet-ca9c3-default-rtdb.firebaseio.com",
    projectId: "reliefnet-ca9c3",
    storageBucket: "reliefnet-ca9c3.appspot.com",
    messagingSenderId: "511314183423",
    appId: "1:511314183423:web:d419ebe1a552b393b1f8ca",
    measurementId: "G-G89QL5968J"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// --- Responsive Nav ---
document.addEventListener('DOMContentLoaded', function () {
    const logoutBtn = document.getElementById('logoutBtn');
    firebase.auth().onAuthStateChanged(function (user) {
        if (logoutBtn) {
            logoutBtn.style.display = user ? '' : 'none';
        }
    });
});



firebase.auth().onAuthStateChanged(function (user) {
    if (logoutBtn) logoutBtn.style.display = user ? '' : 'none';
    if (sidebarLogoutBtn) sidebarLogoutBtn.style.display = user ? '' : 'none';
});
function logoutHandler(e) {
    e.preventDefault();
    if (typeof firebase !== "undefined" && firebase.auth) {
        firebase.auth().signOut().then(function () {
            window.location.href = "index.html";
        });
    } else {
        window.location.href = "index.html";
    }
}
if (logoutBtn) {
    logoutBtn.addEventListener('click', logoutHandler);
}
if (sidebarLogoutBtn) {
    sidebarLogoutBtn.addEventListener('click', logoutHandler);
}
function logoutHandler(e) {
    e.preventDefault();
    if (typeof firebase !== "undefined" && firebase.auth) {
        firebase.auth().signOut().then(function () {
            window.location.href = "index.html";
        });
    } else {
        window.location.href = "index.html";
    }
}
if (logoutBtn) {
    logoutBtn.addEventListener('click', logoutHandler);
}
if (sidebarLogoutBtn) {
    sidebarLogoutBtn.addEventListener('click', logoutHandler);
}



