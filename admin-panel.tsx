"use client"

import { useState, useEffect } from "react"
import { initializeApp } from "firebase/app"
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
import {
  Sidebar,
  Header,
  PatientCard,
  DoctorCard,
  AdminCard,
  LoginScreen,
  PatientDetailModal,
} from "./components/ui-components"
import { PlusCircle, Trash2, AlertCircle, X } from "lucide-react"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJGx1bGVaI43YmpoZUPP70DAvFVRMJVWM",
  authDomain: "marul-tarlasii.firebaseapp.com",
  projectId: "marul-tarlasii",
  storageBucket: "marul-tarlasii.firebasestorage.app",
  messagingSenderId: "770930842223",
  appId: "1:770930842223:web:555a834a781469055d8b9a",
  measurementId: "G-ECMY15GHY6",
}

export default function AdminPanel() {
  const [app, setApp] = useState<any>(null)
  const [auth, setAuth] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [token, setToken] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [doctors, setDoctors] = useState([])
  const [patients, setPatients] = useState([])
  const [admins, setAdmins] = useState([])
  const [doctorEmail, setDoctorEmail] = useState("")
  const [alert, setAlert] = useState({ message: "", type: "" })
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // Admin paneline bildirim gönderme özelliği ekleyelim ve sekme işlevselliğini ekleyelim
  // Ayrıca yetki kontrolünü güncelleyelim

  // İlk olarak, useState içine activePage ekleyelim
  const [activePage, setActivePage] = useState("users")
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationTarget, setNotificationTarget] = useState("all")
  const [selectedPatientId, setSelectedPatientId] = useState("")

  // Initialize Firebase
  useEffect(() => {
    const firebaseApp = initializeApp(firebaseConfig)
    const firebaseAuth = getAuth(firebaseApp)
    setApp(firebaseApp)
    setAuth(firebaseAuth)
  }, [])

  // signInWithGoogle fonksiyonunda yetki kontrolünü güncelleyelim
  // signInWithGoogle fonksiyonunu aşağıdaki şekilde değiştirin:

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

      // Check admin access
      const response = await fetch("https://keremkk.glitch.me/pikamed/admin-access", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })

      const data = await response.json()

      if (data.access) {
        // Fetch data
        getDoctors(idToken)
        getPatients(idToken)
        getAdmins(idToken)
      } else {
        setAlert({
          message: "Yetkiniz yok! Bu panele yalnızca adminler erişebilir.",
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
      setDoctors([])
      setPatients([])
      setAdmins([])
    } catch (error: any) {
      setAlert({
        message: `Çıkış hatası: ${error.message}`,
        type: "error",
      })
    }
  }

  // Fetch Doctors
  const getDoctors = async (currentToken: string) => {
    try {
      const response = await fetch("/pikamed/get-doctors", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
      })

      const result = await response.json()

      if (result.success) {
        setDoctors(result.doctors)
      } else {
        setAlert({
          message: result.message,
          type: "error",
        })
      }
    } catch (error: any) {
      setAlert({
        message: "Doktorları getirirken bir hata oluştu.",
        type: "error",
      })
    }
  }

  // Fetch Patients
  const getPatients = async (currentToken: string) => {
    try {
      const response = await fetch("/pikamed/get-users", {
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

  // Fetch Admins
  const getAdmins = async (currentToken: string) => {
    try {
      const response = await fetch("/pikamed/get-admins", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
      })

      const result = await response.json()

      if (result.success) {
        setAdmins(result.admins)
      } else {
        setAlert({
          message: result.message,
          type: "error",
        })
      }
    } catch (error: any) {
      setAlert({
        message: "Adminleri getirirken bir hata oluştu.",
        type: "error",
      })
    }
  }

  // Assign Doctor Role
  const assignDoctorRole = async () => {
    if (!token || !doctorEmail) return

    try {
      const response = await fetch("https://keremkk.glitch.me/pikamed/add-doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ doctorEmail, uid: user.uid }),
      })

      const result = await response.json()

      if (result.success) {
        setAlert({
          message: "Doktor rolü başarıyla atandı!",
          type: "success",
        })
        getDoctors(token)
        setDoctorEmail("")
      } else {
        setAlert({
          message: result.message,
          type: "error",
        })
      }
    } catch (error: any) {
      setAlert({
        message: "Bir hata oluştu. Lütfen tekrar deneyin.",
        type: "error",
      })
    }
  }

  // Delete Doctor Role
  const deleteDoctorRole = async () => {
    if (!token || !doctorEmail) return

    try {
      const response = await fetch("https://keremkk.glitch.me/pikamed/delete-doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ doctorEmail, uid: user.uid }),
      })

      const result = await response.json()

      if (result.success) {
        setAlert({
          message: "Doktor rolü başarıyla silindi!",
          type: "success",
        })
        getDoctors(token)
        setDoctorEmail("")
      } else {
        setAlert({
          message: result.message,
          type: "error",
        })
      }
    } catch (error: any) {
      setAlert({
        message: "Bir hata oluştu. Lütfen tekrar deneyin.",
        type: "error",
      })
    }
  }

  // View Patient Details
  const viewPatientDetails = async (uid: string) => {
    if (!token) return

    try {
      const response = await fetch(`https://keremkk.glitch.me/pikamed/userdata`, {
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

  // Bildirim gönderme fonksiyonunu ekleyelim
  // sendNotification fonksiyonunu ekleyin:

  const sendNotification = async () => {
    if (!token || !notificationMessage) {
      setAlert({
        message: "Bildirim mesajı boş olamaz!",
        type: "error",
      })
      return
    }

    try {
      const response = await fetch("https://keremkk.glitch.me/pikamed/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: notificationMessage,
          target: notificationTarget,
          targetId: notificationTarget === "specific" ? selectedPatientId : undefined,
          senderUid: user.uid,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setAlert({
          message: "Bildirim başarıyla gönderildi!",
          type: "success",
        })
        setNotificationMessage("")
      } else {
        setAlert({
          message: result.message || "Bildirim gönderilirken bir hata oluştu.",
          type: "error",
        })
      }
    } catch (error: any) {
      setAlert({
        message: `Bildirim gönderilirken hata oluştu: ${error.message}`,
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
        role="admin"
        onSignOut={handleSignOut}
        onNavigate={handleNavigation}
      />

      <div className="flex-1 lg:ml-64">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} userInfo={user} />

        {/* main içeriğini güncelleyelim, bildirim gönderme formunu ekleyelim
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
            <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
            <p className="text-gray-600 dark:text-gray-400">PikaMed sistemini yönetin ve kullanıcıları görüntüleyin.</p>
          </div>

          {activePage === "users" && (
            <>
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Doktor Yönetimi */}
                <div className="col-span-1 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Doktor Yönetimi</h2>
                  <div className="mb-4">
                    <label
                      htmlFor="doctorEmail"
                      className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Doktor E-postası
                    </label>
                    <input
                      type="email"
                      id="doctorEmail"
                      value={doctorEmail}
                      onChange={(e) => setDoctorEmail(e.target.value)}
                      placeholder="ornek@email.com"
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 text-sm dark:text-gray-300 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={assignDoctorRole}
                      className="flex items-center rounded-md bg-teal-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Doktor Ekle
                    </button>
                    <button
                      onClick={deleteDoctorRole}
                      className="flex items-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Doktor Sil
                    </button>
                  </div>
                </div>

                {/* Sistem İstatistikleri */}
                <div className="col-span-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Sistem İstatistikleri</h2>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-lg bg-blue-50 p-4">
                      <p className="text-sm font-medium text-blue-600">Toplam Doktor</p>
                      <p className="text-2xl font-bold text-blue-700">{doctors.length}</p>
                    </div>
                    <div className="rounded-lg bg-green-50 p-4">
                      <p className="text-sm font-medium text-green-600">Toplam Hasta</p>
                      <p className="text-2xl font-bold text-green-700">{patients.length}</p>
                    </div>
                    <div className="rounded-lg bg-purple-50 p-4">
                      <p className="text-sm font-medium text-purple-600">Toplam Admin</p>
                      <p className="text-2xl font-bold text-purple-700">{admins.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Doktor Listesi */}
              <div className="mt-8">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Doktorlar</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {doctors.length > 0 ? (
                    doctors.map((doctor: any, index: number) => <DoctorCard key={index} doctor={doctor} />)
                  ) : (
                    <p className="col-span-full text-gray-500 dark:text-gray-400">Henüz doktor bulunmuyor.</p>
                  )}
                </div>
              </div>

              {/* Admin Listesi */}
              <div className="mt-8">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Sistem Adminleri</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {admins.length > 0 ? (
                    admins.map((admin: any, index: number) => <AdminCard key={index} admin={admin} />)
                  ) : (
                    <p className="col-span-full text-gray-500 dark:text-gray-400">Henüz admin bulunmuyor.</p>
                  )}
                </div>
              </div>

              {/* Hasta Listesi */}
              <div className="mt-8">
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
                        alt={user.displayName || "Admin"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-teal-100 text-teal-600">
                        {user?.displayName?.charAt(0) || "A"}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-grow space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ad Soyad</h3>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {user?.displayName || "İsimsiz Kullanıcı"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">E-posta</h3>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">{user?.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rol</h3>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">Admin</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePage === "settings" && (
            <div className="rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Bildirim Gönder</h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="notificationTarget"
                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Hedef
                  </label>
                  <select
                    id="notificationTarget"
                    value={notificationTarget}
                    onChange={(e) => setNotificationTarget(e.target.value)}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 text-sm dark:text-gray-300 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="all">Tüm Kullanıcılar</option>
                    <option value="doctors">Tüm Doktorlar</option>
                    <option value="patients">Tüm Hastalar</option>
                    <option value="specific">Belirli Bir Hasta</option>
                  </select>
                </div>

                {notificationTarget === "specific" && (
                  <div>
                    <label
                      htmlFor="selectedPatient"
                      className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Hasta Seçin
                    </label>
                    <select
                      id="selectedPatient"
                      value={selectedPatientId}
                      onChange={(e) => setSelectedPatientId(e.target.value)}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 text-sm dark:text-gray-300 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                      <option value="">Hasta Seçin</option>
                      {patients.map((patient: any) => (
                        <option key={patient.uid} value={patient.uid}>
                          {patient.displayName || patient.email}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="notificationMessage"
                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Bildirim Mesajı
                  </label>
                  <textarea
                    id="notificationMessage"
                    value={notificationMessage}
                    onChange={(e) => setNotificationMessage(e.target.value)}
                    rows={4}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 text-sm dark:text-gray-300 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    placeholder="Bildirim mesajınızı buraya yazın..."
                  ></textarea>
                </div>

                <button
                  onClick={sendNotification}
                  className="flex items-center rounded-md bg-teal-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Bildirimi Gönder
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {selectedPatient && <PatientDetailModal patient={selectedPatient} onClose={() => setSelectedPatient(null)} />}
    </div>
  )
}
