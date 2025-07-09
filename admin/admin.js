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
                // Assign to volunteer
                let volunteerApp = firebase.app("volunteerApp");
                dbRef = volunteerApp.database().ref('volunteers/' + key + '/assignedWork');
            } else if (type === 'team') {
                // Assign to team
                let teamApp = firebase.app("teamApp");
                dbRef = teamApp.database().ref('teams/' + key + '/assignedWork');
            }
            dbRef.set(task, function(error) {
                if (error) {
                    document.getElementById('assignStatus').innerText = 'Failed to assign work.';
                } else {
                    document.getElementById('assignStatus').innerText = 'Work assigned successfully!';
                    setTimeout(() => { modal.style.display = 'none'; }, 1200);
                }
            });
        };
    }
});
