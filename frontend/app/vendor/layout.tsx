'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthProvider'
import { useEffect } from 'react'
import {
  LayoutDashboard, Car, CalendarCheck, User, LogOut, ChevronRight, Building2
} from 'lucide-react'

const navItems = [
  { href: '/vendor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/vendor/vehicles', label: 'My Vehicles', icon: Car },
  { href: '/vendor/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/vendor/profile', label: 'Profile', icon: User },
]

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isLoading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'Vendor')) {
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
        width: 240, background: '#0f172a', color: '#e2e8f0',
        display: 'flex', flexDirection: 'column', position: 'fixed',
        top: 0, left: 0, height: '100vh', zIndex: 100, overflowY: 'auto'
      }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Building2 size={26} color="#10b981" />
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#f1f5f9' }}>BookMyFleet</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>Owner Portal</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link key={href} href={href} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 8, marginBottom: 4,
                background: active ? '#065f46' : 'transparent',
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

        <div style={{ padding: '16px 20px', borderTop: '1px solid #1e293b' }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>{user.name}</div>
          <div style={{ fontSize: 11, color: '#475569', marginBottom: 12 }}>Car Owner</div>
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

      <main style={{ marginLeft: 240, flex: 1, padding: '32px 28px', minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  )
}
