'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthProvider'
import { Search } from 'lucide-react'

const statusColors: Record<string, { bg: string; color: string }> = {
  Pending: { bg: '#fef9c3', color: '#ca8a04' },
  Approved: { bg: '#dcfce7', color: '#16a34a' },
  Rejected: { bg: '#fee2e2', color: '#dc2626' },
  Completed: { bg: '#dbeafe', color: '#1d4ed8' },
  Cancelled: { bg: '#f1f5f9', color: '#64748b' },
}

export default function AdminBookingsPage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: '15' })
      if (filter !== 'all') params.set('status', filter)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/bookings?${params}`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setBookings(data.bookings)
        setTotal(data.total)
      }
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { if (user?.token) fetchBookings() }, [user, filter, page])

  const filtered = bookings.filter(b =>
    `${b.user?.firstName} ${b.user?.lastName} ${b.vehicle?.brand} ${b.vehicle?.model}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>Bookings</h2>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 14 }}>Monitor all platform bookings</p>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input placeholder="Search bookings..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '9px 12px 9px 36px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, outline: 'none' }} />
        </div>
        {['all', 'Pending', 'Approved', 'Rejected', 'Completed', 'Cancelled'].map(f => (
          <button key={f} onClick={() => { setFilter(f); setPage(1) }} style={{
            padding: '8px 16px', borderRadius: 8, border: '1px solid #e2e8f0',
            background: filter === f ? '#1e40af' : '#fff',
            color: filter === f ? '#fff' : '#64748b',
            cursor: 'pointer', fontSize: 13, fontWeight: 500
          }}>{f === 'all' ? 'All' : f}</button>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {['Customer', 'Vehicle', 'Owner', 'Pickup', 'Dropoff', 'Total', 'Status'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40 }}><div className="spinner-border spinner-border-sm text-primary" /></td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>No bookings found</td></tr>
            ) : filtered.map((b: any) => {
              const sc = statusColors[b.status] || { bg: '#f1f5f9', color: '#64748b' }
              return (
                <tr key={b._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 500, color: '#1e293b' }}>{b.user?.firstName} {b.user?.lastName}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#475569' }}>{b.vehicle?.brand} {b.vehicle?.model}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#475569' }}>{b.vendor?.businessName || b.vendor?.fullName}</td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#64748b' }}>{new Date(b.pickupDate).toLocaleDateString()}</td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#64748b' }}>{new Date(b.dropoffDate).toLocaleDateString()}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#0f172a' }}>LKR {b.totalPrice?.toLocaleString()}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, fontWeight: 600, background: sc.bg, color: sc.color }}>{b.status}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
        <span style={{ fontSize: 13, color: '#64748b' }}>Total: {total} bookings</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: 13 }}>Prev</button>
          <span style={{ padding: '6px 14px', fontSize: 13, color: '#64748b' }}>Page {page}</span>
          <button onClick={() => setPage(p => p + 1)} disabled={bookings.length < 15}
            style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: 13 }}>Next</button>
        </div>
      </div>
    </div>
  )
}
