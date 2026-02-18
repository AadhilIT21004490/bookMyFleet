'use client'
import { useAuth } from '@/context/AuthProvider'
import { Shield, Mail, User, Lock, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function AdminProfilePage() {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>Admin Profile</h2>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 14 }}>Your administrator account information</p>
      </div>

      <div style={{ maxWidth: 520 }}>
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: '28px 32px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          {/* Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, paddingBottom: 24, borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={28} color="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#0f172a' }}>{user?.name}</div>
              <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, background: '#7c3aed20', color: '#7c3aed', fontWeight: 600 }}>Super Admin</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input value={user?.name || ''} disabled className="form-control" style={{ paddingLeft: 34, background: '#f8fafc', color: '#64748b' }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input value={user?.email || ''} disabled className="form-control" style={{ paddingLeft: 34, background: '#f8fafc', color: '#64748b' }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Role</label>
              <input value="Administrator" disabled className="form-control" style={{ background: '#f8fafc', color: '#64748b' }} />
            </div>

            <div style={{ background: '#fef9c3', border: '1px solid #fde68a', borderRadius: 8, padding: '12px 14px', fontSize: 13, color: '#92400e', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <Lock size={15} style={{ marginTop: 1, flexShrink: 0 }} />
              Admin account details can only be changed directly in the database or via the seed endpoint for security reasons.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
