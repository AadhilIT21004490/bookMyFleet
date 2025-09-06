'use client'
import CounterUp from '@/components/elements/CounterUp'
import Layout from "@/components/layout/Layout"
import { swiperGroup3, swiperGroupAnimate } from '@/util/swiperOptions'
import { ArrowRight, BadgeCheck, Book, CircleDollarSign, ClockAlert, DoorOpen, DoorOpenIcon, Globe, Handshake, LayoutDashboard, List, MousePointerClick, ShieldCheck, SmilePlus, SquareMousePointer, UserRoundPen, WholeWord } from 'lucide-react'
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
                                <Link href="#" className="neutral-1000 text-md-bold">Registration</Link>
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
                                        Welcome to <strong className='text-primary'>Book My Fleet</strong>, Sri Lanka’s trusted multi-vendor rent-a-car marketplace.
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
                        </div>
                        <div className="container ">
                            <div className="row align-items-center justify-content-center border-top pt-60">
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
                                            <Book className='mb-20' size={55}/>                                           
                                        <div className="card-info">
                                            <h6 className="text-xl-bold neutral-1000 text-start">Read Before You Register</h6>
                                            <p className="text-md-medium neutral-500">Please go through all the steps and requirements outlined on this page to ensure a smooth registration process.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6">
                                    <div className="card-why text-start wow fadeInUp">
                                            <MousePointerClick className='mb-20' size={55}/>                                           
                                        <div className="card-info">
                                            <h6 className="text-xl-bold neutral-1000 text-start">Click on Get Start Now button</h6>
                                            <p className="text-md-medium neutral-500">Once you’re ready, click the <span className='text-black bg-primary p-1 rounded d-inline-block'><strong>Get Started Now<ArrowRight size={15}/></strong></span> button to begin your registration and join our platform.</p>
                                        </div>
                                    </div>
                                </div>
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
                                
                                
                            </div>
                        </div>
                    </section>
                    {/* team 1 */}
                    <section className="section-team-1 py-96 background-body border-top border-bottom">
                        <div className="container">
                            <Link className="btn btn-signin bg-2 text-dark mb-4" href="#">Benefits</Link>
                            <div className="col-md-9 mb-30 wow fadeInUp">
                                    <h3 className="title-svg neutral-1000 mb-15">Benefits of Working With Us</h3>
                                    <p className="text-lg-medium text-bold neutral-500">Partnering with <strong className='text-primary'>Book My Fleet</strong> means more than just listing your vehicles online — it’s about unlocking new opportunities to grow your rental business. We give you the tools, visibility, and support you need to reach more customers, manage your fleet with ease, and maximize your earnings. Whether you’re an individual owner or a full-scale rental company, our platform is designed to make your business more efficient, more profitable, and more trusted.</p>
                                </div>
                            <div className='row'>
                                <div className="col-lg-3 col-sm-6">
									<div className="card-contact border border-primary border border-primary">
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
									<div className="card-contact border border-primary">
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
									<div className="card-contact border border-primary">
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
									<div className="card-contact border border-primary">
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
                                        <h4 className="mb-4 neutral-1000">Payments & Pricing Model.</h4>
                                        <p className="text-lg-medium neutral-500 mb-4">
                                        At <strong className='text-primary'>Book My Fleet</strong>, we keep our pricing straightforward and affordable for every rent-a-car company. Instead of charging high commissions on every booking, we use a flat monthly subscription model so you can enjoy unlimited listings and unlimited bookings with no hidden fees.
                                        </p>
                                        
                                    </div>
                                    <div className="col-lg-6 offset-lg-1 position-relative z-1 mt-lg-0 mt-4">
                                        <div className="row">
                                        <br/><strong>Here’s how it works:</strong>

                                            <div className="col">
                                                <ul className="list-ticks-green list-ticks-green-2">
                                                    <li className="neutral-1000 pe-0">One-time Registration Fee: LKR 2,000 - <span className='text-md-medium neutral-500'>Pay once when you join our platform to set up and verify your account.</span></li>
                                                    <li className="neutral-1000 pe-0">1st Month Free Listing for all vendors - <span className='text-md-medium neutral-500'>Enjoy your first month completely free. List as many vehicles as you like and start receiving bookings</span></li>
                                                    <li className="neutral-1000 pe-0">Monthly Subscription from 2nd Month LKR 5,000 - <span className='text-md-medium neutral-500'>From the second month onwards, pay a flat monthly subscription to keep your vehicles listed and continue receiving unlimited bookings.</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <p className='my-3'>This simple model helps you predict your costs and keep 100% of your earnings from every booking.</p>
                                        <Link className="btn btn-primary mt-2" href="/register">
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
                   
                   
                    <ModalVideo channel='youtube' isOpen={isOpen} videoId="JXMWOmuR1hU" onClose={() => setOpen(false)} />
                </div>

            </Layout>
        </>
    )
}