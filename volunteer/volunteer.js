 const profileFirebaseConfig = {
      apiKey: "AIzaSyB--dzAihIn7xoGBHpPYHFDxd5cwJGhNLc",
      authDomain: "reliefnet-volunteer.firebaseapp.com",
      databaseURL: "https://reliefnet-volunteer-default-rtdb.firebaseio.com", // <-- ADD THIS LINE
      projectId: "reliefnet-volunteer",
      storageBucket: "reliefnet-volunteer.firebasestorage.app",
      messagingSenderId: "207099035894",
      appId: "1:207099035894:web:245fc66d81a73b5de96cd7",
      measurementId: "G-3V4EJMLYFX"
    };

    // --- SOS/Missing Firebase config ---
    const reportsFirebaseConfig = {
      apiKey: "AIzaSyCtbphQnrs9-GRWU-rXV29ryfOo4nRwVOs",
      authDomain: "reliefnet-ca9c3.firebaseapp.com",
      databaseURL: "https://reliefnet-ca9c3-default-rtdb.firebaseio.com",
      projectId: "reliefnet-ca9c3",
      storageBucket: "reliefnet-ca9c3.firebasestorage.app",
      messagingSenderId: "511314183423",
      appId: "1:511314183423:web:d419ebe1a552b393b1f8ca",
      measurementId: "G-G89QL5968J"
    };

    // Initialize Profile Firebase app (named)
    const profileApp = firebase.initializeApp(profileFirebaseConfig, "profileApp");
    const profileDb = profileApp.database();
    const profileAuth = profileApp.auth();

    // Initialize Reports Firebase app (named)
    const reportsApp = firebase.initializeApp(reportsFirebaseConfig, "reportsApp");
    const reportsDb = reportsApp.database();

    // --- SOS & Missing Reports ---
    function renderReports(type, containerId) {
      const ref = reportsDb.ref(type);
      const container = document.getElementById(containerId);
      if (!container) return;

      ref.on("value", function(snapshot) {
        const data = snapshot.val() || {};
        let html = "";
        const keys = Object.keys(data);
        if (keys.length === 0) {
          html = '<div style="color:#888;">No reports found.</div>';
        } else {
          keys.reverse().forEach((k) => {
            const r = data[k];
            html += '<div style="border:1px solid #ddd;padding:1em;margin-bottom:1em;border-radius:8px;">';
            html += '<div><b>Name:</b> ' + (r.name || "-") + '</div>';
            html += '<div><b>Phone:</b> ' + (r.phone || r.contact || "-") + '</div>';
            html += '<div><b>Location:</b> ' + (r.location || "-") + '</div>';
            html += '<div><b>Details:</b> ' + (r.details || "-") + '</div>';
            html += '<div><b>Urgency:</b> ' + (r.urgency || "-") + '</div>';
            html += '<div><b>Status:</b> ' + (r.status || "-") + '</div>';
            html += '<div style="font-size:0.9em;color:#888;margin-top:0.5em;">Submitted: ' + (r.timestamp ? new Date(r.timestamp).toLocaleString() : "-") + '</div>';
            html += '</div>';
          });
        }
        container.innerHTML = html;
      });
    }

    renderReports("sos", "sosReportsContainer");
    renderReports("missing", "missingReportsContainer");

    // Logout button logic
    document.getElementById("logoutBtn").onclick = function() {
      window.location.href = "../index.html";
    };

    // Profile popup logic
    const profilePopup = document.getElementById("profilePopup");
    const profilePopupClose = document.getElementById("profilePopupClose");
    document.getElementById("profileIconBtn").onclick = function(e) {
      e.preventDefault();
      if (profilePopup) profilePopup.style.display = "flex";
      // Fetch and show profile data
      if (profileAuth.currentUser) {
        const uid = profileAuth.currentUser.uid;
        // Use correct database URL for volunteers
        const ref = profileDb.ref("volunteers/" + uid);
        ref.once("value").then(snap => {
          const data = snap.val() || {};
          document.getElementById("popupName").textContent = data.name || "";
          document.getElementById("popupEmail").textContent = data.email || profileAuth.currentUser.email || "";
          document.getElementById("popupMobile").textContent = data.mobile || "";
          document.getElementById("popupLocation").textContent = data.location || "";
        });
      }
    };
    if (profilePopupClose) {
      profilePopupClose.onclick = function() {
        profilePopup.style.display = "none";
      };
    }
    window.onclick = function(e) {
      if (e.target === profilePopup) {
        profilePopup.style.display = "none";
      }
    };