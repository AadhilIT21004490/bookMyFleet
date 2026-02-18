'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthProvider'
import { UserCheck, UserX, Search } from 'lucide-react'

export default function AdminUsersPage() {
  const { user } = useAuth()
  const [users, setUsers] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users?page=${page}&limit=15`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setUsers(data.users)
        setTotal(data.total)
      }
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { if (user?.token) fetchUsers() }, [user, page])

  const toggleActive = async (id: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}/toggle-active`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${user?.token}` }
      })
      fetchUsers()
    } catch (e) { console.error(e) }
  }

  const filtered = users.filter(u =>
    `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>Users</h2>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 14 }}>Manage platform users</p>
      </div>

      <div style={{ position: 'relative', marginBottom: 20, maxWidth: 360 }}>
        <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        <input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '9px 12px 9px 36px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, outline: 'none' }} />
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {['Name', 'Email', 'Phone', 'Status', 'Joined', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40 }}><div className="spinner-border spinner-border-sm text-primary" /></td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>No users found</td></tr>
            ) : filtered.map((u: any) => (
              <tr key={u._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 500, color: '#1e293b' }}>{u.firstName} {u.lastName}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: '#475569' }}>{u.email}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: '#475569' }}>{u.phone || '—'}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    fontSize: 11, padding: '3px 8px', borderRadius: 20, fontWeight: 600,
                    background: u.isActive ? '#dcfce7' : '#fee2e2',
                    color: u.isActive ? '#16a34a' : '#dc2626'
                  }}>{u.isActive ? 'Active' : 'Inactive'}</span>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: '#94a3b8' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => toggleActive(u._id)} title={u.isActive ? 'Deactivate' : 'Activate'}
                    style={{ background: u.isActive ? '#fee2e2' : '#dcfce7', border: 'none', borderRadius: 6, padding: '5px 8px', cursor: 'pointer', color: u.isActive ? '#dc2626' : '#16a34a' }}>
                    {u.isActive ? <UserX size={15} /> : <UserCheck size={15} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
        <span style={{ fontSize: 13, color: '#64748b' }}>Total: {total} users</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: 13 }}>Prev</button>
          <span style={{ padding: '6px 14px', fontSize: 13, color: '#64748b' }}>Page {page}</span>
          <button onClick={() => setPage(p => p + 1)} disabled={users.length < 15}
            style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: 13 }}>Next</button>
        </div>
      </div>
    </div>
  )
}
