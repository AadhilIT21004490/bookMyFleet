'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthProvider'
import { CheckCircle, XCircle } from 'lucide-react'

const statusColors: Record<string, { bg: string; color: string }> = {
  Pending: { bg: '#fef9c3', color: '#ca8a04' },
  Approved: { bg: '#dcfce7', color: '#16a34a' },
  Rejected: { bg: '#fee2e2', color: '#dc2626' },
  Completed: { bg: '#dbeafe', color: '#1d4ed8' },
  Cancelled: { bg: '#f1f5f9', color: '#64748b' },
}

export default function VendorBookingsPage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const params = filter !== 'all' ? `?status=${filter}` : ''
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vendor-dashboard/bookings${params}`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      })
      if (res.ok) setBookings(await res.json())
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { if (user?.token) fetchBookings() }, [user, filter])

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vendor-dashboard/bookings/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user?.token}` },
        body: JSON.stringify({ status })
      })
      fetchBookings()
    } catch (e) { console.error(e) }
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>Bookings</h2>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 14 }}>Manage booking requests from customers</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {['all', 'Pending', 'Approved', 'Rejected', 'Completed', 'Cancelled'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '7px 14px', borderRadius: 8, border: '1px solid #e2e8f0',
            background: filter === f ? '#065f46' : '#fff',
            color: filter === f ? '#fff' : '#64748b',
            cursor: 'pointer', fontSize: 13, fontWeight: 500
          }}>{f === 'all' ? 'All' : f}</button>
        ))}
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5"><div className="spinner-border text-success" /></div>
      ) : bookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>No bookings found.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {bookings.map((b: any) => {
            const sc = statusColors[b.status] || { bg: '#f1f5f9', color: '#64748b' }
            const days = Math.ceil((new Date(b.dropoffDate).getTime() - new Date(b.pickupDate).getTime()) / (1000 * 60 * 60 * 24))
            return (
              <div key={b._id} style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15, color: '#0f172a', marginBottom: 4 }}>
                      {b.user?.firstName} {b.user?.lastName}
                    </div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>{b.user?.email} · {b.user?.phone}</div>
                    <div style={{ fontSize: 13, color: '#475569', marginTop: 6 }}>
                      <strong>{b.vehicle?.brand} {b.vehicle?.model}</strong> ({b.vehicle?.year})
                    </div>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
                      {new Date(b.pickupDate).toLocaleDateString()} → {new Date(b.dropoffDate).toLocaleDateString()} ({days} days)
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>LKR {b.totalPrice?.toLocaleString()}</div>
                    <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, fontWeight: 600, background: sc.bg, color: sc.color }}>{b.status}</span>
                  </div>
                </div>
                {b.status === 'Pending' && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button onClick={() => updateStatus(b._id, 'Approved')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#dcfce7', border: 'none', borderRadius: 6, padding: '7px 14px', cursor: 'pointer', color: '#16a34a', fontWeight: 600, fontSize: 13 }}>
                      <CheckCircle size={15} /> Approve
                    </button>
                    <button onClick={() => updateStatus(b._id, 'Rejected')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fee2e2', border: 'none', borderRadius: 6, padding: '7px 14px', cursor: 'pointer', color: '#dc2626', fontWeight: 600, fontSize: 13 }}>
                      <XCircle size={15} /> Reject
                    </button>
                  </div>
                )}
                {b.status === 'Approved' && (
                  <button onClick={() => updateStatus(b._id, 'Completed')} style={{ marginTop: 12, background: '#dbeafe', border: 'none', borderRadius: 6, padding: '7px 14px', cursor: 'pointer', color: '#1d4ed8', fontWeight: 600, fontSize: 13 }}>
                    Mark Completed
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
