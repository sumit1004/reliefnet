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
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    function checkMobile() {
        if (window.innerWidth <= 700) {
            menuToggle.style.display = 'flex';
            navMenu.classList.remove('open');
        } else {
            menuToggle.style.display = 'none';
            navMenu.classList.remove('open');
        }
    }
    checkMobile();
    window.addEventListener('resize', checkMobile);
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
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
    navMenu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 700) {
                navMenu.classList.remove('open');
                document.body.classList.remove('nav-open');
            }
        });
    });
});

// --- Multi-language codes ---
const translations = {
    en: {
        hero_title: "Empowering communities in crisis.",
        hero_desc: "Request help, find shelters, and stay informed during disasters.",
        request_sos: "SOS Help",
        nearby_shelters: "Nearby Shelters & Safe Zones",
        shelter: "Shelter",
        medical_camp: "Medical Camp",
        food_center: "Food Center",
        resources_nearby: "Available Resources Nearby",
        missing_persons: "Missing Persons",
        report_missing: "Report Missing",
        emergency_contacts: "Emergency Contacts",
        food: "Food",
        water: "Water",
        shelter: "Shelter",
        medical: "Medical",
        rescue: "Rescue",
        urgency: "Urgency",
        low: "Low",
        medium: "Medium",
        high: "High",
        critical: "Critical",
        detect_location: "Detect",
        submit_sos: "Submit SOS"
    },
    hi: {
        hero_title: "संकट में समुदायों को सशक्त बनाना।",
        hero_desc: "मदद माँगें, शरण स्थल खोजें, और आपदा के दौरान सूचित रहें।",
        request_sos: "एसओएस सहायता",
        nearby_shelters: "नज़दीकी शरण स्थल और सुरक्षित क्षेत्र",
        shelter: "शरण स्थल",
        medical_camp: "चिकित्सा शिविर",
        food_center: "भोजन केंद्र",
        resources_nearby: "नज़दीकी उपलब्ध संसाधन",
        missing_persons: "लापता व्यक्ति",
        report_missing: "लापता रिपोर्ट करें",
        emergency_contacts: "आपातकालीन संपर्क",
        food: "भोजन",
        water: "पानी",
        shelter: "शरण",
        medical: "चिकित्सा",
        rescue: "राहत",
        urgency: "आपात स्थिति",
        low: "कम",
        medium: "मध्यम",
        high: "उच्च",
        critical: "गंभीर",
        detect_location: "पता लगाएँ",
        submit_sos: "एसओएस भेजें"
    },
    bn: {
        hero_title: "সংকটে সম্প্রদায়কে ক্ষমতায়ন।",
        hero_desc: "সহায়তা অনুরোধ করুন, আশ্রয়স্থল খুঁজুন, এবং দুর্যোগের সময় তথ্য পান।",
        request_sos: "এসওএস সহায়তা",
        nearby_shelters: "কাছাকাছি আশ্রয় ও নিরাপদ এলাকা",
        shelter: "আশ্রয়",
        medical_camp: "চিকিৎসা শিবির",
        food_center: "খাদ্য কেন্দ্র",
        resources_nearby: "কাছাকাছি উপলব্ধ সম্পদ",
        missing_persons: "নিখোঁজ ব্যক্তি",
        report_missing: "নিখোঁজ রিপোর্ট করুন",
        emergency_contacts: "জরুরি যোগাযোগ",
        food: "খাদ্য",
        water: "পানি",
        shelter: "আশ্রয়",
        medical: "চিকিৎসা",
        rescue: "উদ্ধার",
        urgency: "জরুরীতা",
        low: "কম",
        medium: "মাঝারি",
        high: "উচ্চ",
        critical: "গুরুত্বপূর্ণ",
        detect_location: "সনাক্ত করুন",
        submit_sos: "এসওএস পাঠান"
    },
    ta: {
        hero_title: "அவசரத்தில் சமூகங்களை அதிகாரப்படுத்துதல்.",
        hero_desc: "உதவி கோருங்கள், தங்கும் இடங்களை கண்டறியுங்கள், பேரழிவில் தகவல் பெறுங்கள்.",
        request_sos: "SOS உதவி",
        nearby_shelters: "அருகிலுள்ள தங்கும் இடங்கள் மற்றும் பாதுகாப்பு பகுதிகள்",
        shelter: "தங்கும் இடம்",
        medical_camp: "மருத்துவ முகாம்",
        food_center: "உணவு மையம்",
        resources_nearby: "அருகிலுள்ள வளங்கள்",
        missing_persons: "காணாமல் போனவர்கள்",
        report_missing: "காணாமல் போனவர் அறிக்கை",
        emergency_contacts: "அவசர தொடர்புகள்",
        food: "உணவு",
        water: "தண்ணீர்",
        shelter: "தங்கும் இடம்",
        medical: "மருத்துவம்",
        rescue: "மீட்பு",
        urgency: "அவசரம்",
        low: "குறைவு",
        medium: "நடுத்தர",
        high: "உயர்",
        critical: "மிகவும் அவசரம்",
        detect_location: "கண்டறி",
        submit_sos: "SOS சமர்ப்பிக்கவும்"
    }
};
const langSelect = document.getElementById('langSelect');
const supportedLangs = Object.keys(translations);
supportedLangs.forEach(l => {
    const opt = document.createElement('option');
    opt.value = l;
    opt.textContent = l.toUpperCase();
    langSelect.appendChild(opt);
});
function setLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}
langSelect.addEventListener('change', function() {
    setLang(this.value);
    localStorage.setItem('reliefnet_lang', this.value);
});
const savedLang = localStorage.getItem('reliefnet_lang') || 'en';
langSelect.value = savedLang;
setLang(savedLang);

