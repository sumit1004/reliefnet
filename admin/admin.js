// Admin Dashboard UI Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar logic
    const menuToggle = document.getElementById('adminMenuToggle');
    const sidebar = document.getElementById('adminSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
    if (menuToggle && sidebar && sidebarOverlay) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.add('open');
            sidebarOverlay.classList.add('open');
        });
        // Close sidebar on overlay click
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('open');
        });
        // Close sidebar on close button
        if (sidebarCloseBtn) {
            sidebarCloseBtn.addEventListener('click', function() {
                sidebar.classList.remove('open');
                sidebarOverlay.classList.remove('open');
            });
        }
        // Close sidebar on link click
        sidebar.querySelectorAll('.sidebar-link').forEach(function(link) {
            link.addEventListener('click', function() {
                sidebar.classList.remove('open');
                sidebarOverlay.classList.remove('open');
            });
        });
    }

    // Sync active nav-link and sidebar-link
    function setActiveNav(hash) {
        document.querySelectorAll('.nav-link').forEach(function(l) {
            l.classList.remove('active');
            if (l.getAttribute('href') === hash) l.classList.add('active');
        });
        document.querySelectorAll('.sidebar-link').forEach(function(l) {
            l.classList.remove('active');
            if (l.getAttribute('href') === hash) l.classList.add('active');
        });
    }
    document.querySelectorAll('.nav-link, .sidebar-link').forEach(function(link) {
        link.addEventListener('click', function() {
            setActiveNav(link.getAttribute('href'));
        });
    });

    // Logout button logic for both desktop and sidebar
    function adminLogout() {
        window.location.href = "../index.html";
    }
    var adminLogoutBtn = document.getElementById('adminLogoutBtn');
    var sidebarLogoutBtn = document.getElementById('sidebarLogoutBtn');
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', adminLogout);
    }
    if (sidebarLogoutBtn) {
        sidebarLogoutBtn.addEventListener('click', adminLogout);
    }

    // === Firebase SOS Section ===
    if (typeof firebase !== "undefined") {
        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyCtbphQnrs9-GRWU-rXV29ryfOo4nRwVOs",
            authDomain: "reliefnet-ca9c3.firebaseapp.com",
            databaseURL: "https://reliefnet-ca9c3-default-rtdb.firebaseio.com",
            projectId: "reliefnet-ca9c3",
            storageBucket: "reliefnet-ca9c3.firebasestorage.app",
            messagingSenderId: "511314183423",
            appId: "1:511314183423:web:d419ebe1a552b393b1f8ca",
            measurementId: "G-G89QL5968J"
        };
        // Initialize Firebase only if not already initialized
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        const db = firebase.database();

        // Fetch and display SOS submissions
        function renderSOS(sosData) {
            const sosList = document.getElementById('sosList');
            if (!sosList) return;
            sosList.innerHTML = '';
            if (!sosData) {
                sosList.innerHTML = '<p>No SOS submissions found.</p>';
                return;
            }
            let table = `<table class="sos-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Location</th>
                        <th>Details</th>
                        <th>Help Types</th>
                        <th>Urgency</th>
                        <th>Status</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
            `;
            Object.entries(sosData).reverse().forEach(([key, sos]) => {
                table += `
                    <tr>
                        <td>${sos.name || 'N/A'}</td>
                        <td>${sos.phone || 'N/A'}</td>
                        <td>${sos.location || 'N/A'}</td>
                        <td>${sos.details || 'N/A'}</td>
                        <td>${Array.isArray(sos.helpTypes) ? sos.helpTypes.join(', ') : (sos.helpTypes || 'N/A')}</td>
                        <td>${sos.urgency || 'N/A'}</td>
                        <td>${sos.status || 'N/A'}</td>
                        <td>${sos.timestamp ? new Date(sos.timestamp).toLocaleString() : 'N/A'}</td>
                    </tr>
                `;
            });
            table += '</tbody></table>';
            sosList.innerHTML = table;
        }

        db.ref('sos').on('value', (snapshot) => {
            renderSOS(snapshot.val());
        });
    }

    // === Firebase Missing Section ===
    if (typeof firebase !== "undefined") {
        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyCtbphQnrs9-GRWU-rXV29ryfOo4nRwVOs",
            authDomain: "reliefnet-ca9c3.firebaseapp.com",
            databaseURL: "https://reliefnet-ca9c3-default-rtdb.firebaseio.com",
            projectId: "reliefnet-ca9c3",
            storageBucket: "reliefnet-ca9c3.firebasestorage.app",
            messagingSenderId: "511314183423",
            appId: "1:511314183423:web:d419ebe1a552b393b1f8ca",
            measurementId: "G-G89QL5968J"
        };
        // Initialize Firebase only if not already initialized
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        const db = firebase.database();

        // Fetch and display Missing submissions
        function renderMissing(missingData) {
            const missingList = document.getElementById('missingList');
            if (!missingList) return;
            missingList.innerHTML = '';
            if (!missingData) {
                missingList.innerHTML = '<p>No missing submissions found.</p>';
                return;
            }
            let table = `<table class="missing-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Aadhar</th>
                        <th>Father</th>
                        <th>Contact</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>Last Seen</th>
                        <th>Clothes</th>
                        <th>Other</th>
                        <th>Photo</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
            `;
            Object.entries(missingData).reverse().forEach(([key, entry]) => {
                table += `
                    <tr>
                        <td>${entry.name || 'N/A'}</td>
                        <td>${entry.age || 'N/A'}</td>
                        <td>${entry.gender || 'N/A'}</td>
                        <td>${entry.aadhar || 'N/A'}</td>
                        <td>${entry.father || 'N/A'}</td>
                        <td>${entry.contact || entry.phone || 'N/A'}</td>
                        <td>${entry.city || 'N/A'}</td>
                        <td>${entry.state || 'N/A'}</td>
                        <td>${entry.country || 'N/A'}</td>
                        <td>${entry.lastSeen || entry.lastSeenLocation || entry.location || 'N/A'}</td>
                        <td>${entry.clothes || 'N/A'}</td>
                        <td>${entry.other || 'N/A'}</td>
                        <td>${
                            entry.photoUrl
                                ? `<a href="${entry.photoUrl}" target="_blank">View</a>`
                                : 'N/A'
                        }</td>
                        <td>${entry.timestamp ? new Date(entry.timestamp).toLocaleString() : 'N/A'}</td>
                    </tr>
                `;
            });
            table += '</tbody></table>';
            missingList.innerHTML = table;
        }

        db.ref('missing').on('value', (snapshot) => {
            renderMissing(snapshot.val());
        });
    }

    // === Firebase Volunteer Section ===
    // Use a separate Firebase app for volunteers
    if (typeof firebase !== "undefined") {
        const volunteerConfig = {
            apiKey: "AIzaSyB--dzAihIn7xoGBHpPYHFDxd5cwJGhNLc",
            authDomain: "reliefnet-volunteer.firebaseapp.com",
            databaseURL: "https://reliefnet-volunteer-default-rtdb.firebaseio.com",
            projectId: "reliefnet-volunteer",
            storageBucket: "reliefnet-volunteer.firebasestorage.app",
            messagingSenderId: "207099035894",
            appId: "1:207099035894:web:245fc66d81a73b5de96cd7",
            measurementId: "G-3V4EJMLYFX"
        };
        let volunteerApp;
        if (firebase.apps.length < 2) {
            volunteerApp = firebase.initializeApp(volunteerConfig, "volunteerApp");
        } else {
            volunteerApp = firebase.app("volunteerApp");
        }
        const volunteerDb = volunteerApp.database();

        function renderVolunteers(volunteers) {
            const volunteerList = document.getElementById('volunteerList');
            if (!volunteerList) return;
            volunteerList.innerHTML = '';
            if (!volunteers) {
                volunteerList.innerHTML = '<p>No volunteers found.</p>';
                return;
            }
            let table = `<table class="volunteer-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Action</th>
                        <th>Assign Work</th>
                        <th>Assigned Work</th>
                    </tr>
                </thead>
                <tbody>
            `;
            Object.entries(volunteers).reverse().forEach(([key, v]) => {
                table += `
                    <tr>
                        <td>${v.name || 'N/A'}</td>
                        <td>${v.team || 'N/A'}</td>
                        <td>
                            <button class="volunteer-view-btn" data-key="${key}">View Details</button>
                        </td>
                        <td>
                            <button class="volunteer-assign-btn" data-key="${key}">Assign Work</button>
                        </td>
                        <td>${v.assignedWork ? v.assignedWork : 'Not Assigned'}</td>
                    </tr>
                `;
            });
            table += '</tbody></table>';
            volunteerList.innerHTML = table;

            // Add event listeners for view buttons
            document.querySelectorAll('.volunteer-view-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const key = this.getAttribute('data-key');
                    showVolunteerDetail(volunteers[key]);
                });
            });

            // Add event listeners for assign buttons
            document.querySelectorAll('.volunteer-assign-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const key = this.getAttribute('data-key');
                    openAssignModal('volunteer', key, volunteers[key]);
                });
            });
        }

        function showVolunteerDetail(volunteer) {
            const modal = document.getElementById('volunteerModal');
            const content = document.getElementById('volunteerDetailContent');
            if (!modal || !content) return;
            let html = '';
            Object.entries(volunteer).forEach(([k, v]) => {
                html += `<div><strong>${k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> ${v || 'N/A'}</div>`;
            });
            content.innerHTML = html;
            modal.style.display = 'flex';
        }

        // Close modal logic
        const closeBtn = document.getElementById('closeVolunteerModal');
        const modal = document.getElementById('volunteerModal');
        if (closeBtn && modal) {
            closeBtn.onclick = () => { modal.style.display = 'none'; };
            window.onclick = function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            };
        }

        volunteerDb.ref('volunteers').on('value', (snapshot) => {
            renderVolunteers(snapshot.val());
        });
    }

    // === Firebase Team Section (Import all team data and show member count) ===
    if (typeof firebase !== "undefined") {
        // Use a separate Firebase app for teams if not already initialized
        let teamApp;
        if (!firebase.apps.some(app => app.name === "teamApp")) {
            teamApp = firebase.initializeApp({
                apiKey: "AIzaSyB--dzAihIn7xoGBHpPYHFDxd5cwJGhNLc",
                authDomain: "reliefnet-volunteer.firebaseapp.com",
                databaseURL: "https://reliefnet-volunteer-default-rtdb.firebaseio.com",
                projectId: "reliefnet-volunteer",
                storageBucket: "reliefnet-volunteer.firebasestorage.app",
                messagingSenderId: "207099035894",
                appId: "1:207099035894:web:245fc66d81a73b5de96cd7",
                measurementId: "G-3V4EJMLYFX"
            }, "teamApp");
        } else {
            teamApp = firebase.app("teamApp");
        }
        const teamDb = teamApp.database();

        function renderTeamsAllData(teams) {
            const teamList = document.getElementById('teamList');
            if (!teamList) return;
            teamList.innerHTML = '';
            if (!teams) {
                teamList.innerHTML = '<p>No teams found.</p>';
                return;
            }
            let table = `<table class="team-table">
                <thead>
                    <tr>
                        <th>Team Name</th>
                        <th>Assigned Place</th>
                        <th>Assigned Members</th>
                        <th>Members Count</th>
                        <th>All Data</th>
                        <th>Assign Work</th>
                        <th>Assigned Work</th>
                    </tr>
                </thead>
                <tbody>
            `;
            Object.entries(teams).reverse().forEach(([key, team]) => {
                let membersCount = 0;
                let membersList = '';
                if (team.members && typeof team.members === 'object') {
                    if (Array.isArray(team.members)) {
                        membersCount = team.members.length;
                        membersList = team.members.join(', ');
                    } else {
                        membersCount = Object.keys(team.members).length;
                        membersList = Object.values(team.members).join(', ');
                    }
                }
                table += `
                    <tr>
                        <td>${team.name || key || 'N/A'}</td>
                        <td>${team.place ? team.place : 'Not Assigned'}</td>
                        <td>${team.assignedMembers ? team.assignedMembers : (membersList || 'N/A')}</td>
                        <td>${membersCount}</td>
                        <td>
                            <button class="team-view-btn" data-key="${key}">View All</button>
                        </td>
                        <td>
                            <button class="team-assign-btn" data-key="${key}">Assign Work</button>
                        </td>
                        <td>${team.assignedWork ? team.assignedWork : 'Not Assigned'}</td>
                    </tr>
                `;
            });
            table += '</tbody></table>';
            teamList.innerHTML = table;

            // Add modal for viewing all team data
            if (!document.getElementById('teamModal')) {
                const modalDiv = document.createElement('div');
                modalDiv.id = 'teamModal';
                modalDiv.className = 'volunteer-modal';
                modalDiv.style.display = 'none';
                modalDiv.innerHTML = `
                    <div class="volunteer-modal-content">
                        <span id="closeTeamModal" class="close-volunteer-modal">&times;</span>
                        <h3>Team Details</h3>
                        <div id="teamDetailContent"></div>
                    </div>
                `;
                document.body.appendChild(modalDiv);
            }
            const teamModal = document.getElementById('teamModal');
            const closeTeamModal = document.getElementById('closeTeamModal');
            if (closeTeamModal && teamModal) {
                closeTeamModal.onclick = () => { teamModal.style.display = 'none'; };
                window.addEventListener('click', function(event) {
                    if (event.target === teamModal) {
                        teamModal.style.display = 'none';
                    }
                });
            }
            document.querySelectorAll('.team-view-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const key = this.getAttribute('data-key');
                    const team = teams[key];
                    let html = '';
                    Object.entries(team).forEach(([k, v]) => {
                        let value = v;
                        if (typeof v === 'object') {
                            value = Array.isArray(v) ? v.join(', ') : JSON.stringify(v);
                        }
                        html += `<div><strong>${k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> ${value || 'N/A'}</div>`;
                    });
                    document.getElementById('teamDetailContent').innerHTML = html;
                    document.getElementById('teamModal').style.display = 'flex';
                });
            });

            // Add event listeners for assign buttons in team section
            document.querySelectorAll('.team-assign-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const key = this.getAttribute('data-key');
                    openAssignModal('team', key, teams[key]);
                });
            });
        }

        // Assignment Modal (shared for volunteer/team)
        function openAssignModal(type, key, data) {
            // Create modal if not exists
            let modal = document.getElementById('assignModal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'assignModal';
                modal.className = 'volunteer-modal';
                modal.style.display = 'none';
                modal.innerHTML = `
                    <div class="volunteer-modal-content">
                        <span id="closeAssignModal" class="close-volunteer-modal">&times;</span>
                        <h3>Assign Work</h3>
                        <form id="assignForm">
                            <label for="assignTask">Task/Work:</label>
                            <input type="text" id="assignTask" name="assignTask" required style="width:95%;margin-bottom:1em;">
                            <button type="submit" class="volunteer-view-btn" style="margin-top:0.5em;">Assign</button>
                        </form>
                        <div id="assignStatus" style="margin-top:1em;color:#2563eb;"></div>
                    </div>
                `;
                document.body.appendChild(modal);
            }
            // Show modal
            modal.style.display = 'flex';
            document.getElementById('assignTask').value = '';
            document.getElementById('assignStatus').innerText = '';
            // Close logic
            document.getElementById('closeAssignModal').onclick = () => { modal.style.display = 'none'; };
            window.onclick = function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            };
            // Submit logic
            document.getElementById('assignForm').onsubmit = function(e) {
                e.preventDefault();
                const task = document.getElementById('assignTask').value.trim();
                if (!task) return;
                let dbRef;
                if (type === 'volunteer') {
                    let volunteerApp = firebase.app("volunteerApp");
                    dbRef = volunteerApp.database().ref('volunteers/' + key + '/assignedWork');
                } else if (type === 'team') {
                    let teamApp = firebase.app("teamApp");
                    dbRef = teamApp.database().ref('teams/' + key + '/assignedWork');
                }
                dbRef.set(task, function(error) {
                    if (error) {
                        document.getElementById('assignStatus').innerText = 'Failed to assign work.';
                    } else {
                        document.getElementById('assignStatus').innerText = 'Work assigned successfully!';
                        setTimeout(() => { modal.style.display = 'none'; }, 1200);
                        // Refresh the table after assignment
                        if (type === 'volunteer') {
                            let volunteerApp = firebase.app("volunteerApp");
                            volunteerApp.database().ref('volunteers').once('value', snap => {
                                renderVolunteers(snap.val());
                            });
                        } else if (type === 'team') {
                            let teamApp = firebase.app("teamApp");
                            teamApp.database().ref('teams').once('value', snap => {
                                renderTeamsAllData(snap.val());
                            });
                        }
                    }
                });
            };
        }

        teamDb.ref('teams').on('value', (snapshot) => {
            renderTeamsAllData(snapshot.val());
        });
    }

    // === Firebase Resources Section ===
    if (typeof firebase !== "undefined") {
        // Use a dedicated app for resources with the provided config
        const resourcesConfig = {
            apiKey: "AIzaSyDgNYKQB0cuL4LnEEz897Mcq0_N_dQ_a1o",
            authDomain: "reliefnet-admin.firebaseapp.com",
            databaseURL: "https://reliefnet-admin-default-rtdb.firebaseio.com",
            projectId: "reliefnet-admin",
            storageBucket: "reliefnet-admin.firebasestorage.app",
            messagingSenderId: "76512879742",
            appId: "1:76512879742:web:9a834f2991c0b09198a42f",
            measurementId: "G-6W1RHH9L62"
        };
        let resourcesApp;
        if (!firebase.apps.some(app => app.name === "resourcesApp")) {
            resourcesApp = firebase.initializeApp(resourcesConfig, "resourcesApp");
        } else {
            resourcesApp = firebase.app("resourcesApp");
        }
        const resourcesDb = resourcesApp.database();

        // Add Resource Form Logic
        const addResourceForm = document.getElementById('addResourceForm');
        if (addResourceForm) {
            addResourceForm.onsubmit = function(e) {
                e.preventDefault();
                // Removed name field
                const type = document.getElementById('resourceType').value.trim();
                const quantity = parseInt(document.getElementById('resourceQuantity').value, 10);
                const location = document.getElementById('resourceLocation').value.trim();
                const status = document.getElementById('resourceStatus').value;
                const statusDiv = document.getElementById('addResourceStatus');
                if (!type || !quantity || !location) {
                    statusDiv.innerText = "Please fill all fields.";
                    return;
                }
                const newResource = {
                    type,
                    quantity,
                    location,
                    status,
                    updatedAt: Date.now()
                };
                resourcesDb.ref('resources').push(newResource, function(error) {
                    if (error) {
                        statusDiv.innerText = "Failed to add resource.";
                    } else {
                        statusDiv.innerText = "Resource added successfully!";
                        addResourceForm.reset();
                        setTimeout(() => { statusDiv.innerText = ""; }, 1200);
                    }
                });
            };
        }

        function renderResources(resourcesData) {
            const resourcesList = document.getElementById('resourcesList');
            if (!resourcesList) return;
            resourcesList.innerHTML = '';
            if (!resourcesData) {
                resourcesList.innerHTML = '<p>No resources available.</p>';
                return;
            }
            let table = `<table class="resources-table">
                <thead>
                    <tr>
                        <th>Resource</th>
                        <th>Quantity</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Last Updated</th>
                    </tr>
                </thead>
                <tbody>
            `;
            Object.entries(resourcesData).reverse().forEach(([key, res]) => {
                table += `
                    <tr>
                        <td>${res.type || 'N/A'}</td>
                        <td>${res.quantity || 'N/A'}</td>
                        <td>${res.location || 'N/A'}</td>
                        <td>${res.status || 'Available'}</td>
                        <td>${res.updatedAt ? new Date(res.updatedAt).toLocaleString() : 'N/A'}</td>
                    </tr>
                `;
            });
            table += '</tbody></table>';
            resourcesList.innerHTML = table;
        }

        resourcesDb.ref('resources').on('value', (snapshot) => {
            renderResources(snapshot.val());
        });
    }

    // === Map & Relief Centers Section ===
    if (typeof firebase !== "undefined") {
        // Use the resourcesApp for map data as well
        let mapDb;
        if (firebase.apps.some(app => app.name === "resourcesApp")) {
            mapDb = firebase.app("resourcesApp").database();
        } else {
            // fallback: use default app
            mapDb = firebase.database();
        }

        // Initialize Leaflet map
        let map, markerLayer;
        function initMap() {
            if (document.getElementById('map')) {
                map = L.map('map').setView([21.1938, 81.3509], 13); // Bhilai, Chhattisgarh
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap contributors'
                }).addTo(map);
                markerLayer = L.layerGroup().addTo(map);

                // Click to fill lat/lng
                map.on('click', function(e) {
                    document.getElementById('locationLat').value = e.latlng.lat.toFixed(6);
                    document.getElementById('locationLng').value = e.latlng.lng.toFixed(6);
                });
            }
        }
        setTimeout(initMap, 400); // Wait for DOM

        // Add Location Form Logic
        const addLocationForm = document.getElementById('addLocationForm');
        if (addLocationForm) {
            addLocationForm.onsubmit = function(e) {
                e.preventDefault();
                const type = document.getElementById('locationType').value;
                // Removed name field
                const address = document.getElementById('locationAddress').value.trim();
                const lat = parseFloat(document.getElementById('locationLat').value);
                const lng = parseFloat(document.getElementById('locationLng').value);
                const statusDiv = document.getElementById('addLocationStatus');
                if (!type || !address || isNaN(lat) || isNaN(lng)) {
                    statusDiv.innerText = "Please fill all fields.";
                    return;
                }
                const newLoc = {
                    type,
                    address,
                    lat,
                    lng,
                    createdAt: Date.now()
                };
                mapDb.ref('reliefCenters').push(newLoc, function(error) {
                    if (error) {
                        statusDiv.innerText = "Failed to add location.";
                    } else {
                        statusDiv.innerText = "Location added successfully!";
                        addLocationForm.reset();
                        setTimeout(() => { statusDiv.innerText = ""; }, 1200);
                    }
                });
            };
        }

        // Render locations on map and in list
        function renderLocations(locations) {
            const listDiv = document.getElementById('locationsList');
            if (markerLayer) markerLayer.clearLayers();
            if (!locations) {
                if (listDiv) listDiv.innerHTML = "<p>No relief centers added yet.</p>";
                return;
            }
            let html = `<table class="resources-table"><thead>
                <tr><th>Type</th><th>Address</th><th>Lat</th><th>Lng</th><th>Added</th></tr>
            </thead><tbody>`;
            Object.entries(locations).reverse().forEach(([key, loc]) => {
                html += `<tr>
                    <td>${loc.type}</td>
                    <td>${loc.address}</td>
                    <td>${loc.lat}</td>
                    <td>${loc.lng}</td>
                    <td>${loc.createdAt ? new Date(loc.createdAt).toLocaleString() : ''}</td>
                </tr>`;
                // Add marker to map
                if (markerLayer && map) {
                    const icon = L.icon({
                        iconUrl:
                            loc.type === "Shelter"
                                ? "https://cdn-icons-png.flaticon.com/512/69/69524.png"
                                : loc.type === "Medical Camp"
                                ? "https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
                                : "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
                        iconSize: [28, 28],
                        iconAnchor: [14, 28],
                        popupAnchor: [0, -28]
                    });
                    L.marker([loc.lat, loc.lng], { icon })
                        .addTo(markerLayer)
                        .bindPopup(`<b>${loc.type}</b><br>${loc.address}`);
                }
            });
            html += "</tbody></table>";
            if (listDiv) listDiv.innerHTML = html;
        }

        mapDb.ref('reliefCenters').on('value', (snapshot) => {
            renderLocations(snapshot.val());
        });
    }

    // === Firebase NGO Section ===
    if (typeof firebase !== "undefined") {
        const ngoConfig = {
            apiKey: "AIzaSyBB7xNTgCBvCm4UdEq4CwJLrdoDzjLfGXU",
            authDomain: "reliefnet-ngo.firebaseapp.com",
            databaseURL: "https://reliefnet-ngo-default-rtdb.firebaseio.com",
            projectId: "reliefnet-ngo",
            storageBucket: "reliefnet-ngo.firebasestorage.app",
            messagingSenderId: "726996101151",
            appId: "1:726996101151:web:80970999af3f0b483fcd2a",
            measurementId: "G-86P79VT5EE"
        };
        let ngoApp;
        if (!firebase.apps.some(app => app.name === "ngoApp")) {
            ngoApp = firebase.initializeApp(ngoConfig, "ngoApp");
        } else {
            ngoApp = firebase.app("ngoApp");
        }
        const ngoDb = ngoApp.database();

        function renderNGOs(ngos) {
            const ngoList = document.getElementById('ngoList');
            if (!ngoList) return;
            ngoList.innerHTML = '';
            if (!ngos) {
                ngoList.innerHTML = '<p>No NGOs found.</p>';
                return;
            }
            let table = `<table class="resources-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Website</th>
                        <th>Registered</th>
                    </tr>
                </thead>
                <tbody>
            `;
            Object.entries(ngos).reverse().forEach(([key, ngo]) => {
                table += `
                    <tr>
                        <td>${ngo.name || 'N/A'}</td>
                        <td>${ngo.contact || ngo.phone || 'N/A'}</td>
                        <td>${ngo.email || 'N/A'}</td>
                        <td>${ngo.address || 'N/A'}</td>
                        <td>${ngo.website ? `<a href="${ngo.website}" target="_blank">Visit</a>` : 'N/A'}</td>
                        <td>${ngo.registeredAt ? new Date(ngo.registeredAt).toLocaleString() : 'N/A'}</td>
                    </tr>
                `;
            });
            table += '</tbody></table>';
            ngoList.innerHTML = table;
        }

        ngoDb.ref('ngos').on('value', (snapshot) => {
            renderNGOs(snapshot.val());
        });
    }

    // === Donations Section ===
    if (typeof firebase !== "undefined") {
        // Admin donations from resourcesApp
        let adminDonationsDb;
        if (firebase.apps.some(app => app.name === "resourcesApp")) {
            adminDonationsDb = firebase.app("resourcesApp").database();
        } else {
            adminDonationsDb = firebase.database();
        }

        // NGO donations from ngoApp
        let ngoDonationsDb;
        if (firebase.apps.some(app => app.name === "ngoApp")) {
            ngoDonationsDb = firebase.app("ngoApp").database();
        }

        // --- DUMMY DATA INSERTION (only if no data exists) ---
        // Admin dummy donations
        adminDonationsDb.ref('donations').once('value', snap => {
            if (!snap.exists()) {
                adminDonationsDb.ref('donations').push({
                    donorName: "John Doe",
                    amount: 5000,
                    type: "Money",
                    contact: "9999999999",
                    timestamp: Date.now() - 86400000,
                    message: "Keep up the good work!"
                });
                adminDonationsDb.ref('donations').push({
                    donorName: "Priya Sharma",
                    amount: 10,
                    type: "Blankets",
                    contact: "8888888888",
                    timestamp: Date.now() - 43200000,
                    message: "Hope this helps."
                });
            }
        });

        // NGO dummy donations (for first 2 NGOs found)
        if (ngoDonationsDb) {
            ngoDonationsDb.ref('ngos').once('value', snap => {
                const ngos = snap.val();
                if (ngos) {
                    let count = 0;
                    Object.entries(ngos).forEach(([ngoKey, ngo]) => {
                        if (count < 2) {
                            const donationsRef = ngoDonationsDb.ref(`ngos/${ngoKey}/donations`);
                            donationsRef.once('value', dsnap => {
                                if (!dsnap.exists()) {
                                    donationsRef.push({
                                        donorName: "Amit Kumar",
                                        amount: 1000,
                                        type: "Money",
                                        contact: "7777777777",
                                        timestamp: Date.now() - 7200000,
                                        message: "Donation for relief."
                                    });
                                    donationsRef.push({
                                        donorName: "Sonal Patel",
                                        amount: 20,
                                        type: "Food Packets",
                                        contact: "6666666666",
                                        timestamp: Date.now() - 3600000,
                                        message: "For food distribution."
                                    });
                                }
                            });
                            count++;
                        }
                    });
                }
            });
        }
        // --- END DUMMY DATA ---

        function renderDonations(adminDonations, ngoDonations) {
            const donationList = document.getElementById('donationList');
            if (!donationList) return;
            let html = '';

            // Admin Donations
            html += `<h3>Direct to Admin</h3>`;
            if (!adminDonations) {
                html += '<p>No direct admin donations found.</p>';
            } else {
                html += `<table class="resources-table"><thead>
                    <tr>
                        <th>Donor Name</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Contact</th>
                        <th>Date</th>
                        <th>Message</th>
                    </tr>
                </thead><tbody>`;
                Object.entries(adminDonations).reverse().forEach(([key, d]) => {
                    html += `<tr>
                        <td>${d.donorName || d.name || 'N/A'}</td>
                        <td>${d.amount || 'N/A'}</td>
                        <td>${d.type || 'N/A'}</td>
                        <td>${d.contact || d.phone || 'N/A'}</td>
                        <td>${d.timestamp ? new Date(d.timestamp).toLocaleString() : 'N/A'}</td>
                        <td>${d.message || ''}</td>
                    </tr>`;
                });
                html += '</tbody></table>';
            }

            // NGO Donations
            html += `<h3>Donations to NGOs</h3>`;
            if (!ngoDonations) {
                html += '<p>No NGO donations found.</p>';
            } else {
                html += `<table class="resources-table"><thead>
                    <tr>
                        <th>NGO</th>
                        <th>Donor Name</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Contact</th>
                        <th>Date</th>
                        <th>Message</th>
                    </tr>
                </thead><tbody>`;
                Object.entries(ngoDonations).forEach(([ngoKey, ngo]) => {
                    if (ngo.donations) {
                        Object.entries(ngo.donations).reverse().forEach(([donKey, d]) => {
                            html += `<tr>
                                <td>${ngo.name || ngoKey}</td>
                                <td>${d.donorName || d.name || 'N/A'}</td>
                                <td>${d.amount || 'N/A'}</td>
                                <td>${d.type || 'N/A'}</td>
                                <td>${d.contact || d.phone || 'N/A'}</td>
                                <td>${d.timestamp ? new Date(d.timestamp).toLocaleString() : 'N/A'}</td>
                                <td>${d.message || ''}</td>
                            </tr>`;
                        });
                    }
                });
                html += '</tbody></table>';
            }

            donationList.innerHTML = html;
        }

        // Fetch both admin and NGO donations and render together
        function fetchAndRenderDonations() {
            // Fetch admin donations
            adminDonationsDb.ref('donations').once('value', adminSnap => {
                const adminDonations = adminSnap.val();
                // Fetch all NGOs and their donations
                if (ngoDonationsDb) {
                    ngoDonationsDb.ref('ngos').once('value', ngoSnap => {
                        const ngos = ngoSnap.val();
                        renderDonations(adminDonations, ngos);
                    });
                } else {
                    renderDonations(adminDonations, null);
                }
            });
        }

        // Initial fetch and on change
        if (adminDonationsDb) {
            adminDonationsDb.ref('donations').on('value', fetchAndRenderDonations);
        }
        if (ngoDonationsDb) {
            ngoDonationsDb.ref('ngos').on('value', fetchAndRenderDonations);
        }
    }
});

