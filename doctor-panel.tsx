"use client"

import { useState, useEffect } from "react"
import { initializeApp } from "firebase/app"
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
import { Sidebar, Header, PatientCard, LoginScreen, PatientDetailModal } from "./components/ui-components"
import { AlertCircle, X } from "lucide-react"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJGx1bGVaI43YmpoZUPP70DAvFVRMJVWM",
  authDomain: "marul-tarlasii.firebaseapp.com",
  projectId: "marul-tarlasii",
  storageBucket: "marul-tarlasii.firebasestorage.app",
  messagingSenderId: "770930842223",
  appId: "1:770930842223:web:555a834a781469055d8b9a",
  measurementId: "G-ECMY15GHY6"
};

export default function DoctorPanel() {
  const [app, setApp] = useState<any>(null)
  const [auth, setAuth] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [token, setToken] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [patients, setPatients] = useState([])
  const [alert, setAlert] = useState({ message: "", type: "" })
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  // İlk olarak, useState içine activePage ekleyelim
  const [activePage, setActivePage] = useState("users")

  // Initialize Firebase
  useEffect(() => {
    const firebaseApp = initializeApp(firebaseConfig)
    const firebaseAuth = getAuth(firebaseApp)
    setApp(firebaseApp)
    setAuth(firebaseAuth)
  }, [])

  // Handle Google Sign In
  const signInWithGoogle = async () => {
    if (!auth) return

    setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const idToken = await user.getIdToken(true)
      setUser(user)
      setToken(idToken)

      // Check doctor access
      const response = await fetch("https://pikamed-api.keremkk.com.tr/api/pikamed/doctor-access", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })

      const data = await response.json()

      if (data.access) {
        // Fetch patients
        getPatients(idToken)
      } else {
        setAlert({
          message: "Yetkiniz yok! Bu panele yalnızca doktorlar erişebilir.",
          type: "error",
        })
        await signOut(auth)
        setUser(null)
        setToken(null)
      }
    } catch (error: any) {
      setAlert({
        message: `Giriş hatası: ${error.message}`,
        type: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  // Handle Sign Out
  const handleSignOut = async () => {
    if (!auth) return

    try {
      await signOut(auth)
      setUser(null)
      setToken(null)
      setPatients([])
    } catch (error: any) {
      setAlert({
        message: `Çıkış hatası: ${error.message}`,
        type: "error",
      })
    }
  }

  // Fetch Patients
  const getPatients = async (currentToken: string) => {
    try {
        const response = await fetch("https://pikamed-api.keremkk.com.tr/api/pikamed/get-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
      })

      const result = await response.json()

      if (result.success) {
        setPatients(result.patients)
      } else {
        setAlert({
          message: result.message,
          type: "error",
        })
      }
    } catch (error: any) {
      setAlert({
        message: "Hastaları getirirken bir hata oluştu.",
        type: "error",
      })
    }
  }

  // View Patient Details
  const viewPatientDetails = async (uid: string) => {
    if (!token || !user) return

    try {
      // Send warning notification
      await fetch("https://pikamed-api.keremkk.com.tr/api/pikamed/send-warning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          patientUid: uid,
          doktorUid: user.uid,
        }),
      })

      // Get patient data
      const response = await fetch(`https://pikamed-api.keremkk.com.tr/api/pikamed/userdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uid }),
      })

      if (!response.ok) {
        throw new Error(`API yanıtı başarısız: ${response.statusText}`)
      }

      const data = await response.json()

      if (data && data.name) {
        setSelectedPatient(data)
      } else {
        setAlert({
          message: "Hasta verisi alınamadı veya eksik.",
          type: "error",
        })
      }
    } catch (error: any) {
      setAlert({
        message: `Veri alınırken hata oluştu: ${error.message}`,
        type: "error",
      })
    }
  }

  // Sayfa navigasyonu için handleNavigation fonksiyonunu ekleyelim
  // handleNavigation fonksiyonunu ekleyin:

  const handleNavigation = (page: string) => {
    setActivePage(page)
  }

  // If not logged in, show login screen
  if (!user) {
    return <LoginScreen onLogin={signInWithGoogle} />
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Return kısmında Sidebar bileşenini güncelleyelim
      // Sidebar bileşenini aşağıdaki şekilde değiştirin: */}
      <Sidebar
        isOpen={sidebarOpen}
        toggle={() => setSidebarOpen(!sidebarOpen)}
        role="doctor"
        onSignOut={handleSignOut}
        onNavigate={handleNavigation}
      />

      <div className="flex-1 lg:ml-64">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} userInfo={user} />

        {/* main içeriğini güncelleyelim
        // main içeriğini aşağıdaki şekilde değiştirin: */}
        <main className="p-4 lg:p-6">
          {alert.message && (
            <div
              className={`mb-6 flex items-center rounded-lg p-4 ${
                alert.type === "success"
                  ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                  : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
              }`}
            >
              <AlertCircle className="mr-3 h-5 w-5" />
              <p>{alert.message}</p>
              <button
                onClick={() => setAlert({ message: "", type: "" })}
                className="ml-auto rounded-full p-1 hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="mb-8">
            <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Doktor Panel</h1>
            <p className="text-gray-600 dark:text-gray-400">Hastalarınızı görüntüleyin ve takip edin.</p>
          </div>

          {activePage === "users" && (
            <>
              {/* Hasta İstatistikleri */}
              <div className="mb-8 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Hasta İstatistikleri</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-lg bg-teal-50 p-4">
                    <p className="text-sm font-medium text-teal-600">Toplam Hasta</p>
                    <p className="text-2xl font-bold text-teal-700">{patients.length}</p>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-4">
                    <p className="text-sm font-medium text-blue-600">Aktif Takip</p>
                    <p className="text-2xl font-bold text-blue-700">0</p>
                  </div>
                  <div className="rounded-lg bg-amber-50 p-4">
                    <p className="text-sm font-medium text-amber-600">Bekleyen İşlemler</p>
                    <p className="text-2xl font-bold text-amber-700">0</p>
                  </div>
                </div>
              </div>

              {/* Hasta Listesi */}
              <div>
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Kayıtlı Hastalar</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {patients.length > 0 ? (
                    patients.map((patient: any, index: number) => (
                      <PatientCard key={index} patient={patient} onViewDetails={viewPatientDetails} />
                    ))
                  ) : (
                    <p className="col-span-full text-gray-500 dark:text-gray-400">Henüz hasta bulunmuyor.</p>
                  )}
                </div>
              </div>
            </>
          )}

          {activePage === "profile" && (
            <div className="rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Profil Bilgileri</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="h-32 w-32 overflow-hidden rounded-full bg-gray-200">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL || "/placeholder.svg"}
                        alt={user.providerData[0]?.displayName || "Doktor"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-blue-100 text-blue-600">
                        {user.providerData[0]?.displayName?.charAt(0) || "D"}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-grow space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ad Soyad</h3>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {user.providerData[0]?.displayName || "İsimsiz Kullanıcı"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">E-posta</h3>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">{user?.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rol</h3>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">Doktor</p>
                  </div>
                </div>
              </div>
            </div>
          )}

            {activePage === "notifications" && (
              <div className="rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Bildirimler</h2>
                <p className="text-gray-600 dark:text-gray-400">Bildirimler özelliği yakında eklenecektir.</p>
              </div>
            )}

          {activePage === "calendar" && (
            <div className="rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Takvim</h2>
              <p className="text-gray-600 dark:text-gray-400">Takvim özelliği yakında eklenecektir.</p>
            </div>
          )}

          {activePage === "settings" && (
            <div className="rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Ayarlar</h2>
              <p className="text-gray-600 dark:text-gray-400">Ayarlar özelliği yakında eklenecektir.</p>
            </div>
          )}
        </main>
      </div>

      {selectedPatient && <PatientDetailModal patient={selectedPatient} onClose={() => setSelectedPatient(null)} />}
    </div>
  )
}
