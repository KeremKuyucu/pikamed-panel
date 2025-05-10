"use client"
import {
  Search,
  Bell,
  Menu,
  X,
  User,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  Activity,
  Clipboard,
  Calendar,
} from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function Sidebar({
  isOpen,
  toggle,
  role = "admin",
  onSignOut,
  onNavigate,
}: {
  isOpen: boolean
  toggle: () => void
  role?: string
  onSignOut: () => void
  onNavigate: (page: string) => void
}) {
  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity lg:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggle}
      ></div>
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-16 items-center justify-between border-b dark:border-gray-800 px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-500 text-white">
              <Activity className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold text-teal-700 dark:text-teal-400">PikaMed</span>
          </div>
          <button onClick={toggle} className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden">
            <X className="h-5 w-5 dark:text-gray-300" />
          </button>
        </div>
        <nav className="p-4">
          <div className="mb-4">
            <p className="mb-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Ana Menü</p>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => onNavigate("profile")}
                  className="flex w-full items-center rounded-md px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-700 dark:hover:text-teal-300"
                >
                  <User className="mr-3 h-5 w-5" />
                  <span>Profil</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("users")}
                  className="flex w-full items-center rounded-md px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-700 dark:hover:text-teal-300"
                >
                  <Users className="mr-3 h-5 w-5" />
                  <span>Kullanıcılar</span>
                </button>
              </li>
              {role === "admin" && (
                <li>
                  <button
                    onClick={() => onNavigate("doctors")}
                    className="flex w-full items-center rounded-md px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-700 dark:hover:text-teal-300"
                  >
                    <Clipboard className="mr-3 h-5 w-5" />
                    <span>Doktor Yönetimi</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => onNavigate("notifications")}
                  className="flex w-full items-center rounded-md px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-700 dark:hover:text-teal-300"
                >
                  <Bell className="mr-3 h-5 w-5" />
                  <span>Bildirimler</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("calendar")}
                  className="flex w-full items-center rounded-md px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-700 dark:hover:text-teal-300"
                >
                  <Calendar className="mr-3 h-5 w-5" />
                  <span>Takvim</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("settings")}
                  className="flex w-full items-center rounded-md px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-700 dark:hover:text-teal-300"
                >
                  <Settings className="mr-3 h-5 w-5" />
                  <span>Ayarlar</span>
                </button>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <button
              onClick={onSignOut}
              className="flex w-full items-center rounded-md px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300"
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  )
}

export function Header({ toggleSidebar, userInfo }: { toggleSidebar: () => void; userInfo: any }) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b dark:border-gray-800 bg-white dark:bg-gray-900 px-4 lg:px-6">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="mr-4 rounded-full p-2 hover:bg-gray-100 lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Ara..."
            className="h-10 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-10 pr-4 text-sm dark:text-gray-300 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button className="relative rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell className="h-5 w-5 dark:text-gray-300" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
            {userInfo?.photoURL ? (
              <img
                src={userInfo.photoURL || "/placeholder.svg"}
                alt={userInfo.displayName || "Kullanıcı"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-teal-500 text-white">
                {userInfo?.displayName?.charAt(0) || "K"}
              </div>
            )}
          </div>
          <span className="hidden text-sm font-medium md:block">{userInfo?.displayName || "Kullanıcı"}</span>
        </div>
      </div>
    </header>
  )
}

