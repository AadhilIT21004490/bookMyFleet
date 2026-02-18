'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthProvider'
import { Plus, Pencil, Trash2, X, CheckCircle, Clock } from 'lucide-react'

const emptyVehicle = {
  brand: '', model: '', year: new Date().getFullYear(), fuelType: 'Petrol',
  transmission: 'Automatic', seats: 5, luggageCapacity: 2, category: 'Sedan',
  features: '', pricePerDay1Week: '', pricePerDay2Weeks: '', pricePerDay3Weeks: '',
  pricePerDay1Month: '', pricePerDay3Months: '', pricePerDay6Months: '',
}

export default function VendorVehiclesPage() {
  const { user } = useAuth()
  const [vehicles, setVehicles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [form, setForm] = useState<any>(emptyVehicle)
  const [saving, setSaving] = useState(false)

  const fetchVehicles = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vendor-dashboard/vehicles`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      })
      if (res.ok) setVehicles(await res.json())
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { if (user?.token) fetchVehicles() }, [user])

  const openAdd = () => { setEditing(null); setForm(emptyVehicle); setShowModal(true) }
  const openEdit = (v: any) => {
    setEditing(v)
    setForm({ ...v, features: v.features?.join(', ') || '' })
    setShowModal(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const body = { ...form, features: form.features.split(',').map((f: string) => f.trim()).filter(Boolean) }
      const url = editing
        ? `${process.env.NEXT_PUBLIC_API_URL}/vendor-dashboard/vehicles/${editing._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/vendor-dashboard/vehicles`
      const res = await fetch(url, {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user?.token}` },
        body: JSON.stringify(body)
      })
      if (res.ok) { setShowModal(false); fetchVehicles() }
    } catch (e) { console.error(e) }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this vehicle?')) return
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vendor-dashboard/vehicles/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user?.token}` }
      })
      fetchVehicles()
    } catch (e) { console.error(e) }
  }

  const inp = (field: string, label: string, type = 'text', opts?: string[]) => (
    <div style={{ marginBottom: 12 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>{label}</label>
      {opts ? (
        <select value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })}
          style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13 }}>
          {opts.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })}
          style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13 }} />
      )}
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, color: '#0f172a', fontWeight: 700 }}>My Vehicles</h2>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 14 }}>Manage your vehicle listings</p>
        </div>
        <button onClick={openAdd} style={{
          display: 'flex', alignItems: 'center', gap: 8, background: '#10b981',
          color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px',
          cursor: 'pointer', fontWeight: 600, fontSize: 14
        }}>
          <Plus size={16} /> Add Vehicle
        </button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5"><div className="spinner-border text-success" /></div>
      ) : vehicles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>
          <p>No vehicles yet. Add your first vehicle!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {vehicles.map((v: any) => (
            <div key={v._id} style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <div style={{ background: '#f8fafc', padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: '#0f172a' }}>{v.brand} {v.model}</div>
                    <div style={{ fontSize: 13, color: '#64748b' }}>{v.year} · {v.category} · {v.transmission}</div>
                  </div>
                  <span style={{
                    fontSize: 11, padding: '3px 8px', borderRadius: 20, fontWeight: 600,
                    background: v.isApproved ? '#dcfce7' : '#fef9c3',
                    color: v.isApproved ? '#16a34a' : '#ca8a04',
                    display: 'flex', alignItems: 'center', gap: 4
                  }}>
                    {v.isApproved ? <CheckCircle size={11} /> : <Clock size={11} />}
                    {v.isApproved ? 'Approved' : 'Pending'}
                  </span>
                </div>
              </div>
              <div style={{ padding: '12px 20px' }}>
                <div style={{ fontSize: 13, color: '#475569', marginBottom: 8 }}>
                  <span style={{ fontWeight: 600 }}>Fuel:</span> {v.fuelType} &nbsp;·&nbsp;
                  <span style={{ fontWeight: 600 }}>Seats:</span> {v.seats}
                </div>
                {v.pricePerDay1Week && (
                  <div style={{ fontSize: 13, color: '#10b981', fontWeight: 600 }}>
                    From LKR {Number(v.pricePerDay1Week).toLocaleString()}/day
                  </div>
                )}
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <button onClick={() => openEdit(v)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: '#eff6ff', border: 'none', borderRadius: 6, padding: '7px', cursor: 'pointer', color: '#3b82f6', fontSize: 13 }}>
                    <Pencil size={14} /> Edit
                  </button>
                  <button onClick={() => handleDelete(v._id)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: '#fee2e2', border: 'none', borderRadius: 6, padding: '7px', cursor: 'pointer', color: '#dc2626', fontSize: 13 }}>
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, width: '90%', maxWidth: 620, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h5 style={{ margin: 0, fontWeight: 700 }}>{editing ? 'Edit Vehicle' : 'Add Vehicle'}</h5>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
              {inp('brand', 'Brand *')}
              {inp('model', 'Model *')}
              {inp('year', 'Year *', 'number')}
              {inp('category', 'Category', 'text', ['Sedan', 'SUV', 'Luxury', 'Van', 'Mini', 'Bus', 'Other'])}
              {inp('fuelType', 'Fuel Type', 'text', ['Petrol', 'Diesel', 'Hybrid', 'Electric'])}
              {inp('transmission', 'Transmission', 'text', ['Automatic', 'Manual'])}
              {inp('seats', 'Seats', 'number')}
              {inp('luggageCapacity', 'Luggage Capacity', 'number')}
              {inp('pricePerDay1Week', '1 Week Price/Day (LKR)', 'number')}
              {inp('pricePerDay2Weeks', '2 Weeks Price/Day (LKR)', 'number')}
              {inp('pricePerDay3Weeks', '3 Weeks Price/Day (LKR)', 'number')}
              {inp('pricePerDay1Month', '1 Month Price/Day (LKR)', 'number')}
              {inp('pricePerDay3Months', '3 Months Price/Day (LKR)', 'number')}
              {inp('pricePerDay6Months', '6 Months Price/Day (LKR)', 'number')}
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Features (comma separated)</label>
              <input value={form.features} onChange={e => setForm({ ...form, features: e.target.value })}
                placeholder="AC, GPS, Baby Seat, ..."
                style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13 }} />
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', border: '1px solid #e2e8f0', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 14 }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{ flex: 2, padding: '10px', border: 'none', borderRadius: 8, background: '#10b981', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {saving ? 'Saving...' : editing ? 'Update Vehicle' : 'Add Vehicle'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