// --- Alerts / Announcements ---
const alertsSection = document.getElementById('alertsSection');
function loadAlerts() {
    firebase.database().ref('alerts').orderByChild('timestamp').limitToLast(5).on('value', snap => {
        alertsSection.innerHTML = '';
        if (snap.exists()) {
            snap.forEach(child => {
                const alert = child.val();
                const div = document.createElement('div');
                div.className = 'alert-card';
                div.textContent = alert.message;
                alertsSection.appendChild(div);
            });
        }
    });
}
loadAlerts();

// --- Save our soles code
const sosBtn = document.getElementById('sosBtn');
const sosModal = document.getElementById('sosModal');
const sosModalClose = document.getElementById('sosModalClose');
sosBtn.addEventListener('click', function(e) {
    e.preventDefault();
    sosModal.classList.add('active');
    document.getElementById('sosFormMsg').textContent = '';
});
sosModalClose.addEventListener('click', () => {
    sosModal.classList.remove('active');
});
sosModal.addEventListener('click', (e) => {
    if (e.target === sosModal) {
        sosModal.classList.remove('active');
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        sosModal.classList.remove('active');
    }
});

// --- Save our soles Form Logic ---
const sosForm = document.getElementById('sosForm');
const sosFormMsg = document.getElementById('sosFormMsg');
const sosLocationInput = document.getElementById('sosLocation');
const detectLocationBtn = document.getElementById('detectLocationBtn');
if (detectLocationBtn && sosLocationInput) {
    detectLocationBtn.addEventListener('click', function(e) {
        e.preventDefault();
        sosLocationInput.value = 'Detecting...';
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(pos) {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                sosLocationInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
            }, function() {
                sosLocationInput.value = 'Unable to detect location';
            });
        } else {
            sosLocationInput.value = 'Geolocation not supported';
        }
    });
}
if (sosForm) {
    sosForm.onsubmit = function(e) {
        e.preventDefault();
        if (sosFormMsg) sosFormMsg.textContent = '';
        const name = document.getElementById('sosName').value.trim();
        const phone = document.getElementById('sosPhone').value.trim();
        const location = sosLocationInput.value.trim();
        const urgency = document.getElementById('sosUrgency').value;
        const details = document.getElementById('sosDetails').value.trim();
        const helpTypes = Array.from(document.querySelectorAll('input[name="helpType"]:checked')).map(cb => cb.value);
        const photoFile = document.getElementById('sosPhoto').files[0];

        if (!name || !phone || !location || !urgency || helpTypes.length === 0) {
            if (sosFormMsg) sosFormMsg.textContent = 'Please fill all required fields.';
            return false;
        }

        // Validate photo file type if present
        if (photoFile) {
            const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
            if (!allowedTypes.includes(photoFile.type)) {
                sosFormMsg.textContent = 'Only PNG and JPEG images are allowed.';
                return false;
            }
        }

        const sosRef = firebase.database().ref('sos').push();
        const sosData = {
            name,
            phone,
            location,
            urgency,
            details,
            helpTypes,
            status: 'Submitted | Awaiting Action',
            timestamp: Date.now()
        };
        function afterSOSUpload(photoUrl) {
            if (photoUrl) sosData.photoUrl = photoUrl;
            sosRef.set(sosData).then(() => {
                if (sosFormMsg) {
                    sosFormMsg.style.color = '#2b8a78';
                    sosFormMsg.textContent = 'SOS submitted successfully!';
                }
                sosForm.reset();
                setTimeout(() => {
                    const sosModal = document.getElementById('sosModal');
                    if (sosModal) sosModal.classList.remove('active');
                    if (sosFormMsg) sosFormMsg.textContent = '';
                }, 1200);
            });
        }
        if (photoFile) {
            const ext = photoFile.name.split('.').pop().toLowerCase();
            const fileName = `${sosRef.key}_${Date.now()}.${ext}`;
            const storageRef = firebase.storage().ref('sos_photos/' + fileName);
            storageRef.put(photoFile)
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(url => {
                    afterSOSUpload(url);
                })
                .catch(err => {
                    if (sosFormMsg) sosFormMsg.textContent = 'Photo upload failed: ' + err.message;
                    afterSOSUpload();
                });
        } else {
            afterSOSUpload();
        }
    };
}

