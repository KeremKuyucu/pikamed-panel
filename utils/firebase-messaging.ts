import { getMessaging, getToken, onMessage } from "firebase/messaging"

// Firebase Cloud Messaging için yardımcı fonksiyonlar
export const requestNotificationPermission = async (app: any) => {
  try {
    if (!("Notification" in window)) {
      console.log("Bu tarayıcı bildirim desteği sunmuyor")
      return null
    }

    const permission = await Notification.requestPermission()

    if (permission !== "granted") {
      console.log("Bildirim izni reddedildi")
      return null
    }

    console.log("Bildirim izni verildi")

    // FCM token'ı al
    const messaging = getMessaging(app)
    const currentToken = await getToken(messaging, {
      vapidKey: "BDac--G0Z6dAT-ffk4pkSMnk38jIBgWaHiwGDaWrtcR_XSq-LakTVKjc8SqXWq9ArBmg54Dyg99_yz2FHVaWBIs", // Gerçek projenizde bu değeri değiştirin
    })

    if (currentToken) {
      console.log("FCM token:", currentToken)
      return currentToken
    } else {
      console.log("FCM token alınamadı")
      return null
    }
  } catch (error) {
    console.error("Bildirim izni alınırken hata oluştu:", error)
    return null
  }
}

// FCM mesajlarını dinleme
export const listenToMessages = (messaging: any, callback: (payload: any) => void) => {
  return onMessage(messaging, callback)
}

// Service Worker kaydı
export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
        scope: "/",
      })
      console.log("Service Worker başarıyla kaydedildi:", registration)
      return registration
    } catch (error) {
      console.error("Service Worker kaydı başarısız:", error)
      return null
    }
  }
  return null
}
