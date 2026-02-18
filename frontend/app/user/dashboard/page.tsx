'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthProvider'
import { CalendarCheck, Clock, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

const statusColors: Record<string, { bg: string; color: string }> = {
  Pending: { bg: '#fef9c3', color: '#ca8a04' },
  Approved: { bg: '#dcfce7', color: '#16a34a' },
  Rejected: { bg: '#fee2e2', color: '#dc2626' },
  Completed: { bg: '#dbeafe', color: '#1d4ed8' },
  Cancelled: { bg: '#f1f5f9', color: '#64748b' },
}

export default function UserDashboard() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-dashboard/bookings`, {
          headers: { Authorization: `Bearer ${user?.token}` }
        })
        if (res.ok) setBookings(await res.json())
      } catch (e) { console.error(e) }
      finally { setLoading(false) }
    }
    if (user?.token) fetch_()
  }, [user])

  const pending = bookings.filter(b => b.status === 'Pending').length
  const approved = bookings.filter(b => b.status === 'Approved').length
  const completed = bookings.filter(b => b.status === 'Completed').length

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>My Dashboard</h2>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 14 }}>Welcome back, {user?.name}</p>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5"><div className="spinner-border text-primary" /></div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
            {[
              { label: 'Total Bookings', value: bookings.length, icon: CalendarCheck, color: '#7c3aed' },
              { label: 'Pending', value: pending, icon: Clock, color: '#f59e0b' },
              { label: 'Approved', value: approved, icon: CheckCircle, color: '#10b981' },
              { label: 'Completed', value: completed, icon: CheckCircle, color: '#3b82f6' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} style={{ background: '#fff', borderRadius: 12, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14, border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} color={color} />
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#0f172a' }}>{value}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent bookings */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h6 style={{ margin: 0, fontWeight: 600, color: '#0f172a' }}>Recent Bookings</h6>
              <Link href="/user/bookings" style={{ fontSize: 13, color: '#7c3aed' }}>View all</Link>
            </div>
            {bookings.length === 0 && <p style={{ color: '#94a3b8', fontSize: 14 }}>No bookings yet. <Link href="/">Browse cars</Link></p>}
            {bookings.slice(0, 5).map((b: any) => {
              const sc = statusColors[b.status] || { bg: '#f1f5f9', color: '#64748b' }
              return (
                <div key={b._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14, color: '#1e293b' }}>{b.vehicle?.brand} {b.vehicle?.model}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>{new Date(b.pickupDate).toLocaleDateString()} → {new Date(b.dropoffDate).toLocaleDateString()}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#0f172a' }}>LKR {b.totalPrice?.toLocaleString()}</div>
                    <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, fontWeight: 600, background: sc.bg, color: sc.color }}>{b.status}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
