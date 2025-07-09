// Helper to load Firebase scripts if not present
function loadFirebaseScripts(callback) {
    const scripts = [
        "https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js",
        "https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js",
        "https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"
    ];
    let loaded = 0;
    scripts.forEach(src => {
        if (![...document.scripts].some(s => s.src.includes(src))) {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                loaded++;
                if (loaded === scripts.length) callback();
            };
            document.head.appendChild(script);
        } else {
            loaded++;
            if (loaded === scripts.length) callback();
        }
    });
}


// NGO Firebase config for accepted tasks
const ngoFirebaseConfig = {
    apiKey: "AIzaSyBB7xNTgCBvCm4UdEq4CwJLrdoDzjLfGXU",
    authDomain: "reliefnet-ngo.firebaseapp.com",
    databaseURL: "https://reliefnet-ngo-default-rtdb.firebaseio.com",
    projectId: "reliefnet-ngo",
    storageBucket: "reliefnet-ngo.firebasestorage.app",
    messagingSenderId: "726996101151",
    appId: "1:726996101151:web:80970999af3f0b483fcd2a",
    measurementId: "G-86P79VT5EE"
};

let ngoApp, ngoDb;
if (typeof firebase !== "undefined") {
    if (!firebase.apps.some(app => app.name === "ngoApp")) {
        ngoApp = firebase.initializeApp(ngoFirebaseConfig, "ngoApp");
    } else {
        ngoApp = firebase.app("ngoApp");
    }
    ngoDb = ngoApp.database();
}

