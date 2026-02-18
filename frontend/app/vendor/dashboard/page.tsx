'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthProvider'
import { Car, CalendarCheck, CheckCircle, Clock } from 'lucide-react'
import Link from 'next/link'

function StatCard({ label, value, icon: Icon, color }: any) {
  return (
    <div style={{
      background: '#fff', borderRadius: 12, padding: '20px 24px',
      display: 'flex', alignItems: 'center', gap: 16,
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0'
    }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={22} color={color} />
      </div>
      <div>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#0f172a' }}>{value ?? '—'}</div>
        <div style={{ fontSize: 13, color: '#64748b' }}>{label}</div>
      </div>
    </div>
  )
}

export default function VendorDashboard() {
  const { user } = useAuth()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vendor-dashboard/dashboard`, {
          headers: { Authorization: `Bearer ${user?.token}` }
        })
        if (res.ok) setData(await res.json())
      } catch (e) { console.error(e) }
      finally { setLoading(false) }
    }
    if (user?.token) fetch_()
  }, [user])

  const s = data?.stats

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>Dashboard</h2>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 14 }}>Welcome back, {user?.name}</p>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5"><div className="spinner-border text-success" /></div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
            <StatCard label="Total Vehicles" value={s?.totalVehicles} icon={Car} color="#10b981" />
            <StatCard label="Active Listings" value={s?.activeVehicles} icon={CheckCircle} color="#3b82f6" />
            <StatCard label="Pending Bookings" value={s?.pendingBookings} icon={Clock} color="#f59e0b" />
            <StatCard label="Approved Bookings" value={s?.approvedBookings} icon={CalendarCheck} color="#8b5cf6" />
          </div>

          {/* Recent Bookings */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h6 style={{ margin: 0, fontWeight: 600, color: '#0f172a' }}>Recent Bookings</h6>
              <Link href="/vendor/bookings" style={{ fontSize: 13, color: '#10b981' }}>View all</Link>
            </div>
            {(!data?.recentBookings || data.recentBookings.length === 0) && (
              <p style={{ color: '#94a3b8', fontSize: 14 }}>No bookings yet.</p>
            )}
            {data?.recentBookings?.map((b: any) => (
              <div key={b._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 14, color: '#1e293b' }}>{b.user?.firstName} {b.user?.lastName}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>{b.vehicle?.brand} {b.vehicle?.model} · {new Date(b.pickupDate).toLocaleDateString()}</div>
                </div>
                <span style={{
                  fontSize: 11, padding: '3px 8px', borderRadius: 20, fontWeight: 600,
                  background: b.status === 'Approved' ? '#dcfce7' : b.status === 'Pending' ? '#fef9c3' : '#fee2e2',
                  color: b.status === 'Approved' ? '#16a34a' : b.status === 'Pending' ? '#ca8a04' : '#dc2626'
                }}>{b.status}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
