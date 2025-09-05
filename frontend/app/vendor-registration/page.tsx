'use client'
import CounterUp from '@/components/elements/CounterUp'
import Layout from "@/components/layout/Layout"
import { swiperGroup3, swiperGroupAnimate } from '@/util/swiperOptions'
import { BadgeCheck, CircleDollarSign, ClockAlert, DoorOpen, DoorOpenIcon, Globe, Handshake, LayoutDashboard, List, ShieldCheck, SmilePlus, SquareMousePointer, UserRoundPen, WholeWord } from 'lucide-react'
import Link from "next/link"
import { useState } from 'react'
import ModalVideo from 'react-modal-video'
import { Swiper, SwiperSlide } from "swiper/react"
export default function AboutUs() {
    const [isOpen, setOpen] = useState(false)
    const [isAccordion, setIsAccordion] = useState(1)

    const handleAccordion = (key: any) => {
        setIsAccordion(prevState => prevState === key ? null : key)
    }
    return (
        <>

            <Layout footerStyle={1}>
                <div>
                    <div className="page-header pt-30 background-body">
                        <div className="custom-container position-relative mx-auto">
                            <div className="bg-overlay rounded-12 overflow-hidden">
                                <img className="w-100 h-100 img-banner" src="/assets/imgs/page-header/banner.png" alt="Book my fleet" />
                            </div>
                            <div className="container position-absolute z-1 top-50 start-50 translate-middle">
                                <h2 className="text-white">List your vehicle</h2>
                                <span className="text-white text-xl-medium">start earning effortlessly.</span>
                            </div>
                            <div className="background-body position-absolute z-1 top-100 start-50 translate-middle px-3 py-2 rounded-12 border d-flex gap-3 @@navigation-page">
                                <Link href="/" className="neutral-700 text-md-medium">Home</Link>
                                <span>
                                    <img src="/assets/imgs/template/icons/arrow-right.svg" alt="Book my fleet" />
                                </span>
                                <Link href="#" className="neutral-1000 text-md-bold">About Registration</Link>
                            </div>
                        </div>
                    </div>
                    {/* section-1 */}
                    <section className="section-1 py-96 background-body">
                        <div className="container">
                            <div className="row pb-50">
                                <div className="col-lg-4">
                                    <h3 className="neutral-1000">
                                        The Future of <br />
                                        <span className="text-primary">Car Rental </span>
                                         is Here
                                    </h3>
                                </div>
                                <div className="col-lg-7 offset-lg-1">
                                    <p className="text-lg-medium neutral-500">
                                        Welcome to Book My Fleet, Sri Lanka’s trusted multi-vendor rent-a-car marketplace.
                                        We connect car rental companies and vehicle owners with thousands of customers looking for reliable and affordable vehicles every day.
                                    </p>
                                    <br/><strong>By joining our platform, you can :</strong>
                                            <div className="col pt-20">
                                                <ul className="list-ticks-green list-ticks-green-2">
                                                    <li className="neutral-1000 pe-0">List your cars, vans, SUVs, luxury vehicles, or buses in just a few clicks</li>
                                                    <li className="neutral-1000 pe-0">Manage bookings, payments, and customers through a single dashboard</li>
                                                    <li className="neutral-1000 pe-0">Reach both local customers and international tourists searching for rentals in Sri Lanka</li>
                                                </ul>
                                            </div>
                                        Our goal is to grow your business by giving you visibility, easy management tools, and a trusted platform to handle reservations smoothly.
                                    
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-lg-4 col-md-6">
                                    <div className="box-image rounded-12 position-relative overflow-hidden">
                                        <img className="rounded-12" src="/assets/imgs/section-1/img-1.png" alt="Book my fleet" />
                                        <div className="box-tag bg-white p-3 d-flex position-absolute bottom-0 end-0 rounded-12 m-3">
                                            <span className="text-dark fs-72 me-3">9</span>
                                            <h6>
                                                Provinces <br />
                                                of Island
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="box-image rounded-12 position-relative overflow-hidden">
                                        <img className="rounded-12" src="/assets/imgs/section-1/img-2.png" alt="Book my fleet" />
                                    </div>
                                </div>
                                <div className="col-lg-4 col-12">
                                    <div className="d-flex flex-column gap-4 align-self-stretch h-100">
                                        <div className="box-tag background-brand-2 p-5 d-flex rounded-12">
                                            <span className="text-dark fs-96 me-3">43</span>
                                            <h4>
                                                Rental <br />
                                                Partners
                                            </h4>
                                        </div>
                                        <img className="rounded-12" src="/assets/imgs/section-1/img-3.png" alt="Book my fleet" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container pt-96">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-xl-6 col-lg-7 col-md-9 col-sm-11">
                                    <div className="text-center mb-5">
                                        <span className="text-xl-medium neutral-500">Become a vendor</span>
                                        <h3 className="section-title neutral-1000">Registration Steps</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-40">
                                <div className="col-lg-3 col-sm-6">
                                    <div className="card-why text-start wow fadeInUp">
                                            <UserRoundPen className='mb-20' size={55}/>                                           
                                        <div className="card-info">
                                            <h6 className="text-xl-bold neutral-1000 text-start">Register as a Vendor</h6>
                                            <p className="text-md-medium neutral-500">Fill in your company or individual details, contact information, and upload the required documents for verification.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6">
                                    <div className="card-why text-start wow fadeInUp">
                                        <BadgeCheck className='mb-20' size={55}/>
                                        <div className="card-info">
                                            <h6 className="text-xl-bold neutral-1000 text-start">Get Verified & List your vehicle</h6>
                                            <p className="text-md-medium neutral-500">Our team quickly reviews your registration and verifies your account to maintain trust and safety for both vendors and customers.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6">
                                    <div className="card-why text-start wow fadeInUp">
                                        <SquareMousePointer className='mb-20' size={55}/>
                                        <div className="card-info">
                                            <h6 className="text-xl-bold neutral-1000 text-start">Receive Bookings</h6>
                                            <p className="text-md-medium neutral-500">Benefit from a variety of rental options, including short-term, long-term, and weekend specials</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6">
                                    <div className="card-why text-start wow fadeInUp">
                                        <CircleDollarSign className='mb-20' size={55}/>
                                        <div className="card-info">
                                            <h6 className="text-xl-bold neutral-1000 text-start">Deliver the Service & Get Paid</h6>
                                            <p className="text-md-medium neutral-500">Hand over the vehicle (self-drive or with driver) as per the booking.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* team 1 */}
                    <section className="section-team-1 py-96 background-body border-top border-bottom">
                        <div className="container">
                            <div className="col-md-9 mb-30 wow fadeInUp">
                                    <h3 className="title-svg neutral-1000 mb-15">Benefits of Working With Us</h3>
                                    <p className="text-lg-medium text-bold neutral-500">Partnering with Book My Fleet means more than just listing your vehicles online — it’s about unlocking new opportunities to grow your rental business. We give you the tools, visibility, and support you need to reach more customers, manage your fleet with ease, and maximize your earnings. Whether you’re an individual owner or a full-scale rental company, our platform is designed to make your business more efficient, more profitable, and more trusted.</p>
                                </div>
                            <div className='row'>
                                <div className="col-lg-3 col-sm-6">
									<div className="card-contact">
											<div className="card-icon background-brand-2 d-flex align-items-center justify-content-center background-card border rounded-2 border-dark p-3 mb-10">
												<Globe size={30}/>
											</div>
										<div className="card-info">
											<div className="card-title">
												<Link className="title text-lg-bold" href="#">Wider Reach</Link>
												<p className="text-xs-medium neutral-500">Get access to thousands of daily users, including local customers and international travelers.</p>
											</div>
										</div>
									</div>
								</div>
                                <div className="col-lg-3 col-sm-6">
									<div className="card-contact">
											<div className="card-icon background-brand-2 d-flex align-items-center justify-content-center background-card border rounded-2 border-dark p-3 mb-10">
												<SmilePlus size={30}/>
											</div>
										<div className="card-info">
											<div className="card-title">
												<Link className="title text-lg-bold" href="#">No Marketing Hassle</Link>
												<p className="text-xs-medium neutral-500">We handle advertising, SEO, and promotions — you just focus on your vehicles.</p>
											</div>
										</div>
									</div>
								</div>
                                <div className="col-lg-3 col-sm-6">
									<div className="card-contact">
											<div className="card-icon background-brand-2 d-flex align-items-center justify-content-center background-card border rounded-2 border-dark p-3 mb-10">
												<LayoutDashboard size={30}/>
											</div>
										<div className="card-info">
											<div className="card-title">
												<Link className="title text-lg-bold" href="#">Easy-to-Use Dashboard</Link>
												<p className="text-xs-medium neutral-500">Manage vehicles, bookings, customers, and earnings all in one place.</p>
											</div>
										</div>
									</div>
								</div>
                                <div className="col-lg-3 col-sm-6">
									<div className="card-contact">
											<div className="card-icon background-brand-2 d-flex align-items-center justify-content-center background-card border rounded-2 border-dark p-3 mb-10">
												<List size={30}/>
											</div>
										<div className="card-info">
											<div className="card-title">
												<Link className="title text-lg-bold" href="#">Flexible Options</Link>
												<p className="text-xs-medium neutral-500">List vehicles for self-drive, chauffeur service, weddings, or long-term corporate rentals.</p>
											</div>
										</div>
									</div>
								</div>
                                <div className="col-lg-3 col-sm-6">
									<div className="card-contact">
											<div className="card-icon background-brand-2 d-flex align-items-center justify-content-center background-card border rounded-2 border-dark p-3 mb-10">
												<ShieldCheck size={30}/>
											</div>
										<div className="card-info">
											<div className="card-title">
												<Link className="title text-lg-bold" href="#">Secure Payments</Link>
												<p className="text-xs-medium neutral-500">Transparent earnings, low commissions, and guaranteed payouts to your bank account.</p>
											</div>
										</div>
									</div>
								</div>
                                <div className="col-lg-3 col-sm-6">
									<div className="card-contact">
											<div className="card-icon background-brand-2 d-flex align-items-center justify-content-center background-card border rounded-2 border-dark p-3 mb-10">
												<Handshake size={30}/>
											</div>
										<div className="card-info">
											<div className="card-title">
												<Link className="title text-lg-bold" href="#">Build Trust with Customers</Link>
												<p className="text-xs-medium neutral-500">Verified vendors get higher visibility and customer confidence.</p>
											</div>
										</div>
									</div>
								</div>
                                <div className="col-lg-3 col-sm-6">
									<div className="card-contact">
											<div className="card-icon background-brand-2 d-flex align-items-center justify-content-center background-card border rounded-2 border-dark p-3 mb-10">
												<ClockAlert size={30}/>
											</div>
										<div className="card-info">
											<div className="card-title">
												<Link className="title text-lg-bold" href="#">24/7 Support</Link>
												<p className="text-xs-medium neutral-500">Our team is here to help with technical, booking, or payment issues whenever you need it.</p>
											</div>
										</div>
									</div>
								</div>
                            </div>
                        </div>
                    </section>
                    {/* cta 8*/}
                    <section className="section-cta-7 background-body py-96">
                        <div className="box-cta-6">
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-lg-5">
                                        <Link className="btn btn-signin bg-2 text-dark mb-4" href="#">Payments</Link>
                                        <h4 className="mb-4 neutral-1000">Sell your car at a fair price. <br />Get started with us today.</h4>
                                        <p className="text-lg-medium neutral-500 mb-4">
                                        At Book My Fleet, we keep our pricing straightforward and affordable for every rent-a-car company. Instead of charging high commissions on every booking, we use a flat monthly subscription model so you can enjoy unlimited listings and unlimited bookings with no hidden fees.
                                        <br/><strong>Here’s how it works:</strong>
                                        </p>
                                        <div className="row">
                                            <div className="col">
                                                <ul className="list-ticks-green list-ticks-green-2">
                                                    <li className="neutral-1000 pe-0">One-time Registration Fee: LKR 2,000 - <span className='text-md-medium neutral-500'>Pay once when you join our platform to set up and verify your account.</span></li>
                                                    <li className="neutral-1000 pe-0">1st Month Free Listing for all vendors - <span className='text-md-medium neutral-500'>Enjoy your first month completely free. List as many vehicles as you like and start receiving bookings</span></li>
                                                    <li className="neutral-1000 pe-0">Monthly Subscription from 2nd Month LKR 5,000 - <span className='text-md-medium neutral-500'>From the second month onwards, pay a flat monthly subscription to keep your vehicles listed and continue receiving unlimited bookings.</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <p className='my-3'>This simple model helps you predict your costs and keep 100% of your earnings from every booking.</p>
                                        <Link className="btn btn-primary mt-2" href="#">
                                            Get Started Now
                                            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="col-lg-6 offset-lg-1 position-relative z-1 mt-lg-0 mt-4">
                                        <div className="d-flex flex-column gap-4">
                                            <div className="d-flex gap-4">
                                                <div className="position-relative">
                                                    <img className="bdrd8 w-100" src="/assets/imgs/cta/cta-8/img-1.png" alt="Book my fleet" />
                                                </div>
                                                <div className="mt-auto">
                                                    <img className="bdrd8 w-100" src="/assets/imgs/cta/cta-8/img-2.png" alt="Book my fleet" />
                                                </div>
                                            </div>
                                            <div className="d-flex gap-4">
                                                <div className="position-relative">
                                                    <img className="bdrd8 w-100" src="/assets/imgs/cta/cta-8/img-3.png" alt="Book my fleet" />
                                                </div>
                                                <div className="position-relative">
                                                    <img className="bdrd8 w-100" src="/assets/imgs/cta/cta-8/img-4.png" alt="Book my fleet" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-overlay position-absolute bottom-0 end-0 h-75 background-brand-2 opacity-25 z-0 rounded-start-pill" />
                        </div>
                    </section>
                    {/* Static 1 */}
                    <section className="section-static-1 background-body background-2 pt-80 pb-80">
                        <div className="container">
                            <div className="row">
                                <div>
                                    <div className="wow fadeIn">
                                        <div className="d-flex align-items-center justify-content-around flex-wrap">
                                            <div className="mb-4 mb-lg-0 d-block px-lg-5 px-3">
                                                <div className="d-flex justify-content-center justify-content-md-start">
                                                    <h3 className="count neutral-1000"><CounterUp count={45} /></h3>
                                                    <h3 className="neutral-1000">+</h3>
                                                </div>
                                                <div className="text-md-start text-center">
                                                    <p className="text-lg-bold neutral-1000">Global</p>
                                                    <p className="text-lg-bold neutral-1000">Branches</p>
                                                </div>
                                            </div>
                                            <div className="mb-4 mb-lg-0 d-block px-lg-5 px-3">
                                                <div className="d-flex justify-content-center justify-content-md-start">
                                                    <h3 className="count neutral-1000"><CounterUp count={29} /></h3>
                                                    <h3 className="neutral-1000">K</h3>
                                                </div>
                                                <div className="text-md-start text-center">
                                                    <p className="text-lg-bold neutral-1000">Destinations</p>
                                                    <p className="text-lg-bold neutral-1000">Collaboration</p>
                                                </div>
                                            </div>
                                            <div className="mb-4 mb-lg-0 d-block px-lg-5 px-3">
                                                <div className="d-flex justify-content-center justify-content-md-start">
                                                    <h3 className="count neutral-1000"><CounterUp count={20} /></h3>
                                                    <h3 className="neutral-1000">+</h3>
                                                </div>
                                                <div className="text-md-start text-center">
                                                    <p className="text-lg-bold neutral-1000">Years</p>
                                                    <p className="text-lg-bold neutral-1000">Experience</p>
                                                </div>
                                            </div>
                                            <div className="mb-4 mb-lg-0 d-block px-lg-5 px-3">
                                                <div className="d-flex justify-content-center justify-content-md-start">
                                                    <h3 className="count neutral-1000"><CounterUp count={168} /></h3>
                                                    <h3 className="neutral-1000">K</h3>
                                                </div>
                                                <div className="text-md-start text-center">
                                                    <p className="text-lg-bold neutral-1000">Happy</p>
                                                    <p className="text-lg-bold neutral-1000">Customers</p>
                                                </div>
                                            </div>
                                            <div className="mb-4 mb-lg-0 d-block px-lg-5 px-3">
                                                <div className="d-flex justify-content-center justify-content-md-start">
                                                    <h3 className="count neutral-1000"><CounterUp count={15} /></h3>
                                                    <h3 className="neutral-1000">M</h3>
                                                </div>
                                                <div className="text-md-start text-center">
                                                    <p className="text-lg-bold neutral-1000">User</p>
                                                    <p className="text-lg-bold neutral-1000">Account</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* cta 9*/}
                    <section className="section-cta-7 background-body py-96">
                        <div className="box-cta-6">
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-lg-6">
                                        <div className="card-image d-inline-block position-relative mb-100">
                                            <img className="rounded-12" src="/assets/imgs/cta/cta-9/img-1.png" alt="Book my fleet" />
                                            <a className="btn btn-play popup-youtube position-absolute top-50 start-50 translate-middle" onClick={() => setOpen(true)} />
                                            <img className="position-absolute top-100 start-100 translate-middle rounded-12 d-none d-md-block" src="/assets/imgs/cta/cta-9/img-2.png" alt="Book my fleet" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 ps-lg-5">
                                        <Link className="btn btn-signin bg-2 text-dark mb-4" href="#">Our Commitment</Link>
                                        <h4 className="mb-4 neutral-1000">Book my fleet offers clear pricing and 24/7 great support.</h4>
                                        <p className="text-lg-medium neutral-500 mb-4">We are committed to offering transparent pricing with no hidden fees, comprehensive insurance options for peace of mind, and 24/7 customer support to assist you whenever you need it. At Book my fleet, your satisfaction is our top priority.</p>
                                        <div className="row">
                                            <div className="col">
                                                <ul className="list-ticks-green list-ticks-green-2">
                                                    <li className="neutral-1000 pe-0">Explore a wide range of flexible rental options to suit your needs</li>
                                                    <li className="neutral-1000 pe-0">Comprehensive insurance coverage for complete peace of mind</li>
                                                    <li className="neutral-1000 pe-0">24/7 customer support for assistance anytime, anywhere</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <Link className="btn btn-primary mt-2" href="#">
                                            Get Started Now
                                            <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-overlay position-absolute bottom-0 end-0 h-75 background-brand-2 opacity-25 z-0 rounded-start-pill" />
                        </div>
                    </section>
                    {/* testimonials */}
                    <section className="section-box py-96 background-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-auto mx-auto wow fadeInUp text-center d-flex flex-column align-items-center justify-content-center">
                                    <div className="box-author-testimonials background-100">
                                        <img src="/assets/imgs/page/homepage1/testimonial.png" alt="Book my fleet" />
                                        <img src="/assets/imgs/page/homepage1/testimonial2.png" alt="Book my fleet" />
                                        <img src="/assets/imgs/page/homepage1/testimonial3.png" alt="Book my fleet" />
                                        Testimonials
                                    </div>
                                    <h3 className="mt-8 mb-15 neutral-1000">What they say about us?</h3>
                                </div>
                            </div>
                        </div>
                        <div className="block-testimonials wow fadeIn ps-0 mask-image">
                            <div className="container-testimonials ">
                                <div className="container-slider ps-0">
                                    <div className="box-swiper mt-30">
                                        <Swiper {...swiperGroupAnimate} className="swiper-container swiper-group-animate swiper-group-journey">
                                            <div className="swiper-wrapper">
                                                <SwiperSlide className="swiper-slide">
                                                    <div className="card-testimonial background-card">
                                                        <div className="card-info">
                                                            <p className="text-xl-bold card-title neutral-1000">No Hidden Fees</p>
                                                            <p className="text-md-regular neutral-500">The attention to detail in the booking process made our trip stress-free, allowing us to focus on creating lasting memories together.</p>
                                                        </div>
                                                        <div className="card-top pt-40 border-0 mb-0">
                                                            <div className="card-author">
                                                                <div className="card-image"><img src="/assets/imgs/testimonials/testimonials-1/author-1.png" alt="Book my fleet" /></div>
                                                                <div className="card-info">
                                                                    <p className="text-lg-bold neutral-1000">Sophia Moore</p>
                                                                    <p className="text-md-regular neutral-1000">New York</p>
                                                                </div>
                                                            </div>
                                                            <div className="card-rate"><img className="background-brand-2 p-1" src="/assets/imgs/template/icons/star-black.svg" alt="Book my fleet" /><img className="background-brand-2 p-1" src="/assets/imgs/template/icons/star-black.svg" alt="Book my fleet" /><img className="background-brand-2 p-1" src="/assets/imgs/template/icons/star-black.svg" alt="Book my fleet" /><img className="background-brand-2 p-1" src="/assets/imgs/template/icons/star-black.svg" alt="Book my fleet" /><img className="background-brand-2 p-1" src="/assets/imgs/template/icons/star-black.svg" alt="Book my fleet" /></div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide className="swiper-slide">
                                                    <div className="card-testimonial background-card">
                                                        <div className="card-info">
                                                            <p className="text-xl-bold card-title neutral-1000">Mobile-Friendly and Fast!</p>
                                                            <p className="text-md-regular neutral-500">Embarking on our dream vacation was made a breeze through the seamless coordination of items and hotels using this exceptional booking platform.</p>
                                                        </div>
                                                        <div className="card-top pt-40 border-0 mb-0">
                                                            <div className="card-author">
                                                                <div className="card-image"><img src="/assets/imgs/testimonials/testimonials-1/author-2.png" alt="Book my fleet" /></div>
                                                                <div className="card-info">
                                                                    <p className="text-lg-bold neutral-1000">Atend John</p>
                                                                    <p className="text-md-regular neutral-1000">Paris</p>
                                                                </div>
                                                            </div>
                                                            <div className="card-rate"><img className="background-brand-2 p-1" src="/assets/imgs/template/icons/star-black.svg" alt="Book my fleet" /><img className="background-brand-2 p-1" src="/assets/imgs/template/icons/star-black.svg" alt="Book my fleet" /><img className="background-brand-2 p-1" src="/assets/imgs/template/icons/star-black.svg" alt="Book my fleet" /><img className="background-brand-2 p-1" src="/assets/imgs/template/icons/star-black.svg" alt="Book my fleet" /><img className="background-brand-2 p-1" src="/assets/imgs/template/icons/star-black.svg" alt="Book my fleet" /></div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide className="swiper-slide">
                                                    <div className="card-testimonial background-card">
                                                        <div className="card-info">
                                                            <p className="text-xl-bold card-title neutral-1000">Excellent Customer Service</p>
                                                            <p className="text-md-regular neutral-500">The overall process was not just efficient but also enriching, as the platform's intuitive design and user-friendly interface made every step enjoyable.</p>
                                                        </div>
                                                        <div className="card-top pt-40 border-0 mb-0">
                                                            <div className="card-author">
                                                                <div className="card-image"><img src="/assets/imgs/testimonials/testimonials-1/author-3.png" alt="Book my fleet" /></div>
                                                                <div className="card-info">
                                                                    <p className="text-lg-bold neutral-1000">Sara Mohamed</p>
                                                                    <p className="text-md-regular neutral-1000">Jakatar</p>
                                                                </div>
                                                            </div>
                                                            <div className="card-rate"><img className="background-brand-2 p-1" src="/assets/imgs/template/icons/star-black.svg" alt="Book my fleet" /><img className="background-brand-2 p-1" src="/assets/imgs/template/icons/star-black.svg" alt="Book my fleet" /><img className="background-brand-2 p-1" src="/assets/imgs/template/icons/star-black.svg" alt="Book my fleet" /><img className="background-brand-2 p-1" src="/assets/imgs/template/icons/star-black.svg" alt="Book my fleet" /><img className="background-brand-2 p-1" src="/assets/imgs/template/icons/star-black.svg" alt="Book my fleet" /></div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                                <SwiperSlide className="swiper-slide">
                                                    <div className="card-testimonial background-card">
                                                        <div className="card-info">
                                                            <p className="text-xl-bold card-title neutral-1000">Highly Flexible and Customizable</p>
                                                            <p className="text-md-regular neutral-500">The attention to detail in the booking process made our trip stress-free, allowing us to focus on creating lasting memories together.</p>
                                                        </div>
                                                        <div className="card-top pt-40 border-0 mb-0">
                                                            <div className="card-author">
                                                                <div className="card-image"><img src="/assets/imgs/testimonials/testimonials-1/author-1.png" alt="Book my fleet" /></div>
                                                                <div className="card-info">
                                                                    <p className="text-lg-bold neutral-1000">Sara Mohamed</p>
                                                                    <p className="text-md-regular neutral-1000">Jakatar</p>
                                                                </div>
                                                            </div>
                                                            <div className="card-rate"><img className="background-brand-2 p-1" src="/assets/imgs/template/icons/star-black.svg" alt="Book my fleet" /><img className="background-brand-2 p-1" src="/assets/imgs/template/icons/star-black.svg" alt="Book my fleet" /><img className="background-brand-2 p-1" src="/assets/imgs/template/icons/star-black.svg" alt="Book my fleet" /><img className="background-brand-2 p-1" src="/assets/imgs/template/icons/star-black.svg" alt="Book my fleet" /><img className="background-brand-2 p-1" src="/assets/imgs/template/icons/star-black.svg" alt="Book my fleet" /></div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            </div>
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* faqs 1 */}
                    <section className="section-box box-faqs background-body pt-0">
                        <div className="box-faqs-inner">
                            <div className="container">
                                <div className="text-center">
                                    <span className="text-sm-bold bg-2 p-3 rounded-12">Our Support</span>
                                    <h3 className="mt-4 neutral-1000">Frequently Asked Questions</h3>
                                </div>
                                <div className="block-faqs">
                                    <div className="accordion" id="accordionFAQ">
                                        <div className="accordion-item wow fadeInUp border-bottom-0">
                                            <h5 className="accordion-header" id="headingOne" onClick={() => handleAccordion(1)}>
                                                <button className={`accordion-button text-heading-5 ${isAccordion === 1 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    <h3>01</h3>
                                                    <p>How do I make a reservation on your website</p>
                                                </button>
                                            </h5>
                                            <div className={`accordion-collapse collapse ${isAccordion == 1 ? 'show' : ''} `} id="collapseOne" aria-labelledby="headingOne" data-bs-parent="#accordionFAQ">
                                                <div className="accordion-body">Provide a step-by-step guide on how users can browse and book travel services on your platform. Include information on searching for destinations, selecting dates, choosing accommodation, and completing the booking process. Mention any special features or tools that can help users find the best deals.</div>
                                            </div>
                                        </div>
                                        <div className="accordion-item wow fadeInUp border-bottom-0">
                                            <h5 className="accordion-header" id="headingTwo" onClick={() => handleAccordion(2)}>
                                                <button className={`accordion-button text-heading-5 ${isAccordion === 2 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    <h3>02</h3>
                                                    <p>What documents do I need for my trip, and how do I obtain them?</p>
                                                </button>
                                            </h5>
                                            <div className={`accordion-collapse collapse ${isAccordion == 2 ? 'show' : ''} `} id="collapseTwo" aria-labelledby="headingTwo" data-bs-parent="#accordionFAQ">
                                                <div className="accordion-body">Provide a step-by-step guide on how users can browse and book travel services on your platform. Include information on searching for destinations, selecting dates, choosing accommodation, and completing the booking process. Mention any special features or tools that can help users find the best deals.</div>
                                            </div>
                                        </div>
                                        <div className="accordion-item wow fadeInUp border-bottom-0">
                                            <h5 className="accordion-header" id="headingThree" onClick={() => handleAccordion(3)}>
                                                <button className={`accordion-button text-heading-5 ${isAccordion === 3 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    <h3>03</h3>
                                                    <p>In the event that I need to modify or cancel my reservation, what are the policies in place?</p>
                                                </button>
                                            </h5>
                                            <div className={`accordion-collapse collapse ${isAccordion == 3 ? 'show' : ''} `} id="collapseThree" aria-labelledby="headingThree" data-bs-parent="#accordionFAQ">
                                                <div className="accordion-body">Provide a step-by-step guide on how users can browse and book travel services on your platform. Include information on searching for destinations, selecting dates, choosing accommodation, and completing the booking process. Mention any special features or tools that can help users find the best deals.</div>
                                            </div>
                                        </div>
                                        <div className="accordion-item wow fadeInUp border-bottom-0">
                                            <h5 className="accordion-header" id="headingFour" onClick={() => handleAccordion(4)}>
                                                <button className={`accordion-button text-heading-5 ${isAccordion === 4 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                    <h3>04</h3>
                                                    <p>Can you specify the types of credit/debit cards, digital wallets, or other online payment methods accepted?</p>
                                                </button>
                                            </h5>
                                            <div className={`accordion-collapse collapse ${isAccordion == 4 ? 'show' : ''} `} id="collapseFour" aria-labelledby="headingFour" data-bs-parent="#accordionFAQ">
                                                <div className="accordion-body">Provide a step-by-step guide on how users can browse and book travel services on your platform. Include information on searching for destinations, selecting dates, choosing accommodation, and completing the booking process. Mention any special features or tools that can help users find the best deals.</div>
                                            </div>
                                        </div>
                                        <div className="accordion-item wow fadeInUp border-bottom-0">
                                            <h5 className="accordion-header" id="headingFive" onClick={() => handleAccordion(5)}>
                                                <button className={`accordion-button text-heading-5 ${isAccordion === 5 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                    <h3>05</h3>
                                                    <p>What are the working hours, and what can I expect in terms of response times?</p>
                                                </button>
                                            </h5>
                                            <div className={`accordion-collapse collapse ${isAccordion == 5 ? 'show' : ''} `} id="collapseFive" aria-labelledby="headingFive" data-bs-parent="#accordionFAQ">
                                                <div className="accordion-body">Provide a step-by-step guide on how users can browse and book travel services on your platform. Include information on searching for destinations, selecting dates, choosing accommodation, and completing the booking process. Mention any special features or tools that can help users find the best deals.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 wow fadeInUp mt-4">
                                        <div className="d-flex justify-content-center gap-2">
                                            <Link className="btn btn-primary mt-2" href="#">
                                                Contact Us
                                                <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </Link>
                                            <Link className="btn btn-primary bg-transparent mt-2 invert" href="#">
                                                Help Center
                                                <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* blog-1 */}
                    <section className="section-box box-news background-body">
                        <div className="container">
                            <div className="row align-items-end">
                                <div className="col-md-9 mb-30 wow fadeInUp">
                                    <h3 className="title-svg neutral-1000 mb-15">Upcoming Cars &amp; Events</h3>
                                    <p className="text-lg-medium text-bold neutral-500">Stay ahead with the latest car releases and upcoming events</p>
                                </div>
                                <div className="col-md-3 position-relative mb-30 wow fadeInUp">
                                    <div className="box-button-slider box-button-slider-team justify-content-end">
                                        <div className="swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-2" tabIndex={0} role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-f147def6ba09c37a">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                                <path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="swiper-button-next swiper-button-next-style-1 swiper-button-next-2" tabIndex={0} role="button" aria-label="Next slide" aria-controls="swiper-wrapper-f147def6ba09c37a">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                                <path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-list-news wow fadeInUp mt-5">
                                <div className="box-swiper">
                                    <Swiper {...swiperGroup3} className="swiper-container swiper-group-3">
                                        <div className="swiper-wrapper">
                                            <SwiperSlide className="swiper-slide pt-2">
                                                <div className="card-news background-card hover-up">
                                                    <div className="card-image">
                                                        <Link href="/blog-details">
                                                            <img src="/assets/imgs/blog/blog-1/img-1.png" alt="Book my fleet" />
                                                        </Link>
                                                    </div>
                                                    <div className="card-info">
                                                        <Link className="bg-2 rounded-12 position-absolute top-0 end-0 translate-middle-y px-3 py-2 me-4 text-sm-bold" href="/blog-grid">News</Link>
                                                        <div className="card-meta"><span className="post-date neutral-1000">18 Sep 2024</span><span className="post-time neutral-1000">6 mins</span><span className="post-comment neutral-1000">38 comments</span></div>
                                                        <div className="card-title"><Link className="text-xl-bold neutral-1000" href="/blog-details">2025 Cadillac Escalade costs more money </Link></div>
                                                        <div className="card-program">
                                                            <div className="endtime">
                                                                <div className="card-author">
                                                                    <img src="/assets/imgs/blog/blog-1/avatar-1.png" alt="Book my fleet" />
                                                                    <p className="text-sm-bold neutral-1000">Jimmy Dave</p>
                                                                </div>
                                                                <div className="card-button"><Link className="btn btn-gray" href="/blog-details">Keep Reading</Link></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="swiper-slide pt-2">
                                                <div className="card-news background-card hover-up">
                                                    <div className="card-image">
                                                        <Link href="/blog-details">
                                                            <img src="/assets/imgs/blog/blog-1/img-2.png" alt="Book my fleet" />
                                                        </Link>
                                                    </div>
                                                    <div className="card-info">
                                                        <Link className="bg-2 rounded-12 position-absolute top-0 end-0 translate-middle-y px-3 py-2 me-4 text-sm-bold" href="/blog-grid">Trend</Link>
                                                        <div className="card-meta"><span className="post-date neutral-1000">18 Sep 2024</span><span className="post-time neutral-1000">6 mins</span><span className="post-comment neutral-1000">38 comments</span></div>
                                                        <div className="card-title"><Link className="text-xl-bold neutral-1000" href="/blog-details">2025 BMW 5 Series Review: A balanced luxury sedan</Link></div>
                                                        <div className="card-program">
                                                            <div className="endtime">
                                                                <div className="card-author">
                                                                    <img src="/assets/imgs/blog/blog-1/avatar-2.png" alt="Book my fleet" />
                                                                    <p className="text-sm-bold neutral-1000">Steven Job</p>
                                                                </div>
                                                                <div className="card-button"><Link className="btn btn-gray" href="/blog-details">Keep Reading</Link></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="swiper-slide pt-2">
                                                <div className="card-news background-card hover-up">
                                                    <div className="card-image">
                                                        <Link href="/blog-details">
                                                            <img src="/assets/imgs/blog/blog-1/img-3.png" alt="Book my fleet" />
                                                        </Link>
                                                    </div>
                                                    <div className="card-info">
                                                        <Link className="bg-2 rounded-12 position-absolute top-0 end-0 translate-middle-y px-3 py-2 me-4 text-sm-bold" href="/blog-grid">Discovery</Link>
                                                        <div className="card-meta"><span className="post-date neutral-1000">18 Sep 2024</span><span className="post-time neutral-1000">6 mins</span><span className="post-comment neutral-1000">38 comments</span></div>
                                                        <div className="card-title"><Link className="text-xl-bold neutral-1000" href="/blog-details">2025 Ruf Rodeo is ready to wrangle some rough roads</Link></div>
                                                        <div className="card-program">
                                                            <div className="endtime">
                                                                <div className="card-author">
                                                                    <img src="/assets/imgs/blog/blog-1/avatar-3.png" alt="Book my fleet" />
                                                                    <p className="text-sm-bold neutral-1000">David Jame</p>
                                                                </div>
                                                                <div className="card-button"><Link className="btn btn-gray" href="/blog-details">Keep Reading</Link></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="swiper-slide pt-2">
                                                <div className="card-news background-card hover-up">
                                                    <div className="card-image">
                                                        <Link href="/blog-details">
                                                            <img src="/assets/imgs/blog/blog-1/img-2.png" alt="Book my fleet" />
                                                        </Link>
                                                    </div>
                                                    <div className="card-info">
                                                        <Link className="bg-2 rounded-12 position-absolute top-0 end-0 translate-middle-y px-3 py-2 me-4 text-sm-bold" href="/blog-grid">Trend</Link>
                                                        <div className="card-meta"><span className="post-date neutral-1000">18 Sep 2024</span><span className="post-time neutral-1000">6 mins</span><span className="post-comment neutral-1000">38 comments</span></div>
                                                        <div className="card-title"><Link className="text-xl-bold neutral-1000" href="/blog-details">2025 BMW 5 Series Review: A balanced luxury sedan</Link></div>
                                                        <div className="card-program">
                                                            <div className="endtime">
                                                                <div className="card-author">
                                                                    <img src="/assets/imgs/blog/blog-1/avatar-2.png" alt="Book my fleet" />
                                                                    <p className="text-sm-bold neutral-1000">Steven Job</p>
                                                                </div>
                                                                <div className="card-button"><Link className="btn btn-gray" href="/blog-details">Keep Reading</Link></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        </div>
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </section>
                    <ModalVideo channel='youtube' isOpen={isOpen} videoId="JXMWOmuR1hU" onClose={() => setOpen(false)} />
                </div>

            </Layout>
        </>
    )
}