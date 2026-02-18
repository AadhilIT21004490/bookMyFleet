'use client'
import Layout from "@/components/layout/Layout"
import { useAuth } from "@/context/AuthProvider"
import { ArrowRight, Calendar, Car, Fuel, Info, MapPin, PhoneCall, Users, Zap, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Slider from "react-slick"

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: any) => (
  <button {...props} className={"slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")} type="button">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" stroke="" strokeLinecap="round" strokeLinejoin="round"></path></svg>
  </button>
)
const SlickArrowRight = ({ currentSlide, slideCount, ...props }: any) => (
  <button {...props} className={"slick-next slick-arrow" + (currentSlide === slideCount - 1 ? " slick-disabled" : "")} type="button">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" stroke="" strokeLinecap="round" strokeLinejoin="round"> </path></svg>
  </button>
)

const pricingTiers = [
  { label: 'For 1 week', key: 'pricePerDay1Week', days: 7 },
  { label: 'For 2 weeks', key: 'pricePerDay2Weeks', days: 14 },
  { label: 'For 3 weeks', key: 'pricePerDay3Weeks', days: 21 },
  { label: 'For 1 month', key: 'pricePerDay1Month', days: 30 },
  { label: 'For 3 months', key: 'pricePerDay3Months', days: 90 },
  { label: 'For 6 months & over', key: 'pricePerDay6Months', days: 180 },
]

