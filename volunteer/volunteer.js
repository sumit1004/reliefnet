// --- Profile Firebase config ---
const profileFirebaseConfig = {
  apiKey: "AIzaSyB--dzAihIn7xoGBHpPYHFDxd5cwJGhNLc",
  authDomain: "reliefnet-volunteer.firebaseapp.com",
  databaseURL: "https://reliefnet-volunteer-default-rtdb.firebaseio.com",
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

// Volunteer Teams Firebase config (for teams data)
const teamsFirebaseConfig = {
  apiKey: "AIzaSyB--dzAihIn7xoGBHpPYHFDxd5cwJGhNLc",
  authDomain: "reliefnet-volunteer.firebaseapp.com",
  databaseURL: "https://reliefnet-volunteer-default-rtdb.firebaseio.com",
  projectId: "reliefnet-volunteer",
  storageBucket: "reliefnet-volunteer.firebasestorage.app",
  messagingSenderId: "207099035894",
  appId: "1:207099035894:web:245fc66d81a73b5de96cd7",
  measurementId: "G-3V4EJMLYFX"
};

// Initialize Profile Firebase app (named)
const profileApp = firebase.initializeApp(profileFirebaseConfig, "profileApp");
const profileDb = profileApp.database();
const profileAuth = profileApp.auth();

// Initialize Reports Firebase app (named)
const reportsApp = firebase.initializeApp(reportsFirebaseConfig, "reportsApp");
const reportsDb = reportsApp.database();

// Initialize a separate Firebase app for teams if not already initialized
let teamsApp;
try {
  teamsApp = firebase.app("teamsApp");
} catch (e) {
  teamsApp = firebase.initializeApp(teamsFirebaseConfig, "teamsApp");
}
const teamsDb = teamsApp.database();

// --- Volunteer Team Section ---
function loadVolunteerTeam() {
  const teamDiv = document.getElementById("volunteerTeamSection");
  if (!profileAuth.currentUser) {
    teamDiv.innerHTML = "<div style='color:#888;'>Login to view your team.</div>";
    return;
  }
  const uid = profileAuth.currentUser.uid;
  profileDb.ref("volunteers/" + uid).once("value").then(snap => {
    const data = snap.val() || {};
    if (data.team) {
      teamDiv.innerHTML = `<div style="font-size:1.1em;"><b>Team:</b> <span style="color:#2d8f6f;font-weight:600;">${data.team}</span></div>`;
    } else {
      teamDiv.innerHTML = "<div style='color:#888;'>No team assigned.</div>";
    }
  });
}

// Load volunteer's team details and members from Firebase
function showVolunteerTeam() {
  const teamDiv = document.getElementById("volunteerTeamSection");
  teamDiv.innerHTML = "<div style='color:#888;'>Loading your team info...</div>";

  const demoUid = "vol1"; 
  // Fetch volunteer's team name from Firebase
  profileDb.ref("volunteers/" + demoUid).once("value").then(volSnap => {
    const volData = volSnap.val() || {};
    if (!volData.team) {
      teamDiv.innerHTML = "<div style='color:#888;'>No team assigned.</div>";
      return;
    }
    const teamName = volData.team;
    // Fetch team details from Firebase
    profileDb.ref("teams/" + teamName).once("value").then(teamSnap => {
      const teamData = teamSnap.val();
      if (!teamData) {
        teamDiv.innerHTML = `<div style='color:#888;'>Team <b>${teamName}</b> not found.</div>`;
        return;
      }
      let html = `<div style="font-size:1.1em;"><b>Team:</b> <span style="color:#2d8f6f;font-weight:600;">${teamName}</span></div>`;
      html += `<div><b>Team Lead:</b> <span style="color:#2d8f6f;">${teamData.lead || '-'}</span></div>`;
      html += `<div><b>Region:</b> <span style="color:#555;">${teamData.region || '-'}</span></div>`;
      if (Array.isArray(teamData.members) && teamData.members.length > 0) {
        html += `<div style="margin-top:0.7em;"><b>Members:</b><ul style="margin:0.5em 0 0 1.2em;padding:0;">`;
        teamData.members.forEach(m => {
          html += `<li style="margin-bottom:0.2em;">${m}</li>`;
        });
        html += `</ul></div>`;
      } else {
        html += `<div><b>Members:</b> <span style="color:#888;">No members listed</span></div>`;
      }
      teamDiv.innerHTML = html;
    });
  });
}

// Call on page load (for demo, not on auth)
showVolunteerTeam();

// --- Available Resources Section ---
const resourcesDb = profileApp.database();

// Add more resource rows on + icon click
document.addEventListener("click", function(e) {
  if (e.target.closest(".addResourceBtn")) {
    e.preventDefault();
    const resourceInputs = document.getElementById("resourceInputs");
    const newRow = document.createElement("div");
    newRow.className = "resource-row";
    newRow.innerHTML = `
      <div>
        <label style="font-weight:600;visibility:hidden;">Resource Type</label>
        <input type="text" class="resourceTypeInput" placeholder="e.g. Food" required>
      </div>
      <div>
        <label style="font-weight:600;visibility:hidden;">Quantity</label>
        <input type="number" class="resourceQtyInput" min="1" required>
      </div>
      <button type="button" class="removeResourceBtn" aria-label="Remove Resource">
        <i class="fa fa-minus"></i>
      </button>
    `;
    resourceInputs.appendChild(newRow);
  }
  if (e.target.closest(".removeResourceBtn")) {
    e.preventDefault();
    const row = e.target.closest(".resource-row");
    if (row && row.parentNode.childElementCount > 1) {
      row.parentNode.removeChild(row);
    }
  }
});

document.getElementById("resourceForm").onsubmit = function(e) {
  e.preventDefault();
  const typeInputs = document.querySelectorAll(".resourceTypeInput");
  const qtyInputs = document.querySelectorAll(".resourceQtyInput");
  const location = document.getElementById("resourceLocation").value.trim();
  let resources = [];
  for (let i = 0; i < typeInputs.length; i++) {
    const type = typeInputs[i].value.trim();
    const qty = qtyInputs[i].value.trim();
    if (!type || !qty) {
      alert("Please fill all resource fields.");
      return;
    }
    resources.push({ type, quantity: qty });
  }
  if (!location) {
    alert("Please enter location.");
    return;
  }
  const resourceData = {
    resources: resources,
    location: location,
    timestamp: Date.now()
  };
  resourcesDb.ref("resources").push(resourceData, function(err) {
    if (!err) {
      document.getElementById("resourceForm").reset();
      // Remove extra rows except the first
      const resourceInputs = document.getElementById("resourceInputs");
      while (resourceInputs.childElementCount > 1) {
        resourceInputs.removeChild(resourceInputs.lastChild);
      }
    }
  });
};

function renderResourceList() {
  const listDiv = document.getElementById("resourceList");
  resourcesDb.ref("resources").orderByChild("timestamp").on("value", function(snapshot) {
    const data = snapshot.val() || {};
    let html = "";
    const keys = Object.keys(data);
    if (keys.length === 0) {
      html = '<div style="color:#888;">No resources added yet.</div>';
    } else {
      keys.reverse().forEach(k => {
        const r = data[k];
        html += `<div style="background:#fff;border:1px solid #e0e0e0;border-radius:7px;padding:1em;margin-bottom:1em;box-shadow:0 1px 4px rgba(0,0,0,0.04);">`;
        if (Array.isArray(r.resources)) {
          html += `<div><b>Resources:</b> `;
          html += r.resources.map(res => `${res.type} (${res.quantity})`).join(', ');
          html += `</div>`;
        } else {
          html += `<div><b>Type:</b> ${r.type || '-'}</div>`;
          html += `<div><b>Quantity:</b> ${r.quantity || '-'}</div>`;
        }
        html += `<div><b>Location:</b> ${r.location || '-'}</div>`;
        html += `<div style="font-size:0.9em;color:#888;margin-top:0.5em;">Added: ${r.timestamp ? new Date(r.timestamp).toLocaleString() : '-'}</div>`;
        html += `</div>`;
      });
    }
    listDiv.innerHTML = html;
  });
}
renderResourceList();

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

// --- Assigned Tasks: Load and Save to Firebase codes---
const tasksDb = profileApp.database();

let assignedTasks = [];
let performanceStats = { completed: 0, helped: 0, badges: [] };

// Load assigned tasks from Firebase
function loadAssignedTasks() {
  const uid = "vol1"; 
  tasksDb.ref("assignedTasks/" + uid).on("value", function(snapshot) {
    assignedTasks = [];
    const data = snapshot.val() || {};
    Object.keys(data).forEach(key => {
      assignedTasks.push({ ...data[key], id: key });
    });
    renderAssignedTasks();
  });
}

// Save task status update to Firebase
function updateTaskStatus(taskId, newStatus) {
  const uid = "vol1";
  const task = assignedTasks.find(t => t.id === taskId);
  if (task) {
    task.status = newStatus;
    tasksDb.ref("assignedTasks/" + uid + "/" + taskId + "/status").set(newStatus);
  }
}

// Render assigned tasks
function renderAssignedTasks() {
  const container = document.getElementById("assignedTasksList");
  if (!container) return;
  if (!assignedTasks.length) {
    container.innerHTML = "<div style='color:#888;'>No tasks assigned.</div>";
    return;
  }
  container.innerHTML = "";
  assignedTasks.forEach(task => {
    const card = document.createElement("div");
    card.className = "task-card";
    card.innerHTML = `
      <div class="task-header">${task.title}</div>
      <div class="task-desc">${task.description}</div>
      <div class="task-meta">
        <span><i class="fa fa-map-marker"></i> ${task.location}</span>
        <span><i class="fa fa-clock-o"></i> ${task.deadline}</span>
      </div>
      <div class="task-status-badge status-${task.status ? task.status.toLowerCase().replace(/ /g,'-') : 'pending'}">${task.status || "Pending"}</div>
      <div class="task-progress-btns">
        <button class="btn start-btn" data-id="${task.id}">Start</button>
        <button class="btn halfway-btn" data-id="${task.id}">Halfway Done</button>
        <button class="btn complete-btn" data-id="${task.id}">Mark as Completed</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Task progress update logic
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("start-btn")) {
    updateTaskStatus(e.target.dataset.id, "In Progress");
  }
  if (e.target.classList.contains("halfway-btn")) {
    updateTaskStatus(e.target.dataset.id, "Halfway Done");
  }
  if (e.target.classList.contains("complete-btn")) {
    updateTaskStatus(e.target.dataset.id, "Completed");
  }
});

// --- Performance Tracker: Load from Firebase ---
function loadPerformanceStats() {
  const uid = "vol1";
  tasksDb.ref("performance/" + uid).on("value", function(snapshot) {
    performanceStats = snapshot.val() || { completed: 0, helped: 0, badges: [] };
    renderPerformanceStats();
  });
}

// Performance tracker
function renderPerformanceStats() {
  document.getElementById("tasksCompleted").textContent = performanceStats.completed;
  document.getElementById("peopleHelped").textContent = performanceStats.helped;
  document.getElementById("badgesEarned").textContent = performanceStats.badges.join(", ");
}

// --- Resource Request Form: Store in Firebase ---
document.getElementById("resourceRequestForm").onsubmit = function(e) {
  e.preventDefault();
  const type = document.getElementById("requestResourceType").value.trim();
  const qty = document.getElementById("requestResourceQty").value.trim();
  const msg = document.getElementById("requestResourceMsg").value.trim();
  if (!type || !qty || !msg) {
    document.getElementById("resourceRequestStatus").textContent = "Please fill all fields.";
    return;
  }
  // Store request in Firebase
  tasksDb.ref("resourceRequests").push({
    type,
    quantity: qty,
    message: msg,
    timestamp: Date.now()
  }, function() {
    document.getElementById("resourceRequestStatus").textContent = "Request submitted successfully!";
    document.getElementById("resourceRequestForm").reset();
    setTimeout(() => {
      document.getElementById("resourceRequestStatus").textContent = "";
    }, 2500);
  });
};

// --- Document Upload Section: Store file metadata in Firebase (demo, no actual file upload) ---
document.getElementById("documentUploadForm").onsubmit = function(e) {
  e.preventDefault();
  const fileInput = document.getElementById("taskProofFile");
  if (!fileInput.files.length) {
    document.getElementById("uploadStatus").textContent = "Please select a file.";
    return;
  }
  // Store file info in Firebase (simulate upload)
  const file = fileInput.files[0];
  tasksDb.ref("taskProofUploads").push({
    name: file.name,
    type: file.type,
    size: file.size,
    uploadedAt: Date.now()
  }, function() {
    document.getElementById("uploadStatus").textContent = "File uploaded successfully!";
    document.getElementById("documentUploadForm").reset();
    setTimeout(() => {
      document.getElementById("uploadStatus").textContent = "";
    }, 2500);
  });
};

// --- Upcoming Tasks and Alerts: Store in Firebase (optional, fallback to dummy) ---
function loadUpcomingTasks() {
  const uid = "vol1";
  tasksDb.ref("upcomingTasks/" + uid).on("value", function(snapshot) {
    const data = snapshot.val();
    let upcomingTasks = [];
    if (data) {
      upcomingTasks = Object.values(data);
    } else {
      // fallback dummy
      upcomingTasks = [
        { title: "Check water supply at Village C", time: "Today 14:00" },
        { title: "Briefing with team lead", time: "Today 16:00" }
      ];
    }
    renderUpcomingTasks(upcomingTasks);
  });
}


function renderUpcomingTasks(upcomingTasks) {
  document.getElementById("todaysBriefing").textContent =
    "Today's Briefing: Focus on food distribution and medical support in affected villages.";
  const list = document.getElementById("upcomingTasksList");
  list.innerHTML = "";
  upcomingTasks.forEach(t => {
    const li = document.createElement("li");
    li.textContent = `${t.title} (${t.time})`;
    list.appendChild(li);
  });
}

// --- Initial renders and listeners ---
loadAssignedTasks();
loadPerformanceStats();
loadUpcomingTasks();

// --- Map Section: Show Nearby Shelters, Medical Camps, Food Centers ---
(function() {
  const reliefConfig = {
    apiKey: "AIzaSyDgNYKQB0cuL4LnEEz897Mcq0_N_dQ_a1o",
    authDomain: "reliefnet-admin.firebaseapp.com",
    databaseURL: "https://reliefnet-admin-default-rtdb.firebaseio.com",
    projectId: "reliefnet-admin",
    storageBucket: "reliefnet-admin.firebasestorage.app",
    messagingSenderId: "76512879742",
    appId: "1:76512879742:web:9a834f2991c0b09198a42f",
    measurementId: "G-6W1RHH9L62"
  };
  let reliefApp;
  if (!firebase.apps.some(app => app.name === "reliefCentersApp")) {
    reliefApp = firebase.initializeApp(reliefConfig, "reliefCentersApp");
  } else {
    reliefApp = firebase.app("reliefCentersApp");
  }
  const reliefDb = reliefApp.database();

  let map, markerLayer, centersData = [];
  let mapInitialized = false;

  function initMap() {
    if (mapInitialized) return;
    const mapDiv = document.getElementById('reliefMap');
    if (!mapDiv) return;
    map = L.map(mapDiv).setView([21.1938, 81.3509], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    markerLayer = L.layerGroup().addTo(map);
    mapInitialized = true;
  }

  function fetchCenters() {
    reliefDb.ref('reliefCenters').on('value', snap => {
      const data = snap.val();
      centersData = [];
      if (data) {
        Object.values(data).forEach(center => {
          if (center.type && center.lat && center.lng) {
            centersData.push(center);
          }
        });
      }
      showCenters('shelter');
    });
  }

  function showCenters(type) {
    if (!markerLayer) return;
    markerLayer.clearLayers();
    let typeLabel = '';
    let iconUrl = '';
    if (type === 'shelter') {
      typeLabel = 'Shelter';
      iconUrl = "https://cdn-icons-png.flaticon.com/512/69/69524.png";
    } else if (type === 'medical') {
      typeLabel = 'Medical Camp';
      iconUrl = "https://cdn-icons-png.flaticon.com/512/2965/2965567.png";
    } else if (type === 'food') {
      typeLabel = 'Food Center';
      iconUrl = "https://cdn-icons-png.flaticon.com/512/1046/1046784.png";
    }
    centersData.forEach(center => {
      if (center.type && center.type.toLowerCase() === typeLabel.toLowerCase()) {
        const marker = L.marker([center.lat, center.lng], {
          icon: L.icon({
            iconUrl: iconUrl,
            iconSize: [28, 28],
            iconAnchor: [14, 28],
            popupAnchor: [0, -28]
          })
        }).addTo(markerLayer);
        marker.bindPopup(`<b>${center.type}</b><br>${center.address || ''}`);
      }
    });
  }

  function setupMapFilters() {
    const mapSection = document.querySelector('.map-section');
    if (!mapSection) return;
    mapSection.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        mapSection.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        showCenters(this.getAttribute('data-type'));
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
      initMap();
      fetchCenters();
      setupMapFilters();
    }, 500);
  });
})();
