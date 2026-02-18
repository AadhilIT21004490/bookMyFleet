'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthProvider'
import { CheckCircle, XCircle, Search } from 'lucide-react'

export default function AdminVehiclesPage() {
  const { user } = useAuth()
  const [vehicles, setVehicles] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const fetchVehicles = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: '15' })
      if (filter !== 'all') params.set('status', filter)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/vehicles?${params}`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setVehicles(data.vehicles)
        setTotal(data.total)
      }
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { if (user?.token) fetchVehicles() }, [user, filter, page])

  const handleAction = async (id: string, action: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/vehicles/${id}/${action}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${user?.token}` }
      })
      fetchVehicles()
    } catch (e) { console.error(e) }
  }

  const filtered = vehicles.filter(v =>
    `${v.brand} ${v.model} ${v.vendor?.businessName}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>Vehicles</h2>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 14 }}>Approve or reject vehicle listings</p>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input placeholder="Search vehicles..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '9px 12px 9px 36px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, outline: 'none' }} />
        </div>
        {['all', 'pending', 'approved'].map(f => (
          <button key={f} onClick={() => { setFilter(f); setPage(1) }} style={{
            padding: '8px 16px', borderRadius: 8, border: '1px solid #e2e8f0',
            background: filter === f ? '#1e40af' : '#fff',
            color: filter === f ? '#fff' : '#64748b',
            cursor: 'pointer', fontSize: 13, fontWeight: 500, textTransform: 'capitalize'
          }}>{f}</button>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {['Vehicle', 'Category', 'Owner', 'Year', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40 }}><div className="spinner-border spinner-border-sm text-primary" /></td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>No vehicles found</td></tr>
            ) : filtered.map((v: any) => (
              <tr key={v._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 500, color: '#1e293b' }}>{v.brand} {v.model}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: '#475569' }}>{v.category}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: '#475569' }}>{v.vendor?.businessName || v.vendor?.fullName}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: '#475569' }}>{v.year}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    fontSize: 11, padding: '3px 8px', borderRadius: 20, fontWeight: 600,
                    background: v.isApproved ? '#dcfce7' : '#fef9c3',
                    color: v.isApproved ? '#16a34a' : '#ca8a04'
                  }}>{v.isApproved ? 'Approved' : 'Pending'}</span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {!v.isApproved && (
                      <button onClick={() => handleAction(v._id, 'approve')} title="Approve"
                        style={{ background: '#dcfce7', border: 'none', borderRadius: 6, padding: '5px 8px', cursor: 'pointer', color: '#16a34a' }}>
                        <CheckCircle size={15} />
                      </button>
                    )}
                    {v.isApproved && (
                      <button onClick={() => handleAction(v._id, 'reject')} title="Reject"
                        style={{ background: '#fee2e2', border: 'none', borderRadius: 6, padding: '5px 8px', cursor: 'pointer', color: '#dc2626' }}>
                        <XCircle size={15} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
        <span style={{ fontSize: 13, color: '#64748b' }}>Total: {total} vehicles</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: 13 }}>Prev</button>
          <span style={{ padding: '6px 14px', fontSize: 13, color: '#64748b' }}>Page {page}</span>
          <button onClick={() => setPage(p => p + 1)} disabled={vehicles.length < 15}
            style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: 13 }}>Next</button>
        </div>
      </div>
    </div>
  )
}