export function PatientCard({ patient, onViewDetails }: { patient: any; onViewDetails: (uid: string) => void }) {
  return (
    <div className="overflow-hidden rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all hover:shadow-md">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
              {patient.photoURL ? (
                <img
                  src={patient.photoURL || "/placeholder.svg"}
                  alt={patient.displayName || "Hasta"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-teal-100 text-teal-600">
                  {patient.displayName?.charAt(0) || "H"}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">{patient.displayName || "İsimsiz Hasta"}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{patient.email}</p>
            </div>
          </div>
          <button
            onClick={() => onViewDetails(patient.uid)}
            className="flex items-center rounded-md bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-600 transition-colors hover:bg-teal-100"
          >
            Detaylar
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function DoctorCard({ doctor }: { doctor: any }) {
  return (
    <div className="overflow-hidden rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all hover:shadow-md">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
            {doctor.photoURL ? (
              <img
                src={doctor.photoURL || "/placeholder.svg"}
                alt={doctor.fullName || "Doktor"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-blue-100 text-blue-600">
                {doctor.fullName?.charAt(0) || "D"}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">{doctor.fullName || "İsimsiz Doktor"}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{doctor.email}</p>
            {doctor.specialty && <p className="mt-1 text-xs font-medium text-blue-600">{doctor.specialty}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export function AdminCard({ admin }: { admin: any }) {
  return (
    <div className="overflow-hidden rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all hover:shadow-md">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
            {admin.photoURL ? (
              <img
                src={admin.photoURL || "/placeholder.svg"}
                alt={admin.fullName || "Admin"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-purple-100 text-purple-600">
                {admin.fullName?.charAt(0) || "A"}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">{admin.fullName || "İsimsiz Admin"}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{admin.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-500">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">PikaMed</h2>
          <p className="mt-2 text-sm text-gray-600">Sağlık yönetim sistemine hoş geldiniz</p>
        </div>
        <div className="mt-8 rounded-lg bg-white p-6 shadow sm:p-8">
          <button
            onClick={onLogin}
            className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            <span className="text-sm font-medium">Google ile Giriş Yap</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export function PatientDetailModal({ patient, onClose }: { patient: any; onClose: () => void }) {
  if (!patient) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-lg bg-white dark:bg-gray-900 shadow-xl">
        <div className="sticky top-0 flex items-center justify-between border-b dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
          <h2 className="text-lg font-semibold dark:text-white">Hasta Detayları</h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="mb-6 flex items-center gap-4">
            {patient.photoURL && (
              <img
                src={patient.photoURL || "/placeholder.svg"}
                alt={patient.name}
                className="h-16 w-16 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="text-xl font-semibold dark:text-white">{patient.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">{patient.email}</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4">
              <h4 className="mb-3 font-medium dark:text-white">Kişisel Bilgiler</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">UID:</span>
                  <span className="dark:text-gray-300">{patient.uid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Boy:</span>
                  <span className="dark:text-gray-300">{patient.size} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Kilo:</span>
                  <span className="dark:text-gray-300">{patient.weight} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">BMI:</span>
                  <span className="dark:text-gray-300">{patient.bmi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">BMI Kategorisi:</span>
                  <span className="dark:text-gray-300">{patient.bmiCategory}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4">
              <h4 className="mb-3 font-medium dark:text-white">Su Tüketimi</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Hedef Su Miktarı:</span>
                  <span className="dark:text-gray-300">{patient.targetWater} ml</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">İçilen Su:</span>
                  <span className="dark:text-gray-300">{patient.availableWater} ml</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Bardak Boyutu:</span>
                  <span className="dark:text-gray-300">{patient.cupSize} ml</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Son Değişim Saati:</span>
                  <span className="dark:text-gray-300">{patient.changeWaterClock}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Son Değişim Tarihi:</span>
                  <span className="dark:text-gray-300">{patient.changeWaterDay}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4">
            <h4 className="mb-3 font-medium dark:text-white">İnsülin Programı</h4>
            <div className="space-y-4">
              {patient.InsulinListData?.map((insulin: any, index: number) => (
                <div key={index} className="rounded-md border dark:border-gray-700 bg-white dark:bg-gray-700 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <h5 className="font-medium dark:text-white">{insulin.titleTxt}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {insulin.hour}:{insulin.minute}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {insulin.insulinDoses?.map((dose: any, doseIndex: number) => (
                      <div key={doseIndex} className="flex justify-between text-sm">
                        <span>{dose.type}:</span>
                        <span>
                          {dose.dose} {dose.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
