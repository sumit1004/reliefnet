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
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
