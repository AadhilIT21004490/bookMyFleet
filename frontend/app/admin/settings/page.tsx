'use client'
import { useAuth } from '@/context/AuthProvider'
import { Settings, Bell, Shield, Globe, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function AdminSettingsPage() {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    autoApproveVendors: false,
    maintenanceMode: false,
    platformName: 'BookMyFleet',
    supportEmail: 'support@bookmyfleet.lk',
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const toggleStyle = (active: boolean): React.CSSProperties => ({
    width: 44, height: 24, borderRadius: 12, background: active ? '#7c3aed' : '#cbd5e1',
    position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0
  })
  const knobStyle = (active: boolean): React.CSSProperties => ({
    width: 18, height: 18, borderRadius: '50%', background: '#fff',
    position: 'absolute', top: 3, left: active ? 23 : 3, transition: 'left 0.2s'
  })

  const sectionStyle = { background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: '24px 28px', marginBottom: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>Settings</h2>
        <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 14 }}>Configure platform-wide settings</p>
      </div>

      <div style={{ maxWidth: 600 }}>
        {saved && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '10px 14px', marginBottom: 16, color: '#16a34a', fontSize: 14 }}>
            <CheckCircle size={16} /> Settings saved successfully!
          </div>
        )}

        {/* Platform */}
        <div style={sectionStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Globe size={18} color="#7c3aed" />
            <h6 style={{ margin: 0, fontWeight: 700, color: '#0f172a' }}>Platform Settings</h6>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Platform Name</label>
              <input value={settings.platformName} onChange={e => setSettings({ ...settings, platformName: e.target.value })} className="form-control" />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Support Email</label>
              <input value={settings.supportEmail} onChange={e => setSettings({ ...settings, supportEmail: e.target.value })} className="form-control" type="email" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div style={sectionStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Bell size={18} color="#7c3aed" />
            <h6 style={{ margin: 0, fontWeight: 700, color: '#0f172a' }}>Notifications</h6>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
            <div>
              <div style={{ fontWeight: 500, fontSize: 14, color: '#0f172a' }}>Email Notifications</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>Receive email alerts for new registrations and bookings</div>
            </div>
            <div style={toggleStyle(settings.emailNotifications)} onClick={() => setSettings({ ...settings, emailNotifications: !settings.emailNotifications })}>
              <div style={knobStyle(settings.emailNotifications)} />
            </div>
          </div>
        </div>

        {/* Security */}
        <div style={sectionStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Shield size={18} color="#7c3aed" />
            <h6 style={{ margin: 0, fontWeight: 700, color: '#0f172a' }}>Security & Access</h6>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
            <div>
              <div style={{ fontWeight: 500, fontSize: 14, color: '#0f172a' }}>Auto-Approve Vendors</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>Automatically approve new vendor registrations</div>
            </div>
            <div style={toggleStyle(settings.autoApproveVendors)} onClick={() => setSettings({ ...settings, autoApproveVendors: !settings.autoApproveVendors })}>
              <div style={knobStyle(settings.autoApproveVendors)} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
            <div>
              <div style={{ fontWeight: 500, fontSize: 14, color: '#dc2626' }}>Maintenance Mode</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>Take the platform offline for maintenance</div>
            </div>
            <div style={toggleStyle(settings.maintenanceMode)} onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}>
              <div style={knobStyle(settings.maintenanceMode)} />
            </div>
          </div>
        </div>

        <button onClick={handleSave} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8,
          padding: '13px 28px', cursor: 'pointer', fontWeight: 600, fontSize: 14, width: '100%'
        }}>
          <Settings size={16} /> Save Settings
        </button>
      </div>
    </div>
  )
}