export default function VehicleDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const router = useRouter()

  const [vehicle, setVehicle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [nav1, setNav1] = useState<any>(null)
  const [nav2, setNav2] = useState<any>(null)
  const [slider1, setSlider1] = useState<any>(null)
  const [slider2, setSlider2] = useState<any>(null)
  const [showBooking, setShowBooking] = useState(false)
  const [termsChecked, setTermsChecked] = useState(false)
  const [bookingForm, setBookingForm] = useState({ pickupDate: '', dropoffDate: '', pickupLocation: '', dropoffLocation: '', notes: '' })
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingError, setBookingError] = useState('')
  const [estimatedPrice, setEstimatedPrice] = useState<{ days: number; pricePerDay: number; total: number } | null>(null)
  const [isAccordion, setIsAccordion] = useState<any>(null)

  useEffect(() => { setNav1(slider1); setNav2(slider2) }, [slider1, slider2])

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/${id}`)
        if (res.ok) setVehicle(await res.json())
        else router.push('/cars-list-1')
      } catch (e) { console.error(e) }
      finally { setLoading(false) }
    }
    if (id) fetch_()
  }, [id])

  // Calculate estimated price when dates change
  useEffect(() => {
    if (!bookingForm.pickupDate || !bookingForm.dropoffDate || !vehicle) return
    const days = Math.ceil((new Date(bookingForm.dropoffDate).getTime() - new Date(bookingForm.pickupDate).getTime()) / (1000 * 60 * 60 * 24))
    if (days < 1) { setEstimatedPrice(null); return }

    let pricePerDay = vehicle.pricePerDay1Week || 0
    if (days >= 180 && vehicle.pricePerDay6Months) pricePerDay = vehicle.pricePerDay6Months
    else if (days >= 90 && vehicle.pricePerDay3Months) pricePerDay = vehicle.pricePerDay3Months
    else if (days >= 30 && vehicle.pricePerDay1Month) pricePerDay = vehicle.pricePerDay1Month
    else if (days >= 21 && vehicle.pricePerDay3Weeks) pricePerDay = vehicle.pricePerDay3Weeks
    else if (days >= 14 && vehicle.pricePerDay2Weeks) pricePerDay = vehicle.pricePerDay2Weeks

    setEstimatedPrice({ days, pricePerDay, total: pricePerDay * days })
  }, [bookingForm.pickupDate, bookingForm.dropoffDate, vehicle])

  const handleBook = async () => {
    if (!user) { router.push('/login'); return }
    if (!termsChecked) { setBookingError('Please accept the terms and conditions.'); return }
    if (!bookingForm.pickupDate || !bookingForm.dropoffDate) { setBookingError('Please select pickup and dropoff dates.'); return }

    setBookingLoading(true)
    setBookingError('')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/${id}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ vehicleId: id, ...bookingForm })
      })
      const data = await res.json()
      if (res.ok) {
        setBookingSuccess(true)
      } else {
        setBookingError(data.message || 'Booking failed. Please try again.')
      }
    } catch (e) {
      setBookingError('Something went wrong. Please try again.')
    } finally {
      setBookingLoading(false)
    }
  }

  const settingsMain = { slidesToShow: 1, slidesToScroll: 1, arrows: true, fade: false, prevArrow: <SlickArrowLeft />, nextArrow: <SlickArrowRight />, asNavFor: nav2 }
  const settingsThumbs = { slidesToShow: 5, slidesToScroll: 1, asNavFor: nav1, dots: false, focusOnSelect: true, responsive: [{ breakpoint: 700, settings: { slidesToShow: 3 } }] }

  const images = vehicle?.images?.length > 0 ? vehicle.images : ['/assets/imgs/cars-details/banner.png']
  const vendor = vehicle?.vendor

  if (loading) return <Layout footerStyle={1}><div className="d-flex justify-content-center py-5 pt-140"><div className="spinner-border text-primary" /></div></Layout>
  if (!vehicle) return null

  return (
    <Layout footerStyle={1}>
      <div>
        <section className="box-section box-breadcrumb background-body">
          <div className="container">
            <ul className="breadcrumbs">
              <li><Link href="/">Home</Link><span className="arrow-right"><svg width={7} height={12} viewBox="0 0 7 12" fill="none"><path d="M1 11L6 6L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span></li>
              <li><Link href="/cars-list-1">Cars</Link><span className="arrow-right"><svg width={7} height={12} viewBox="0 0 7 12" fill="none"><path d="M1 11L6 6L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span></li>
              <li><span className="text-breadcrumb">{vehicle.brand} {vehicle.model} {vehicle.year}</span></li>
            </ul>
          </div>
        </section>

        <section className="box-section box-content-tour-detail background-body pt-0">
          <div className="container">
            <div className="tour-header">
              <div className="row">
                <div className="col-lg-8">
                  <div className="tour-title-main">
                    <h4 className="neutral-1000">{vehicle.brand} {vehicle.model} {vehicle.year}</h4>
                  </div>
                </div>
              </div>
              <div className="tour-metas">
                <div className="tour-meta-left">
                  <p className="text-md-medium neutral-1000 mr-20 tour-location"><MapPin size={18} />{vendor?.operatingCity || 'Sri Lanka'}</p>
                  <p className="text-md-medium neutral-1000 tour-code mr-15"><Car size={18} />{vehicle.category}</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-8">
                {/* Image Slider */}
                <div className="container-banner-activities">
                  <div className="box-banner-activities">
                    <Slider {...settingsMain} asNavFor={nav2} ref={(s) => setSlider1(s)} className="banner-activities-detail">
                      {images.map((img: string, i: number) => (
                        <div key={i} className="banner-slide-activity"><img src={img} alt={`${vehicle.brand} ${vehicle.model}`} /></div>
                      ))}
                    </Slider>
                  </div>
                  {images.length > 1 && (
                    <div className="slider-thumnail-activities">
                      <Slider {...settingsThumbs} asNavFor={nav1} ref={(s) => setSlider2(s)} className="slider-nav-thumbnails-activities-detail">
                        {images.map((img: string, i: number) => (
                          <div key={i} className="banner-slide"><img src={img} alt={`${vehicle.brand} ${vehicle.model}`} /></div>
                        ))}
                      </Slider>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="box-feature-car">
                  <div className="list-feature-car align-items-start">
                    <div className="item-feature-car w-md-25"><div className="item-feature-car-inner"><div className="feature-image"><Fuel size={22} /></div><div className="feature-info"><p className="text-md-medium neutral-1000">{vehicle.fuelType}</p></div></div></div>
                    <div className="item-feature-car w-md-25"><div className="item-feature-car-inner"><div className="feature-image"><Zap size={22} /></div><div className="feature-info"><p className="text-md-medium neutral-1000">{vehicle.transmission}</p></div></div></div>
                    <div className="item-feature-car w-md-25"><div className="item-feature-car-inner"><div className="feature-image"><Users size={22} /></div><div className="feature-info"><p className="text-md-medium neutral-1000">{vehicle.seats} Seats</p></div></div></div>
                    <div className="item-feature-car w-md-25"><div className="item-feature-car-inner"><div className="feature-image"><Calendar size={22} /></div><div className="feature-info"><p className="text-md-medium neutral-1000">{vehicle.year} Model</p></div></div></div>
                  </div>
                </div>

                {/* Accordions */}
                <div className="box-collapse-expand">
                  {vehicle.features?.length > 0 && (
                    <div className="group-collapse-expand">
                      <button className={isAccordion === 1 ? "btn btn-collapse collapsed" : "btn btn-collapse"} onClick={() => setIsAccordion(isAccordion === 1 ? null : 1)}>
                        <h6>Features & Amenities</h6>
                        <svg width={12} height={7} viewBox="0 0 12 7"><path d="M1 1L6 6L11 1" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                      </button>
                      <div className={isAccordion === 1 ? "collapse" : "collapse show"}>
                        <div className="card card-body">
                          <ul className="list-checked-green">
                            {vehicle.features.map((f: string, i: number) => <li key={i}>{f}</li>)}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="col-lg-4">
                <div className="sidebar-banner">
                  {/* Pricing Table */}
                  <div className="bg-primary text-black py-2 text-center rounded mb-3 fw-bold">RENTAL FARE LIST</div>
                  <table className="table table-borderless text-center my-4">
                    <thead>
                      <tr>
                        <th></th>
                        <th className="text-start text-md">Per Day Rate</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricingTiers.map(({ label, key, days }) => {
                        const price = vehicle[key]
                        if (!price) return null
                        return (
                          <tr key={key}>
                            <th className="text-start text-md">{label}</th>
                            <td>LKR {Number(price).toLocaleString()}/=</td>
                            <td>LKR {(Number(price) * days).toLocaleString()}/=</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>

                  <div className="d-flex align-items-start mb-3">
                    <Info size={18} color='blue' className="me-2" />
                    <p className="mb-0 fst-italic" style={{ fontSize: "0.9rem" }}>Above rentals may be higher for foreigners with extra commitments.</p>
                  </div>

                  {/* Vendor Info */}
                  <div className="sidebar-left border-1 background-card p-3 mb-3">
                    <h6 className="text-xl-bold neutral-1000 border-bottom pb-2">Listed by</h6>
                    <div className="box-sidebar-content">
                      <div className="box-agent-support border-bottom pb-3 mb-3 d-flex align-items-center">
                        <div className="me-2"><img src="/assets/imgs/template/icons/car-1.png" alt="vendor" width={65} height={50} /></div>
                        <div className="card-author-info">
                          <p className="text-lg-bold neutral-1000 mb-1">{vendor?.businessName || vendor?.fullName}</p>
                          <p className="text-sm-medium neutral-500">{vendor?.operatingCity}</p>
                        </div>
                      </div>
                      <div className="box-link-bottom d-grid gap-2">
                        <button className="btn btn-primary py-3 w-100 rounded-3" onClick={() => setShowBooking(true)}>
                          Book this vehicle <ArrowRight size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Modal */}
        {showBooking && (
          <div className="modal show fade d-block" tabIndex={-1} role="dialog" aria-modal="true"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}>
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content p-4">
                {bookingSuccess ? (
                  <div style={{ textAlign: 'center', padding: '32px 0' }}>
                    <CheckCircle size={56} color="#16a34a" style={{ marginBottom: 16 }} />
                    <h5 style={{ fontWeight: 700, color: '#0f172a' }}>Booking Submitted!</h5>
                    <p style={{ color: '#64748b', marginBottom: 24 }}>Your booking request has been sent to the car owner. They will review and approve it shortly.</p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                      <button onClick={() => { setShowBooking(false); setBookingSuccess(false) }} className="btn btn-secondary py-2 px-4 rounded-3">Close</button>
                      <Link href="/user/bookings" className="btn btn-primary py-2 px-4 rounded-3">View My Bookings</Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <h5 style={{ fontWeight: 700, marginBottom: 4 }}>Book: {vehicle.brand} {vehicle.model}</h5>
                    <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>Fill in your booking details below.</p>

                    {bookingError && <div className="alert alert-danger">{bookingError}</div>}

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Pickup Date *</label>
                        <input type="date" value={bookingForm.pickupDate} min={new Date().toISOString().split('T')[0]}
                          onChange={e => setBookingForm({ ...bookingForm, pickupDate: e.target.value })}
                          className="form-control" />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Dropoff Date *</label>
                        <input type="date" value={bookingForm.dropoffDate} min={bookingForm.pickupDate || new Date().toISOString().split('T')[0]}
                          onChange={e => setBookingForm({ ...bookingForm, dropoffDate: e.target.value })}
                          className="form-control" />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Pickup Location</label>
                        <input type="text" placeholder="e.g. Colombo Airport" value={bookingForm.pickupLocation}
                          onChange={e => setBookingForm({ ...bookingForm, pickupLocation: e.target.value })}
                          className="form-control" />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Dropoff Location</label>
                        <input type="text" placeholder="e.g. Kandy City" value={bookingForm.dropoffLocation}
                          onChange={e => setBookingForm({ ...bookingForm, dropoffLocation: e.target.value })}
                          className="form-control" />
                      </div>
                      <div className="col-12 mb-3">
                        <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>Notes (optional)</label>
                        <textarea rows={2} placeholder="Any special requirements..." value={bookingForm.notes}
                          onChange={e => setBookingForm({ ...bookingForm, notes: e.target.value })}
                          className="form-control" />
                      </div>
                    </div>

                    {/* Price Estimate */}
                    {estimatedPrice && (
                      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '12px 16px', marginBottom: 16 }}>
                        <div style={{ fontSize: 13, color: '#16a34a', fontWeight: 600 }}>Estimated Cost</div>
                        <div style={{ fontSize: 13, color: '#475569', marginTop: 4 }}>
                          {estimatedPrice.days} days × LKR {estimatedPrice.pricePerDay.toLocaleString()}/day
                          = <strong>LKR {estimatedPrice.total.toLocaleString()}</strong>
                        </div>
                      </div>
                    )}

                    <div className="form-check mb-3">
                      <input className="form-check-input" type="checkbox" id="termsCheck" checked={termsChecked} onChange={() => setTermsChecked(!termsChecked)} />
                      <label className="form-check-label" htmlFor="termsCheck" style={{ fontSize: 13 }}>
                        I agree to the <Link href="/term" className="text-primary-dark"><strong>Terms and Conditions</strong></Link>. I understand that BookMyFleet is not liable for disputes after booking.
                      </label>
                    </div>

                    <div style={{ display: 'flex', gap: 10 }}>
                      <button onClick={() => setShowBooking(false)} className="btn btn-secondary py-3 flex-1 rounded-3">Cancel</button>
                      <button onClick={handleBook} disabled={bookingLoading || !termsChecked} className="btn btn-primary py-3 rounded-3" style={{ flex: 2 }}>
                        {bookingLoading ? 'Submitting...' : user ? 'Confirm Booking' : 'Login to Book'}
                        {!bookingLoading && <ArrowRight size={18} className="ms-2" />}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