// --- Auto-fill phone if logged in ---
firebase.auth().onAuthStateChanged(function(user) {
    if (user && user.phoneNumber) {
        document.getElementById('sosPhone').value = user.phoneNumber;
    }
    // Show/hide logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.style.display = user ? '' : 'none';
        logoutBtn.onclick = function(e) {
            e.preventDefault();
            firebase.auth().signOut().then(function() {
                window.location.href = "index.html";
            });
        };
    }
});

// --- SOS Status Card ---
const sosStatusSection = document.getElementById('sosStatusSection');
function loadMySOS() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            sosStatusSection.innerHTML = '';
            return;
        }
        firebase.database().ref('sos').orderByChild('phone').equalTo(user.phoneNumber || '').on('value', snap => {
            sosStatusSection.innerHTML = '';
            if (snap.exists()) {
                snap.forEach(child => {
                    const sos = child.val();
                    const card = document.createElement('div');
                    card.className = 'sos-status-card';
                    card.innerHTML = `
                        <div><b>Request ID:</b> ${child.key}</div>
                        <div class="status"><b>Status:</b> ${sos.status}</div>
                        <div><b>Logged:</b> ${new Date(sos.timestamp).toLocaleString()}</div>
                        ${sos.assignedVolunteer ? `<div><b>Volunteer:</b> ${sos.assignedVolunteer}</div>` : ''}
                        <button class="cancel-btn">Cancel</button>
                    `;
                    card.querySelector('.cancel-btn').addEventListener('click', function() {
                        firebase.database().ref('sos/' + child.key).update({status: 'Cancelled'});
                    });
                    sosStatusSection.appendChild(card);
                });
            }
        });
    });
}
loadMySOS();

// --- Map & Shelters ---
let map, markers = [];
function initMap() {
    map = L.map('map').setView([23.2599, 77.4126], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    loadShelters('shelter');
}
function loadShelters(type) {
    markers.forEach(m => map.removeLayer(m));
    markers = [];
    firebase.database().ref('shelters').orderByChild('type').equalTo(type).once('value').then(snap => {
        if (snap.exists()) {
            snap.forEach(child => {
                const s = child.val();
                const marker = L.marker([s.lat, s.lng]).addTo(map);
                marker.bindPopup(`<b>${s.name}</b><br>${s.address}<br>Status: ${s.status}<br>Capacity Left: ${s.capacity}`);
                markers.push(marker);
            });
        }
    });
}
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        loadShelters(this.getAttribute('data-type'));
    });
});
setTimeout(initMap, 500);

// --- Resources Nearby ---
const resourcesList = document.getElementById('resourcesList');
function loadResources() {
    firebase.database().ref('resources').orderByChild('timestamp').limitToLast(10).on('value', snap => {
        resourcesList.innerHTML = '';
        if (snap.exists()) {
            snap.forEach(child => {
                const r = child.val();
                const card = document.createElement('div');
                card.className = 'resource-card';
                card.innerHTML = `
                    <div><b>${r.name}</b></div>
                    <div>${r.type}</div>
                    <div>${r.address}</div>
                    <div>${r.openTime ? 'Open: ' + r.openTime : ''} ${r.closeTime ? 'Close: ' + r.closeTime : ''}</div>
                    <div>${r.distance ? 'Distance: ' + r.distance + ' km' : ''}</div>
                `;
                resourcesList.appendChild(card);
            });
        }
    });
}
loadResources();

// --- Missing Person Report ---
const missingForm = document.getElementById('missingForm');
const missingList = document.getElementById('missingList');
if (missingForm) {
    missingForm.onsubmit = function(e) {
        e.preventDefault();
        const name = document.getElementById('missingName').value.trim();
        const age = document.getElementById('missingAge').value.trim();
        const lastSeen = document.getElementById('missingLastSeen').value.trim();
        const photoFile = document.getElementById('missingPhoto').files[0];
        if (!name || !age || !lastSeen) return false;
        const missingRef = firebase.database().ref('missing').push();
        function afterUpload(photoUrl) {
            missingRef.set({
                name, age, lastSeen, photoUrl: photoUrl || '', timestamp: Date.now()
            });
            missingForm.reset();
        }
        if (photoFile) {
            // Fix: Always use put(photoFile) and get the download URL from the uploadTask's ref
            const storageRef = firebase.storage().ref('missing_photos/' + missingRef.key + '_' + Date.now() + '_' + photoFile.name);
            storageRef.put(photoFile)
                .then(() => storageRef.getDownloadURL())
                .then(url => afterUpload(url))
                .catch(() => afterUpload(''));
        } else {
            afterUpload('');
        }
        return false;
    };
}

