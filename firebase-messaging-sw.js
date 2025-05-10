// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js")

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBJGx1bGVaI43YmpoZUPP70DAvFVRMJVWM",
  authDomain: "marul-tarlasii.firebaseapp.com",
  projectId: "marul-tarlasii",
  storageBucket: "marul-tarlasii.firebasestorage.app",
  messagingSenderId: "770930842223",
  appId: "1:770930842223:web:555a834a781469055d8b9a",
  measurementId: "G-ECMY15GHY6",
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload)

  // Customize notification here
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo.png",
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
