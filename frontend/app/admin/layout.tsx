'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthProvider'
import { useEffect } from 'react'
import {
  LayoutDashboard, Users, Car, CalendarCheck, CreditCard,
  Settings, LogOut, ChevronRight, Building2, ShieldCheck, User
} from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/vendors', label: 'Car Owners', icon: Building2 },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/vehicles', label: 'Vehicles', icon: Car },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/admin/payments', label: 'Payments', icon: CreditCard },
  { href: '/admin/profile', label: 'Profile', icon: User },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isLoading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'Admin')) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading || !user) return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div className="spinner-border text-primary" role="status" />
    </div>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f5' }}>
      {/* Sidebar */}
      <aside style={{
        width: 260, background: '#0f172a', color: '#e2e8f0',
        display: 'flex', flexDirection: 'column', position: 'fixed',
        top: 0, left: 0, height: '100vh', zIndex: 100, overflowY: 'auto'
      }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShieldCheck size={28} color="#f59e0b" />
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#f1f5f9' }}>BookMyFleet</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>Admin Portal</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link key={href} href={href} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 8, marginBottom: 4,
                background: active ? '#1e40af' : 'transparent',
                color: active ? '#fff' : '#94a3b8',
                textDecoration: 'none', fontSize: 14, fontWeight: active ? 600 : 400,
                transition: 'all 0.15s'
              }}>
                <Icon size={18} />
                {label}
                {active && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
              </Link>
            )
          })}
        </nav>

        {/* User info + logout */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid #1e293b' }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>{user.email}</div>
          <div style={{ fontSize: 11, color: '#475569', marginBottom: 12 }}>Super Admin</div>
          <button onClick={logout} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'transparent', border: '1px solid #334155',
            color: '#94a3b8', padding: '8px 12px', borderRadius: 6,
            cursor: 'pointer', fontSize: 13, width: '100%'
          }}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: 260, flex: 1, padding: '32px 28px', minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  )
}
