'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthProvider'
import { Building2, Mail, Phone, MapPin, Save, CheckCircle, User } from 'lucide-react'

export default function VendorProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [form, setForm] = useState({
    businessOverview: '', officeAddress: '', officeContact: '', operatingCity: '',
    socialLinks: { facebook: '', instagram: '', website: '' },
    bankDetails: { bankName: '', accountNumber: '', accountHolder: '' }
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vendor-dashboard/profile`, {
          headers: { Authorization: `Bearer ${user?.token}` }
        })
        if (res.ok) {
          const data = await res.json()
          setProfile(data)
          setForm({
            businessOverview: data.businessOverview || '',
            officeAddress: data.officeAddress || '',
            officeContact: data.officeContact || '',
            operatingCity: data.operatingCity || '',
            socialLinks: data.socialLinks || { facebook: '', instagram: '', website: '' },
            bankDetails: data.bankDetails || { bankName: '', accountNumber: '', accountHolder: '' }
          })
        }
      } catch (e) { console.error(e) }
      finally { setLoading(false) }
    }
    if (user?.token) fetch_()
  }, [user])

  const handleSave = async () => {
    setSaving(true); setError(''); setSaved(false)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vendor-dashboard/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user?.token}` },
        body: JSON.stringify(form)
      })
      if (res.ok) setSaved(true)
      else { const d = await res.json(); setError(d.message || 'Failed to save') }
    } catch (e) { setError('Something went wrong') }
    finally { setSaving(false) }
  }

  const inputStyle = { width: '100%', padding: '9px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, outline: 'none' }
  const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }
  const sectionStyle = { background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: '24px 28px', marginBottom: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>Business Profile</h2>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 14 }}>Update your business information visible to customers</p>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5"><div className="spinner-border text-primary" /></div>
      ) : (
        <div style={{ maxWidth: 680 }}>
          {error && <div className="alert alert-danger">{error}</div>}
          {saved && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '10px 14px', marginBottom: 16, color: '#16a34a', fontSize: 14 }}>
              <CheckCircle size={16} /> Profile updated successfully!
            </div>
          )}

          {/* Identity */}
          <div style={sectionStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#7c3aed20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={24} color="#7c3aed" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#0f172a' }}>{profile?.businessName || profile?.fullName}</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>{profile?.email}</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={labelStyle}>Operating City</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input value={form.operatingCity} onChange={e => setForm({ ...form, operatingCity: e.target.value })} style={{ ...inputStyle, paddingLeft: 30 }} placeholder="e.g. Colombo" />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Office Address</label>
                <input value={form.officeAddress} onChange={e => setForm({ ...form, officeAddress: e.target.value })} style={inputStyle} placeholder="Full office address" />
              </div>
              <div>
                <label style={labelStyle}>Office Contact</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input value={form.officeContact} onChange={e => setForm({ ...form, officeContact: e.target.value })} style={{ ...inputStyle, paddingLeft: 30 }} placeholder="+94 7X XXX XXXX" />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Business Overview</label>
                <textarea value={form.businessOverview} onChange={e => setForm({ ...form, businessOverview: e.target.value })} rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Describe your rental business..." />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div style={sectionStyle}>
            <h6 style={{ fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Social Links</h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(['facebook', 'instagram', 'website'] as const).map(k => (
                <div key={k}>
                  <label style={labelStyle}>{k.charAt(0).toUpperCase() + k.slice(1)}</label>
                  <input value={form.socialLinks[k]} onChange={e => setForm({ ...form, socialLinks: { ...form.socialLinks, [k]: e.target.value } })} style={inputStyle} placeholder={`https://${k}.com/...`} />
                </div>
              ))}
            </div>
          </div>

          {/* Bank Details */}
          <div style={sectionStyle}>
            <h6 style={{ fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Bank Details</h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={labelStyle}>Bank Name</label>
                <input value={form.bankDetails.bankName} onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, bankName: e.target.value } })} style={inputStyle} placeholder="e.g. Commercial Bank" />
              </div>
              <div>
                <label style={labelStyle}>Account Holder Name</label>
                <input value={form.bankDetails.accountHolder} onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, accountHolder: e.target.value } })} style={inputStyle} placeholder="Name on account" />
              </div>
              <div>
                <label style={labelStyle}>Account Number</label>
                <input value={form.bankDetails.accountNumber} onChange={e => setForm({ ...form, bankDetails: { ...form.bankDetails, accountNumber: e.target.value } })} style={inputStyle} placeholder="Account number" />
              </div>
            </div>
          </div>

          <button onClick={handleSave} disabled={saving} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8,
            padding: '13px 28px', cursor: 'pointer', fontWeight: 600, fontSize: 14, width: '100%'
          }}>
            <Save size={16} /> {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      )}
    </div>
  )
}