function initFirebaseAndApp() {
    // Initialize Firebase if not already initialized
    if (typeof firebase === "undefined") {
        // Firebase SDK not loaded
        alert("Firebase SDK not loaded. Please include Firebase scripts before this file.");
    } else {
        // Ensure reportsApp is initialized for SOS/Missing
        if (!firebase.apps.some(app => app.name === "reportsApp")) {
            firebase.initializeApp({
                apiKey: "AIzaSyCtbphQnrs9-GRWU-rXV29ryfOo4nRwVOs",
                authDomain: "reliefnet-ca9c3.firebaseapp.com",
                databaseURL: "https://reliefnet-ca9c3-default-rtdb.firebaseio.com",
                projectId: "reliefnet-ca9c3",
                storageBucket: "reliefnet-ca9c3.firebasestorage.app",
                messagingSenderId: "511314183423",
                appId: "1:511314183423:web:d419ebe1a552b393b1f8ca",
                measurementId: "G-G89QL5968J"
            }, "reportsApp");
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        const logoutBtn = document.getElementById('ngoLogoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                // Try to sign out from the NGO Firebase app if available, else just redirect
                if (typeof firebase !== "undefined" && firebase.apps.length) {
                    let ngoApp = null;
                    try {
                        ngoApp = firebase.app("ngoApp");
                    } catch (e) {
                        // fallback: try to find by name property
                        ngoApp = firebase.apps.find(app => app.name === "ngoApp");
                    }
                    if (ngoApp && ngoApp.auth) {
                        ngoApp.auth().signOut().finally(() => {
                            window.location.href = "../index.html";
                        });
                    } else {
                        window.location.href = "../index.html";
                    }
                } else {
                    window.location.href = "../index.html";
                }
            });
        }

        // Modal logic
        const openProfileModalBtn = document.getElementById('openProfileModalBtn');
        const ngoProfileModal = document.getElementById('ngoProfileModal');
        const closeProfileModalBtn = document.getElementById('closeProfileModalBtn');

        if (openProfileModalBtn && ngoProfileModal && closeProfileModalBtn) {
            openProfileModalBtn.addEventListener('click', function() {
                ngoProfileModal.style.display = 'block';
                setTimeout(() => {
                    const firstInput = ngoProfileModal.querySelector('input');
                    if (firstInput) firstInput.focus();
                }, 100);
            });
            closeProfileModalBtn.addEventListener('click', function() {
                ngoProfileModal.style.display = 'none';
            });
            window.addEventListener('click', function(event) {
                if (event.target === ngoProfileModal) {
                    ngoProfileModal.style.display = 'none';
                }
            });
        }

        // NGO Profile Section logic
        const ngoProfileForm = document.getElementById('ngoProfileForm');
        if (ngoProfileForm) {
            // Dummy: Load profile data (replace with real fetch logic)
            const dummyProfile = {
                ngoName: "Helping Hands Foundation",
                ngoEmail: "contact@helpinghands.org",
                ngoPhone: "+91-9876543210",
                ngoRegNo: "REG-2023-001",
                ngoLocation: "Mumbai, Maharashtra"
            };
            document.getElementById('ngoName').value = dummyProfile.ngoName;
            document.getElementById('ngoEmail').value = dummyProfile.ngoEmail;
            document.getElementById('ngoPhone').value = dummyProfile.ngoPhone;
            document.getElementById('ngoRegNo').value = dummyProfile.ngoRegNo;
            document.getElementById('ngoLocation').value = dummyProfile.ngoLocation;

            ngoProfileForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // Collect updated data
                const updatedProfile = {
                    ngoName: document.getElementById('ngoName').value,
                    ngoEmail: document.getElementById('ngoEmail').value,
                    ngoPhone: document.getElementById('ngoPhone').value,
                    ngoRegNo: document.getElementById('ngoRegNo').value,
                    ngoLocation: document.getElementById('ngoLocation').value
                };
                // TODO: Save updatedProfile to backend
                alert('Profile updated successfully!');
                if (ngoProfileModal) ngoProfileModal.style.display = 'none';
            });
        }

        // Reports Section logic
        const reportsTableBody = document.getElementById('reportsTableBody');
        const filterLocation = document.getElementById('filterLocation');
        const filterUrgency = document.getElementById('filterUrgency');
        const filterType = document.getElementById('filterType');
        const applyReportFilters = document.getElementById('applyReportFilters');

        // --- SOS Section ---
        const sosReportsTableBody = document.getElementById('sosReportsTableBody');
        const sosFilterLocation = document.getElementById('sosFilterLocation');
        const sosFilterUrgency = document.getElementById('sosFilterUrgency');
        const sosFilterType = document.getElementById('sosFilterType');
        const applySosFilters = document.getElementById('applySosFilters');
        let sosReports = [];

        function renderSosReportsTable(data) {
            if (!sosReportsTableBody) return;
            sosReportsTableBody.innerHTML = "";
            if (data.length === 0) {
                sosReportsTableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;">No SOS requests found.</td></tr>`;
                return;
            }
            data.forEach(report => {
                // helpTypes as comma separated string
                const helpTypes = Array.isArray(report.helpTypes)
                    ? report.helpTypes.filter(Boolean).join(", ")
                    : (report.helpTypes || "");
                const dateStr = report.timestamp
                    ? new Date(report.timestamp).toLocaleString()
                    : "";
                const details = report.details || "";
                const phone = report.phone || "";
                const name = report.name || "";
                const location = report.location || "";
                const urgency = report.urgency || "";
                const status = report.status || "";
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${name}</td>
                    <td>${phone}</td>
                    <td>${location}</td>
                    <td>${urgency}</td>
                    <td>${helpTypes}</td>
                    <td>${details}</td>
                    <td>${dateStr}</td>
                    <td>${status}</td>
                    <td>
                        <button class="ngo-accept-btn" data-id="${report.id}" ${status !== "Active" ? "disabled" : ""}>
                            Accept
                        </button>
                    </td>
                `;
                sosReportsTableBody.appendChild(row);
            });
        }

        function filterSosReports() {
            let filtered = [...sosReports];
            const loc = sosFilterLocation.value.trim().toLowerCase();
            const urg = sosFilterUrgency.value;
            const typ = sosFilterType.value;
            if (loc) filtered = filtered.filter(r => (r.location||"").toLowerCase().includes(loc));
            if (urg) filtered = filtered.filter(r => r.urgency === urg);
            if (typ) filtered = filtered.filter(r =>
                Array.isArray(r.helpTypes)
                    ? r.helpTypes.some(ht => (ht||"").toLowerCase().includes(typ.toLowerCase()))
                    : (r.helpTypes||"").toLowerCase().includes(typ.toLowerCase())
            );
            renderSosReportsTable(filtered);
        }

        if (applySosFilters) {
            applySosFilters.addEventListener('click', filterSosReports);
        }
        if (sosReportsTableBody) {
            sosReportsTableBody.addEventListener('click', function(e) {
                if (e.target.classList.contains('ngo-accept-btn')) {
                    const id = e.target.getAttribute('data-id');
                    const report = sosReports.find(r => r.id === id);
                    if (report && report.status === "Active") {
                        if (window.firebase && firebase.database) {
                            firebase.database().ref('sos/' + id + '/status').set('Accepted');
                        }
                        report.status = "Accepted";
                        renderSosReportsTable(sosReports);
                        alert(`You have accepted the SOS request: ${report.name}`);
                        // Add to accepted tasks in NGO DB
                        addAcceptedTaskToNgoDb({
                            type: "SOS",
                            originalId: report.id,
                            task: report.name || "",
                            description: report.details || "",
                            location: report.location || "",
                            resources: Array.isArray(report.helpTypes) ? report.helpTypes.filter(Boolean).join(", ") : (report.helpTypes || ""),
                            deadline: report.deadline || (report.timestamp ? new Date(report.timestamp).toLocaleDateString() : ""),
                            status: "Pending",
                            timestamp: Date.now()
                        });
                    }
                }
            });
        }

        // --- Missing Section ---
        const missingReportsTableBody = document.getElementById('missingReportsTableBody');
        const missingFilterLocation = document.getElementById('missingFilterLocation');
        const missingFilterUrgency = document.getElementById('missingFilterUrgency');
        const applyMissingFilters = document.getElementById('applyMissingFilters');
        let missingReports = [];

        function renderMissingReportsTable(data) {
            if (!missingReportsTableBody) return;
            missingReportsTableBody.innerHTML = "";
            if (data.length === 0) {
                missingReportsTableBody.innerHTML = `<tr><td colspan="13" style="text-align:center;">No missing person reports found.</td></tr>`;
                return;
            }
            data.forEach(report => {
                const dateStr = report.timestamp
                    ? new Date(report.timestamp).toLocaleString()
                    : "";
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${report.name || ""}</td>
                    <td>${report.age || ""}</td>
                    <td>${report.gender || ""}</td>
                    <td>${report.aadhar || ""}</td>
                    <td>${report.city || ""}</td>
                    <td>${report.state || ""}</td>
                    <td>${report.country || ""}</td>
                    <td>${report.lastSeen || ""}</td>
                    <td>${report.clothes || ""}</td>
                    <td>${report.father || ""}</td>
                    <td>${report.contact || ""}</td>
                    <td>${report.status || ""}</td>
                    <td>${dateStr}</td>
                    <td>
                        <button class="ngo-accept-btn" data-id="${report.id}" ${report.status !== "Active" ? "disabled" : ""}>
                            Accept
                        </button>
                    </td>
                `;
                missingReportsTableBody.appendChild(row);
            });
        }

        function filterMissingReports() {
            let filtered = [...missingReports];
            const loc = missingFilterLocation.value.trim().toLowerCase();
            const urg = missingFilterUrgency.value;
            if (loc) filtered = filtered.filter(r =>
                ((r.city||"") + " " + (r.state||"") + " " + (r.country||"")).toLowerCase().includes(loc)
            );
            if (urg) filtered = filtered.filter(r => r.urgency === urg);
            renderMissingReportsTable(filtered);
        }

        if (applyMissingFilters) {
            applyMissingFilters.addEventListener('click', filterMissingReports);
        }
        if (missingReportsTableBody) {
            missingReportsTableBody.addEventListener('click', function(e) {
                if (e.target.classList.contains('ngo-accept-btn')) {
                    const id = e.target.getAttribute('data-id');
                    const report = missingReports.find(r => r.id === id);
                    if (report && report.status === "Active") {
                        if (window.firebase && firebase.database) {
                            firebase.database().ref('missing/' + id + '/status').set('Accepted');
                        }
                        report.status = "Accepted";
                        renderMissingReportsTable(missingReports);
                        alert(`You have accepted the missing person report: ${report.name}`);
                        // Add to accepted tasks in NGO DB
                        addAcceptedTaskToNgoDb({
                            type: "Missing",
                            originalId: report.id,
                            task: report.name || "",
                            description: `Missing person: ${report.name || ""}, Age: ${report.age || ""}, Last seen: ${report.lastSeen || ""}`,
                            location: [report.city, report.state, report.country].filter(Boolean).join(", "),
                            resources: report.clothes || "",
                            deadline: report.timestamp ? new Date(report.timestamp).toLocaleDateString() : "",
                            status: "Pending",
                            timestamp: Date.now()
                        });
                    }
                }
            });
        }

        // --- Accepted Tasks Section ---
        const acceptedTasksTableBody = document.getElementById('acceptedTasksTableBody');
        let acceptedTasks = [];

        // Fetch accepted tasks from NGO DB
        function fetchAcceptedTasks() {
            if (ngoDb) {
                ngoDb.ref('acceptedTasks').on('value', function(snapshot) {
                    const data = snapshot.val() || {};
                    acceptedTasks = Object.keys(data).map(id => ({ id, ...data[id] }));
                    renderAcceptedTasksTable();
                });
            }
        }

        // Add accepted task to NGO DB (avoid duplicates)
        function addAcceptedTaskToNgoDb(taskObj) {
            if (!ngoDb) return;
            // Use a unique key based on type and originalId to avoid duplicates
            const uniqueKey = `${taskObj.type}_${taskObj.originalId}`;
            ngoDb.ref('acceptedTasks/' + uniqueKey).set(taskObj);
        }

        // --- Accept logic for SOS ---
        if (sosReportsTableBody) {
            sosReportsTableBody.addEventListener('click', function(e) {
                if (e.target.classList.contains('ngo-accept-btn')) {
                    const id = e.target.getAttribute('data-id');
                    const report = sosReports.find(r => r.id === id);
                    if (report && report.status === "Active") {
                        if (window.firebase && firebase.database) {
                            firebase.database().ref('sos/' + id + '/status').set('Accepted');
                        }
                        report.status = "Accepted";
                        renderSosReportsTable(sosReports);
                        alert(`You have accepted the SOS request: ${report.name}`);
                        addAcceptedTaskToNgoDb({
                            type: "SOS",
                            originalId: report.id,
                            task: report.name || "",
                            description: report.details || "",
                            location: report.location || "",
                            resources: Array.isArray(report.helpTypes) ? report.helpTypes.filter(Boolean).join(", ") : (report.helpTypes || ""),
                            deadline: report.deadline || (report.timestamp ? new Date(report.timestamp).toLocaleDateString() : ""),
                            status: "Pending",
                            timestamp: Date.now()
                        });
                    }
                }
            });
        }

        // --- Accept logic for Missing ---
        if (missingReportsTableBody) {
            missingReportsTableBody.addEventListener('click', function(e) {
                if (e.target.classList.contains('ngo-accept-btn')) {
                    const id = e.target.getAttribute('data-id');
                    const report = missingReports.find(r => r.id === id);
                    if (report && report.status === "Active") {
                        if (window.firebase && firebase.database) {
                            firebase.database().ref('missing/' + id + '/status').set('Accepted');
                        }
                        report.status = "Accepted";
                        renderMissingReportsTable(missingReports);
                        alert(`You have accepted the missing person report: ${report.name}`);
                        addAcceptedTaskToNgoDb({
                            type: "Missing",
                            originalId: report.id,
                            task: report.name || "",
                            description: `Missing person: ${report.name || ""}, Age: ${report.age || ""}, Last seen: ${report.lastSeen || ""}`,
                            location: [report.city, report.state, report.country].filter(Boolean).join(", "),
                            resources: report.clothes || "",
                            deadline: report.timestamp ? new Date(report.timestamp).toLocaleDateString() : "",
                            status: "Pending",
                            timestamp: Date.now()
                        });
                    }
                }
            });
        }

        // --- Render accepted tasks from NGO DB ---
        function renderAcceptedTasksTable() {
            if (!acceptedTasksTableBody) return;
            acceptedTasksTableBody.innerHTML = "";
            if (!acceptedTasks || acceptedTasks.length === 0) {
                acceptedTasksTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">No accepted tasks.</td></tr>`;
                return;
            }
            acceptedTasks.forEach(task => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${task.task}</td>
                    <td>${task.description}</td>
                    <td>${task.location}</td>
                    <td>${task.resources}</td>
                    <td>${task.deadline}</td>
                    <td>${task.status}</td>
                    <td>
                        <select class="ngo-status-select" data-id="${task.id}">
                            <option value="Pending" ${task.status === "Pending" ? "selected" : ""}>Pending</option>
                            <option value="In Progress" ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
                            <option value="Completed" ${task.status === "Completed" ? "selected" : ""}>Completed</option>
                        </select>
                    </td>
                `;
                acceptedTasksTableBody.appendChild(row);
            });
        }

        // Status update for accepted tasks
        if (acceptedTasksTableBody) {
            acceptedTasksTableBody.addEventListener('change', function(e) {
                if (e.target.classList.contains('ngo-status-select')) {
                    const id = e.target.getAttribute('data-id');
                    const newStatus = e.target.value;
                    if (ngoDb) {
                        ngoDb.ref('acceptedTasks/' + id + '/status').set(newStatus);
                    }
                }
            });
        }

        // Fetch accepted tasks on load
        fetchAcceptedTasks();

        // --- SOS and Missing Reports fetching logic ---
        // In fetchSosReports/fetchMissingReports, remove updateAcceptedTasksOnDataChange() and renderAcceptedTasksTable()
        // Accepted tasks are now managed from the NGO DB only.
        function fetchSosReports() {
            let sosDb;
            try {
                sosDb = firebase.app("reportsApp").database();
            } catch (e) {
                sosDb = firebase.database();
            }
            sosDb.ref('sos').on('value', function(snapshot) {
                const data = snapshot.val() || {};
                sosReports = Object.keys(data).map(id => ({ id, ...data[id] }));
                renderSosReportsTable(sosReports);
            });
        }
        function fetchMissingReports() {
            let missingDb;
            try {
                missingDb = firebase.app("reportsApp").database();
            } catch (e) {
                missingDb = firebase.database();
            }
            missingDb.ref('missing').on('value', function(snapshot) {
                const data = snapshot.val() || {};
                missingReports = Object.keys(data).map(id => ({ id, ...data[id] }));
                renderMissingReportsTable(missingReports);
            });
        }
        fetchSosReports();
        fetchMissingReports();

        // Daily Briefing & Alerts (dummy data, replace with real fetch if needed)
        const adminUpdatesList = document.getElementById('adminUpdatesList');
        const taskPrioritiesList = document.getElementById('taskPrioritiesList');
        if (adminUpdatesList) {
            adminUpdatesList.innerHTML = `
                <li>Severe weather alert in North Zone. All teams stay prepared.</li>
                <li>Admin meeting at 4:00 PM via Zoom.</li>
                <li>Submit yesterday's activity report by 2:00 PM.</li>
            `;
        }
        if (taskPrioritiesList) {
            taskPrioritiesList.innerHTML = `
                <li>Prioritize medical supply distribution in Sector 5.</li>
                <li>Urgent: Rescue operation at Riverside area.</li>
                <li>Check-in with relief points for food stock updates.</li>
            `;
        }

        // --- Donation Tracking Section ---
        // Dummy data for demonstration; replace with real fetch from backend/Firebase as needed
        const donationTableBody = document.getElementById('donationTableBody');
        const donationEmptyMsg = document.getElementById('donationEmptyMsg');
        // Example: fetch from Firebase under 'donations/{ngoId}' if you have user auth
        const dummyDonations = [
            { donor: "Amit Sharma", amount: 5000, date: "2024-06-01", message: "Keep up the good work!" },
            { donor: "Priya Verma", amount: 2500, date: "2024-06-03", message: "" },
            { donor: "Anonymous", amount: 10000, date: "2024-06-05", message: "For flood relief." }
        ];
        function renderDonations(donations) {
            if (!donationTableBody) return;
            donationTableBody.innerHTML = "";
            if (!donations || donations.length === 0) {
                if (donationEmptyMsg) donationEmptyMsg.style.display = "block";
                return;
            }
            if (donationEmptyMsg) donationEmptyMsg.style.display = "none";
            donations.forEach(d => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${d.donor || "Anonymous"}</td>
                    <td>₹${d.amount.toLocaleString()}</td>
                    <td>${d.date}</td>
                    <td>${d.message || "-"}</td>
                `;
                donationTableBody.appendChild(row);
            });
        }
        renderDonations(dummyDonations);
    });
}

// Check and load Firebase if needed
if (typeof firebase === "undefined" || typeof firebase.database === "undefined") {
    loadFirebaseScripts(initFirebaseAndApp);
} else {
    initFirebaseAndApp();
}

