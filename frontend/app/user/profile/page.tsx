'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthProvider'
import { User, Mail, Phone, Save, CheckCircle } from 'lucide-react'

export default function UserProfilePage() {
  const { user } = useAuth()
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-dashboard/profile`, {
          headers: { Authorization: `Bearer ${user?.token}` }
        })
        if (res.ok) {
          const data = await res.json()
          setForm({ firstName: data.firstName || '', lastName: data.lastName || '', phone: data.phone || '' })
        }
      } catch (e) { console.error(e) }
      finally { setLoading(false) }
    }
    if (user?.token) fetch_()
  }, [user])

  const handleSave = async () => {
    setSaving(true); setError(''); setSaved(false)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-dashboard/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user?.token}` },
        body: JSON.stringify(form)
      })
      if (res.ok) setSaved(true)
      else { const d = await res.json(); setError(d.message || 'Failed to save') }
    } catch (e) { setError('Something went wrong') }
    finally { setSaving(false) }
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>My Profile</h2>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 14 }}>Manage your personal information</p>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5"><div className="spinner-border text-primary" /></div>
      ) : (
        <div style={{ maxWidth: 560 }}>
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: '28px 32px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, paddingBottom: 24, borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#7c3aed20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={28} color="#7c3aed" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#0f172a' }}>{user?.name}</div>
                <div style={{ fontSize: 13, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={13} />{user?.email}</div>
              </div>
            </div>

            {error && <div className="alert alert-danger mb-3">{error}</div>}
            {saved && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '10px 14px', marginBottom: 16, color: '#16a34a', fontSize: 14 }}>
                <CheckCircle size={16} /> Profile updated successfully!
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>First Name</label>
                  <input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })}
                    className="form-control" placeholder="First name" />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Last Name</label>
                  <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })}
                    className="form-control" placeholder="Last name" />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Phone Number</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="form-control" style={{ paddingLeft: 36 }} placeholder="+94 7X XXX XXXX" />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Email Address</label>
                <input value={user?.email || ''} disabled className="form-control" style={{ background: '#f8fafc', color: '#94a3b8' }} />
                <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>Email cannot be changed</p>
              </div>
              <button onClick={handleSave} disabled={saving} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8,
                padding: '12px 24px', cursor: 'pointer', fontWeight: 600, fontSize: 14, marginTop: 8
              }}>
                <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
