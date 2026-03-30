'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthProvider'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Car, Calendar, MapPin, CheckCircle, Clock } from 'lucide-react'

export default function VendorDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuth()
  
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVendorDetails = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/vendors/${id}`, {
          headers: { Authorization: `Bearer ${user?.token}` }
        })
        if (res.ok) {
          setData(await res.json())
        } else {
          router.push('/admin/vendors')
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    
    if (user?.token && id) {
      fetchVendorDetails()
    }
  }, [user, id, router])

  if (loading) {
    return <div style={{ textAlign: 'center', padding: 60 }}><div className="spinner-border text-primary" /></div>
  }

  if (!data || !data.vendor) {
    return <div style={{ textAlign: 'center', padding: 60 }}>Vendor not found</div>
  }

  const { vendor, totalVehicles, totalBookings, activeVehiclesList } = data

  const getStatusColor = (v: any) => {
    if (!v.isActive) return { bg: '#fee2e2', color: '#dc2626', text: 'Blocked' }
    if (!v.isVerified) return { bg: '#fef9c3', color: '#ca8a04', text: 'Pending' }
    return { bg: '#dcfce7', color: '#16a34a', text: 'Verified' }
  }
  
  const status = getStatusColor(vendor)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <Link href="/admin/vendors" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, color: '#64748b' }}>
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h2 style={{ margin: 0, color: '#0f172a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 12 }}>
            {vendor.businessName || vendor.fullName}
            <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 10, color: status.color, fontWeight: 600 }}>{status.text}</span>
          </h2>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 14 }}>Details and inventory for <strong>{vendor.businessName || vendor.fullName}</strong></p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Profile Details */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: 24 }}>
            <h5 style={{ margin: '0 0 20px', fontWeight: 600, borderBottom: '1px solid #f1f5f9', paddingBottom: 12 }}>Business Information</h5>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>Full Name</div>
                <div style={{ fontWeight: 500, color: '#1e293b' }}>{vendor.fullName}</div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>Email Address</div>
                <div style={{ fontWeight: 500, color: '#1e293b' }}>{vendor.email}</div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>Phone Number</div>
                <div style={{ fontWeight: 500, color: '#1e293b' }}>{vendor.phone}</div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>Emergency Contact</div>
                <div style={{ fontWeight: 500, color: '#1e293b' }}>{vendor.emergencyContact || 'N/A'}</div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>Business Reg. Number</div>
                <div style={{ fontWeight: 500, color: '#1e293b' }}>{vendor.businessRegNumber || 'N/A'}</div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>Operating City</div>
                <div style={{ fontWeight: 500, color: '#1e293b' }}>{vendor.operatingCity || 'N/A'}</div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>Office Address</div>
                <div style={{ fontWeight: 500, color: '#1e293b' }}>{vendor.officeAddress || 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* Active Vehicles */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: 24 }}>
            <h5 style={{ margin: '0 0 20px', fontWeight: 600, borderBottom: '1px solid #f1f5f9', paddingBottom: 12 }}>Active Vehicles ({activeVehiclesList?.length || 0})</h5>
            
            {activeVehiclesList?.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>No active vehicles listed.</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
                {activeVehiclesList.map((v: any) => (
                  <div key={v._id} style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#f8fafc' }}>
                      <img 
                        src={v.images?.[0] || '/assets/imgs/cars-details/banner.png'} 
                        alt={`${v.brand} ${v.model}`} 
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>
                    <div style={{ padding: 12 }}>
                      <div style={{ fontWeight: 600, color: '#0f172a', fontSize: 14 }}>{v.brand} {v.model}</div>
                      <div style={{ fontSize: 13, color: '#64748b', display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={13}/> {v.year}</span>
                        <span>•</span>
                        <span>{v.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Stats Box */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: 20 }}>
            <h6 style={{ margin: '0 0 16px', fontWeight: 600, color: '#0f172a' }}>Overview</h6>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Car size={24} />
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>{totalVehicles}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Total Vehicles</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={24} />
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>{totalBookings}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Total Bookings</div>
              </div>
            </div>
          </div>
          
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: 20 }}>
             <div style={{ fontSize: 12, color: '#94a3b8' }}>Vendor Since</div>
             <div style={{ fontSize: 14, fontWeight: 500, color: '#1e293b', marginTop: 4 }}>
               {new Date(vendor.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
