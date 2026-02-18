'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Search, SlidersHorizontal, X, Car, Fuel, Users, Zap } from "lucide-react"

const CATEGORIES = ['All', 'Sedan', 'SUV', 'Luxury', 'Van', 'Mini', 'Bus', 'Other']
const FUEL_TYPES = ['All', 'Petrol', 'Diesel', 'Hybrid', 'Electric']
const TRANSMISSIONS = ['All', 'Automatic', 'Manual']

function VehicleCard({ vehicle }: { vehicle: any }) {
  const price = vehicle.pricePerDay1Week
  const vendor = vehicle.vendor
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'transform 0.2s, box-shadow 0.2s' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)' }}>
        {/* Image */}
        <div style={{ height: 180, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {vehicle.images?.[0] ? (
            <img src={vehicle.images[0]} alt={`${vehicle.brand} ${vehicle.model}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <Car size={64} color="#cbd5e1" />
          )}
          <span style={{ position: 'absolute', top: 12, left: 12, background: '#0f172a', color: '#fff', fontSize: 11, padding: '3px 8px', borderRadius: 20, fontWeight: 600 }}>
            {vehicle.category}
          </span>
        </div>
        {/* Info */}
        <div style={{ padding: '16px 18px' }}>
          <h6 style={{ margin: '0 0 4px', fontWeight: 700, color: '#0f172a', fontSize: 16 }}>{vehicle.brand} {vehicle.model}</h6>
          <p style={{ margin: '0 0 10px', fontSize: 12, color: '#94a3b8' }}>{vehicle.year} · {vendor?.operatingCity || 'Sri Lanka'}</p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}><Fuel size={13} />{vehicle.fuelType}</span>
            <span style={{ fontSize: 12, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}><Zap size={13} />{vehicle.transmission}</span>
            <span style={{ fontSize: 12, color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}><Users size={13} />{vehicle.seats} seats</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              {price ? (
                <span style={{ fontWeight: 700, color: '#0f172a', fontSize: 15 }}>LKR {Number(price).toLocaleString()}<span style={{ fontWeight: 400, color: '#94a3b8', fontSize: 12 }}>/day</span></span>
              ) : (
                <span style={{ color: '#94a3b8', fontSize: 13 }}>Contact for price</span>
              )}
            </div>
            <Link href={`/vehicles/${vehicle._id}`} style={{ background: '#0f172a', color: '#fff', padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CarsListPage() {
  const [vehicles, setVehicles] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [fuelType, setFuelType] = useState('All')
  const [transmission, setTransmission] = useState('All')

  const fetchVehicles = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: '12' })
      if (category !== 'All') params.set('category', category)
      if (fuelType !== 'All') params.set('fuelType', fuelType)
      if (transmission !== 'All') params.set('transmission', transmission)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles?${params}`)
      if (res.ok) {
        const data = await res.json()
        setVehicles(data.vehicles)
        setTotal(data.total)
      }
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchVehicles() }, [page, category, fuelType, transmission])

  const filtered = vehicles.filter(v =>
    `${v.brand} ${v.model} ${v.vendor?.businessName} ${v.vendor?.operatingCity}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Layout footerStyle={1}>
      <section className="section-box pt-50 background-body">
        <div className="container">
          <div className="row align-items-end mb-30">
            <div className="col-md-9 wow fadeInUp">
              <h4 className="title-svg neutral-1000 mb-15">Our Vehicle Fleet</h4>
              <p className="text-lg-medium text-bold neutral-500">Browse {total} approved vehicles from verified car owners across Sri Lanka.</p>
            </div>
          </div>

          {/* Search + Filter Bar */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input placeholder="Search by brand, model, city..." value={search} onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 36px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, outline: 'none' }} />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px',
              border: '1px solid #e2e8f0', borderRadius: 8, background: showFilters ? '#0f172a' : '#fff',
              color: showFilters ? '#fff' : '#64748b', cursor: 'pointer', fontSize: 14, fontWeight: 500
            }}>
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Category</label>
                  <select value={category} onChange={e => { setCategory(e.target.value); setPage(1) }}
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13 }}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Fuel Type</label>
                  <select value={fuelType} onChange={e => { setFuelType(e.target.value); setPage(1) }}
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13 }}>
                    {FUEL_TYPES.map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Transmission</label>
                  <select value={transmission} onChange={e => { setTransmission(e.target.value); setPage(1) }}
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13 }}>
                    {TRANSMISSIONS.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button onClick={() => { setCategory('All'); setFuelType('All'); setTransmission('All'); setSearch(''); setPage(1) }}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff', cursor: 'pointer', fontSize: 13, color: '#64748b' }}>
                    <X size={14} /> Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {loading ? (
            <div className="d-flex justify-content-center py-5"><div className="spinner-border text-primary" /></div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
              <Car size={48} style={{ marginBottom: 16 }} />
              <p>No vehicles found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="row">
              {filtered.map((v: any) => <VehicleCard key={v._id} vehicle={v} />)}
            </div>
          )}

          {/* Pagination */}
          {!loading && total > 12 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                style={{ padding: '8px 18px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: 14 }}>← Prev</button>
              <span style={{ padding: '8px 16px', fontSize: 14, color: '#64748b' }}>Page {page} of {Math.ceil(total / 12)}</span>
              <button onClick={() => setPage(p => p + 1)} disabled={vehicles.length < 12}
                style={{ padding: '8px 18px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: 14 }}>Next →</button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}