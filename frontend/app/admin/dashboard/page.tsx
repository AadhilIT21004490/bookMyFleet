'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthProvider'
import { Users, Building2, Car, CalendarCheck, Clock, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

interface Stats {
  totalVendors: number
  totalUsers: number
  totalVehicles: number
  totalBookings: number
  pendingVendors: number
  pendingVehicles: number
  activeVehicles: number
}

interface DashboardData {
  stats: Stats
  recentVendors: any[]
  recentBookings: any[]
}

function StatCard({ label, value, icon: Icon, color, href }: any) {
  return (
    <Link href={href || '#'} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#fff', borderRadius: 12, padding: '20px 24px',
        display: 'flex', alignItems: 'center', gap: 16,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)', cursor: 'pointer',
        transition: 'box-shadow 0.2s', border: '1px solid #e2e8f0'
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 12,
          background: color + '20', display: 'flex',
          alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon size={24} color={color} />
        </div>
        <div>
          <div style={{ fontSize: 26, fontWeight: 700, color: '#0f172a' }}>{value ?? '—'}</div>
          <div style={{ fontSize: 13, color: '#64748b' }}>{label}</div>
        </div>
      </div>
    </Link>
  )
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${user?.token}` }
        })
        if (res.ok) setData(await res.json())
      } catch (e) { console.error(e) }
      finally { setLoading(false) }
    }
    if (user?.token) fetchStats()
  }, [user])

  const s = data?.stats

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>Dashboard</h2>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 14 }}>Welcome back, {user?.name}</p>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" />
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
            <StatCard label="Total Car Owners" value={s?.totalVendors} icon={Building2} color="#3b82f6" href="/admin/vendors" />
            <StatCard label="Total Users" value={s?.totalUsers} icon={Users} color="#8b5cf6" href="/admin/users" />
            <StatCard label="Total Vehicles" value={s?.totalVehicles} icon={Car} color="#10b981" href="/admin/vehicles" />
            <StatCard label="Total Bookings" value={s?.totalBookings} icon={CalendarCheck} color="#f59e0b" href="/admin/bookings" />
            <StatCard label="Pending Approvals" value={s?.pendingVendors} icon={Clock} color="#ef4444" href="/admin/vendors?status=pending" />
            <StatCard label="Pending Vehicles" value={s?.pendingVehicles} icon={Clock} color="#f97316" href="/admin/vehicles?status=pending" />
            <StatCard label="Active Listings" value={s?.activeVehicles} icon={CheckCircle} color="#06b6d4" href="/admin/vehicles?status=approved" />
          </div>

          {/* Recent Vendors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h6 style={{ margin: 0, fontWeight: 600, color: '#0f172a' }}>Recent Car Owners</h6>
                <Link href="/admin/vendors" style={{ fontSize: 13, color: '#3b82f6' }}>View all</Link>
              </div>
              {data?.recentVendors?.length === 0 && <p style={{ color: '#94a3b8', fontSize: 14 }}>No vendors yet.</p>}
              {data?.recentVendors?.map((v: any) => (
                <div key={v._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14, color: '#1e293b' }}>{v.fullName}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>{v.businessName}</div>
                  </div>
                  <span style={{
                    fontSize: 11, padding: '3px 8px', borderRadius: 20, fontWeight: 600,
                    background: v.isVerified ? '#dcfce7' : '#fef9c3',
                    color: v.isVerified ? '#16a34a' : '#ca8a04'
                  }}>
                    {v.isVerified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>

            {/* Recent Bookings */}
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h6 style={{ margin: 0, fontWeight: 600, color: '#0f172a' }}>Recent Bookings</h6>
                <Link href="/admin/bookings" style={{ fontSize: 13, color: '#3b82f6' }}>View all</Link>
              </div>
              {data?.recentBookings?.length === 0 && <p style={{ color: '#94a3b8', fontSize: 14 }}>No bookings yet.</p>}
              {data?.recentBookings?.map((b: any) => (
                <div key={b._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14, color: '#1e293b' }}>
                      {b.user?.firstName} {b.user?.lastName}
                    </div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>{b.vehicle?.brand} {b.vehicle?.model}</div>
                  </div>
                  <span style={{
                    fontSize: 11, padding: '3px 8px', borderRadius: 20, fontWeight: 600,
                    background: b.status === 'Approved' ? '#dcfce7' : b.status === 'Pending' ? '#fef9c3' : '#fee2e2',
                    color: b.status === 'Approved' ? '#16a34a' : b.status === 'Pending' ? '#ca8a04' : '#dc2626'
                  }}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
