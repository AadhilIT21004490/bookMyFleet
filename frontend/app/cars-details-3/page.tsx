'use client'
import MyDatePicker from '@/components/elements/MyDatePicker'
import Layout from "@/components/layout/Layout"
import { ArrowBigRight, ArrowRight, Calendar, Calendar1, Info, LocateIcon, Map, MapPin, PhoneCall, Share, Share2 } from 'lucide-react'
import Link from "next/link"
import { useEffect, useState } from "react"
import Marquee from 'react-fast-marquee'
import ModalVideo from 'react-modal-video'
import Slider from "react-slick"

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: any) => (
	<button
		{...props}
		className={
			"slick-prev slick-arrow" +
			(currentSlide === 0 ? " slick-disabled" : "")
		}
		type="button"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" stroke="" strokeLinecap="round" strokeLinejoin="round"></path></svg>
	</button>
)
const SlickArrowRight = ({ currentSlide, slideCount, ...props }: any) => (
	<button
		{...props}
		className={
			"slick-next slick-arrow" +
			(currentSlide === slideCount - 1 ? " slick-disabled" : "")
		}
		type="button"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" stroke="" strokeLinecap="round" strokeLinejoin="round"> </path></svg>
	</button>
)

const carImages = [
	{ banner: "/assets/imgs/cars-details/banner.png", thumbnail: "/assets/imgs/cars-details/banner.png", alt: "Book my fleet" },
	{ banner: "/assets/imgs/cars-details/banner2.png", thumbnail: "/assets/imgs/cars-details/banner2.png", alt: "Book my fleet" },
	{ banner: "/assets/imgs/cars-details/banner3.png", thumbnail: "/assets/imgs/cars-details/banner3.png", alt: "Book my fleet" },
	{ banner: "/assets/imgs/cars-details/banner4.png", thumbnail: "/assets/imgs/cars-details/banner4.png", alt: "Book my fleet" },
	{ banner: "/assets/imgs/cars-details/banner5.png", thumbnail: "/assets/imgs/cars-details/banner5.png", alt: "Book my fleet" },
	{ banner: "/assets/imgs/cars-details/banner5.png", thumbnail: "/assets/imgs/cars-details/banner5.png", alt: "Book my fleet" },
	{ banner: "/assets/imgs/cars-details/banner.png", thumbnail: "/assets/imgs/cars-details/banner.png", alt: "Book my fleet" },
	{ banner: "/assets/imgs/cars-details/banner3.png", thumbnail: "/assets/imgs/cars-details/banner3.png", alt: "Book my fleet" },
]
export default function CarsDetails3() {
	const [isOpen, setOpen] = useState(false)
	const [nav1, setNav1] = useState(null)
	const [nav2, setNav2] = useState(null)
	const [slider1, setSlider1] = useState(null)
	const [slider2, setSlider2] = useState(null)

	const [showContact, setShowContact] = useState(false);
	const [termsChecked, setTermsChecked] = useState(false);

	// Contact details
	const mobileNumber = "+94756685974";

	// Mask contact number when not shown fully
	const maskNumber = (num: string) => {
		// Example: +9475 668 5974 => +9475 xxx xxxx
		return (
			num.slice(0, 5) +
			" xxx xxxx"
		);
	};

	useEffect(() => {
		setNav1(slider1)
		setNav2(slider2)
	}, [slider2, slider1])

	const settingsMain = {
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: false,
		prevArrow: <SlickArrowLeft />,
		nextArrow: <SlickArrowRight />,
		asNavFor: nav2,
	}

	const settingsThumbs = {
		slidesToShow: 6,
		slidesToScroll: 1,
		asNavFor: nav1,
		dots: false,
		focusOnSelect: true,
		vertical: false,
		responsive: [
			{ breakpoint: 1200, settings: { slidesToShow: 5 } },
			{ breakpoint: 1024, settings: { slidesToShow: 4 } },
			{ breakpoint: 700, settings: { slidesToShow: 3 } },
			{ breakpoint: 480, settings: { slidesToShow: 2 } },
		],
	}
	const [isAccordion, setIsAccordion] = useState(null)

	const handleAccordion = (key: any) => {
		setIsAccordion(prevState => prevState === key ? null : key)
	}


	return (
		<>

			<Layout footerStyle={1}>
				<div>
					<section className="box-section box-breadcrumb background-body">
						<div className="container">
							<ul className="breadcrumbs">
								<li>
									<Link href="/">Home</Link>
									<span className="arrow-right">
										<svg width={7} height={12} viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M1 11L6 6L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</span>
								</li>
								<li>
									<Link href="/destination">Cars</Link>
									<span className="arrow-right">
										<svg width={7} height={12} viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M1 11L6 6L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</span>
								</li>
								<li><span className="text-breadcrumb">Hyundai Accent 2025 </span></li>
							</ul>
						</div>
					</section>
					<section className="box-section box-content-tour-detail background-body pt-0">
						<div className="container">
							<div className="tour-header">
								<div className="tour-rate">
									<div className="rate-element">
										<span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span>
									</div>
								</div>
								<div className="row">
									<div className="col-lg-8">
										<div className="tour-title-main">
											<h4 className="neutral-1000">Hyundai Accent 2015</h4>
										</div>
									</div>
								</div>
								<div className="tour-metas">
									<div className="tour-meta-left">
										<p className="text-md-medium neutral-1000 mr-20 tour-location">
											<MapPin size={18} />
											Las Vegas, USA
										</p>
										<p className="text-md-medium neutral-1000 tour-code mr-15">
											<Map size={18} />
											Fleet Code:
										</p>
										<Link className="text-md-medium neutral-1000 mr-20" href="#">LVA-4125</Link>
										<p className="text-md-medium neutral-1000 tour-code mr-15">
											<Calendar size={18} />
											Last Updated on :
										</p>
										<div className="text-md-medium neutral-1000">16/05/2025</div>
									</div>
									<div className="tour-meta-right">
										<Link className="btn btn-share" href="#">
											<Share2 size={18} />
											Share
										</Link>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-8">
									<div className="container-banner-activities">
										<div className="box-banner-activities">
											<Slider
												{...settingsMain}
												asNavFor={nav2 as any}
												ref={(slider) => setSlider1(slider)}
												className="banner-activities-detail"
											>
												{carImages.map((img, i) => (
													<div key={i} className="banner-slide-activity">
														<img src={img.banner} alt={img.alt} />
													</div>
												))}
											</Slider>
										</div>

										<div className="slider-thumnail-activities">
											<Slider
												{...settingsThumbs}
												asNavFor={nav1 as any}
												ref={(slider) => setSlider2(slider)}
												className="slider-nav-thumbnails-activities-detail"
											>
												{carImages.map((img, i) => (
													<div key={i} className="banner-slide">
														<img src={img.thumbnail} alt={img.alt} />
													</div>
												))}
											</Slider>
										</div>
									</div>
									<div className="box-feature-car">
										<div className="list-feature-car align-items-start">
											<div className="item-feature-car w-md-25">
												<div className="item-feature-car-inner">
													<div className="feature-image"><img src="/assets/imgs/page/car/km.svg" alt="Book my fleet" /></div>
													<div className="feature-info">
														<p className="text-md-medium neutral-1000">150 Km/Day</p>
													</div>
												</div>
											</div>
											<div className="item-feature-car w-md-25">
												<div className="item-feature-car-inner">
													<div className="feature-image"><img src="/assets/imgs/page/car/diesel.svg" alt="Book my fleet" /></div>
													<div className="feature-info">
														<p className="text-md-medium neutral-1000">Diesel</p>
													</div>
												</div>
											</div>
											<div className="item-feature-car w-md-25">
												<div className="item-feature-car-inner">
													<div className="feature-image"><img src="/assets/imgs/page/car/auto.svg" alt="Book my fleet" /></div>
													<div className="feature-info">
														<p className="text-md-medium neutral-1000">Automatic</p>
													</div>
												</div>
											</div>
											<div className="item-feature-car w-md-25">
												<div className="item-feature-car-inner">
													<div className="feature-image"><img src="/assets/imgs/page/car/seat.svg" alt="Book my fleet" /></div>
													<div className="feature-info">
														<p className="text-md-medium neutral-1000">7 seats</p>
													</div>
												</div>
											</div>
											<div className="item-feature-car w-md-25">
												<div className="item-feature-car-inner">
													<div className="feature-image"><img src="/assets/imgs/page/car/bag.svg" alt="Book my fleet" /></div>
													<div className="feature-info">
														<p className="text-md-medium neutral-1000">3 Large bags</p>
													</div>
												</div>
											</div>
											<div className="item-feature-car w-md-25">
												<div className="item-feature-car-inner">
													<div className="feature-image"><img src="/assets/imgs/page/car/suv.svg" alt="Book my fleet" /></div>
													<div className="feature-info">
														<p className="text-md-medium neutral-1000">SUVs</p>
													</div>
												</div>
											</div>
											<div className="item-feature-car w-md-25">
												<div className="item-feature-car-inner">
													<div className="feature-image"><img src="/assets/imgs/page/car/door.svg" alt="Book my fleet" /></div>
													<div className="feature-info">
														<p className="text-md-medium neutral-1000">4 Doors</p>
													</div>
												</div>
											</div>
											<div className="item-feature-car w-md-25">
												<div className="item-feature-car-inner">
													<div className="feature-image"><Calendar1 size={22} /></div>
													<div className="feature-info">
														<p className="text-md-medium neutral-1000">2018 Model</p>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="box-collapse-expand">
										<div className="group-collapse-expand">
											<button className={isAccordion == 1 ? "btn btn-collapse collapsed" : "btn btn-collapse"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOverview" aria-expanded="false" aria-controls="collapseOverview" onClick={() => handleAccordion(1)}>
												<h6>Overview</h6>
												<svg width={12} height={7} viewBox="0 0 12 7" xmlns="http://www.w3.org/2000/svg">
													<path d="M1 1L6 6L11 1" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
												</svg>
											</button>
											<div className={isAccordion == 1 ? "collapse" : "collapse show"} id="collapseOverview">
												<div className="card card-body">
													<p>Elevate your Las Vegas experience to new heights with a journey aboard The High Roller at The LINQ. As the tallest observation wheel in the world, standing at an impressive 550 feet tall, The High Roller offers a bird's-eye perspective of the iconic Las Vegas Strip and its surrounding desert landscape. From the moment you step into one of the spacious cabins, you'll be transported on a mesmerizing adventure, where every turn offers a new and breathtaking vista of the vibrant city below.</p>
													<p>Whether you're a first-time visitor or a seasoned Las Vegas aficionado, The High Roller promises an unparalleled experience that will leave you in awe. With its climate-controlled cabins and immersive audio commentary, this attraction provides a unique opportunity to see Las Vegas from a whole new perspective, while learning about its rich history and famous landmarks along the way.</p>
												</div>
											</div>
										</div>
										<div className="group-collapse-expand">
											<button className={isAccordion == 2 ? "btn btn-collapse collapsed" : "btn btn-collapse"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseItinerary" aria-expanded="false" aria-controls="collapseItinerary" onClick={() => handleAccordion(2)}>
												<h6>Included in the price</h6>
												<svg width={12} height={7} viewBox="0 0 12 7" xmlns="http://www.w3.org/2000/svg">
													<path d="M1 1L6 6L11 1" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
												</svg>
											</button>
											<div className={isAccordion == 2 ? "collapse" : "collapse show"} id="collapseItinerary">
												<div className="card card-body">
													<ul className="list-checked-green">
														<li>Valid Renvenue License  and Insurance</li>
														<li>Spare Wheel</li>
														<li>Puncher Kit</li>
														<li>Jack</li>
														<li>Emergancy ToolKit</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="group-collapse-expand">
											<button className={isAccordion == 3 ? "btn btn-collapse collapsed" : "btn btn-collapse"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseItinerary2" aria-expanded="false" aria-controls="collapseItinerary2" onClick={() => handleAccordion(3)}>
												<h6>Amenities</h6>
												<svg width={12} height={7} viewBox="0 0 12 7" xmlns="http://www.w3.org/2000/svg">
													<path d="M1 1L6 6L11 1" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
												</svg>
											</button>
											<div className={isAccordion == 3 ? "collapse" : "collapse show"} id="collapseItinerary2">
												<div className="card card-body">
													<ul className="list-checked-green">
														<li>7 Seater</li>
														<li>Sun Roof</li>
														<li>Dual A/C</li>
														<li>4x4 Drive</li>
														<li>Auto Park</li>
													</ul>
												</div>
											</div>
										</div>



									</div>
								</div>
								<div className="col-lg-4">
									<div className="sidebar-banner">
										<div className="bg-primary text-black py-2 text-center rounded mb-3 fw-bold">
											RENTAL FARE LIST
										</div>
										<table className="table table-borderless text-center my-4">
											<thead>
												<tr>
													<th></th>
													<th className="text-start text-md">Per Day Rate</th>
													<th>Total</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<th className="text-start text-md">For 1 week</th>
													<td>11,500/=</td>
													<td>80,500/=</td>
												</tr>
												<tr>
													<th className="text-start text-md">For 2 weeks</th>
													<td>10,600/=</td>
													<td>148,400/=</td>
												</tr>
												<tr>
													<th className="text-start text-md">For 3 weeks</th>
													<td>9,200/=</td>
													<td>193,200/=</td>
												</tr>
												<tr>
													<th className="text-start text-md">For 1 month</th>
													<td>8,900/=</td>
													<td>
														267,000/=
														<div className="text-muted small">PER MONTH RATE</div>
													</td>
												</tr>
												<tr>
													<th className="text-start text-md text-md">For 3 months</th>
													<td>7,900/=</td>
													<td>
														237,000/=
														<div className="text-muted small">PER MONTH RATE</div>
													</td>
												</tr>
												<tr>
													<th className="text-start text-md">For 6 months &amp; Over</th>
													<td>7,700/=</td>
													<td>
														231,000/=
														<div className="text-muted small">PER MONTH RATE</div>
													</td>
												</tr>
											</tbody>
										</table>



										<div className="d-flex align-items-start">
											<Info size={18} color='blue' className="me-2" />
											<p className="mb-0 fst-italic" style={{ fontSize: "0.9rem" }}>
												Above rentals will be higher for foreigners with extra commitments.
											</p>
										</div>
									</div>
									<div className="booking-form">
										<div className="head-booking-form">
											<p className="text-xl-bold neutral-1000">Read Agreements</p>
										</div>
										<div className="content-booking-form">

											<div className="box-button-book">
												<Link className="btn btn-book" href="#">
													Our Agreement
													<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												</Link>
											</div>
											<div className="box-button-book mt-10">
												<Link className="btn btn-book" href="#">
													Seller Agreement
													<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												</Link>
											</div>
											<div className="box-need-help">
												<Link href="#">
													<svg width={12} height={14} viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M2.83366 3.66667C2.83366 1.92067 4.25433 0.5 6.00033 0.5C7.74633 0.5 9.16699 1.92067 9.16699 3.66667C9.16699 5.41267 7.74633 6.83333 6.00033 6.83333C4.25433 6.83333 2.83366 5.41267 2.83366 3.66667ZM8.00033 7.83333H4.00033C1.88699 7.83333 0.166992 9.55333 0.166992 11.6667C0.166992 12.678 0.988992 13.5 2.00033 13.5H10.0003C11.0117 13.5 11.8337 12.678 11.8337 11.6667C11.8337 9.55333 10.1137 7.83333 8.00033 7.83333Z" fill="currentColor" />
													</svg>
													Need some help?
												</Link>
											</div>
										</div>
									</div>
									<div className="sidebar-left border-1 background-card p-3">
										<h6 className="text-xl-bold neutral-1000 border-bottom pb-2">Listed by</h6>

										<div className="box-sidebar-content">
											<div className="box-agent-support border-bottom pb-3 mb-3 d-flex align-items-center">
												<div className="me-2">
													<img
														src="/assets/imgs/template/icons/car-1.png"
														alt="Book my fleet"
														width={65}
														height={50}
													/>
												</div>
												<div className="card-author-info">
													<p className="text-lg-bold neutral-1000 mb-1">Dilka Rent a car</p>
													<p className="text-sm-medium neutral-500">Akkaraipattu, Eastern Province</p>
												</div>
											</div>

											<div className="box-info-contact mb-3">
												<p className="text-md-medium mobile-phone neutral-1000 mb-1">
													<span className="text-md-bold">Mobile:</span>{" "}
													{showContact ? mobileNumber : maskNumber(mobileNumber)}
												</p>
												<p className="text-md-medium whatsapp neutral-1000 mb-1">
													<span className="text-md-bold">WhatsApp:</span>{" "}
													{showContact ? mobileNumber : maskNumber(mobileNumber)}
												</p>
												<p className="text-md-medium email neutral-1000">
													<span className="text-md-bold">Email:</span> dilka@gmail.com
												</p>
											</div>

											<div className="box-link-bottom d-grid gap-2">
												<button
													className="btn btn-primary py-3 w-100 rounded-3"
													onClick={() => setShowContact(true)}
												>
													Book this vehicle{" "}
													<ArrowRight size={20}/>
												</button>
												<Link
													href="#"
													className="btn btn-primary py-3 mt-2 w-100 rounded-3 d-flex justify-content-center align-items-center"
												>
													See all vehicles of Dilka rent a car{" "}
													<ArrowRight size={20}/>
												</Link>
											</div>
										</div>
									</div>

								</div>
							</div>
						</div>
						<div className="background-100 pt-55 pb-55 mt-100">
							<div className="container">
								<Marquee direction='left' pauseOnHover={true} className="carouselTicker carouselTicker-left box-list-brand-car justify-content-center  wow fadeIn">
									<ul className="carouselTicker__list">
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img className="light-mode" src="/assets/imgs/page/homepage2/lexus.png" alt="Book my fleet" />
												<img className="dark-mode" src="/assets/imgs/page/homepage2/lexus-w.png" alt="Book my fleet" />
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img className="light-mode" src="/assets/imgs/page/homepage2/mer.png" alt="Book my fleet" />
												<img className="dark-mode" src="/assets/imgs/page/homepage2/mer-w.png" alt="Book my fleet" />
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img className="light-mode" src="/assets/imgs/page/homepage2/bugatti.png" alt="Book my fleet" />
												<img className="dark-mode" src="/assets/imgs/page/homepage2/bugatti-w.png" alt="Book my fleet" />
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img className="light-mode" src="/assets/imgs/page/homepage2/jaguar.png" alt="Book my fleet" />
												<img className="dark-mode" src="/assets/imgs/page/homepage2/jaguar-w.png" alt="Book my fleet" />
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img className="light-mode" src="/assets/imgs/page/homepage2/honda.png" alt="Book my fleet" />
												<img className="dark-mode" src="/assets/imgs/page/homepage2/honda-w.png" alt="Book my fleet" />
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img className="light-mode" src="/assets/imgs/page/homepage2/chevrolet.png" alt="Book my fleet" />
												<img className="dark-mode" src="/assets/imgs/page/homepage2/chevrolet-w.png" alt="Book my fleet" />
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img className="light-mode" src="/assets/imgs/page/homepage2/acura.png" alt="Book my fleet" />
												<img className="dark-mode" src="/assets/imgs/page/homepage2/acura-w.png" alt="Book my fleet" />
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img className="light-mode" src="/assets/imgs/page/homepage2/bmw.png" alt="Book my fleet" />
												<img className="dark-mode" src="/assets/imgs/page/homepage2/bmw-w.png" alt="Book my fleet" />
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img className="light-mode" src="/assets/imgs/page/homepage2/toyota.png" alt="Book my fleet" />
												<img className="dark-mode" src="/assets/imgs/page/homepage2/toyota-w.png" alt="Book my fleet" />
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img className="light-mode" src="/assets/imgs/page/homepage2/lexus.png" alt="Book my fleet" />
												<img className="dark-mode" src="/assets/imgs/page/homepage2/lexus-w.png" alt="Book my fleet" />
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img className="light-mode" src="/assets/imgs/page/homepage2/mer.png" alt="Book my fleet" />
												<img className="dark-mode" src="/assets/imgs/page/homepage2/mer-w.png" alt="Book my fleet" />
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img className="light-mode" src="/assets/imgs/page/homepage2/bugatti.png" alt="Book my fleet" />
												<img className="dark-mode" src="/assets/imgs/page/homepage2/bugatti-w.png" alt="Book my fleet" />
											</div>
										</li>
									</ul>
								</Marquee>
							</div>
						</div>

						{/* Popup modal for contact details */}
						{showContact && (
							<div
								className="modal show fade d-block"
								tabIndex={-1}
								role="dialog"
								aria-modal="true"
								aria-labelledby="contactModalLabel"
								style={{
									backgroundColor: "rgba(0,0,0,0.5)",
									backdropFilter: "blur(6px)", // Blur background
									WebkitBackdropFilter: "blur(6px)", // Safari support
								}}
							>
								<div className="modal-dialog modal-dialog-centered" role="document">
									<div className="modal-content p-4">
										<div
											className="mx-auto border rounded-3 card card-body"
											style={{ maxWidth: "600px", textAlign: "center" }}
										>
											Please be advised that from this point forward, it is solely your
											responsibility to inspect the vehicle and verify the credibility of
											the seller prior to confirming the booking. Bookmyfleet.com will
											not be held liable for any losses, damages, or disputes arising
											after this stage of the process.
										</div>

										{/* Terms and Conditions Checkbox */}
										<div className="form-check mt-4 text-start" style={{ maxWidth: "600px", margin: "20px auto" }}>
											<input
												className="form-check-input"
												type="checkbox"
												id="termsCheckbox"
												checked={termsChecked}
												onChange={() => setTermsChecked(!termsChecked)}
											/>
											<label className="form-check-label" style={{textAlign: "center" }} htmlFor="termsCheckbox">
												I confirm that I have read and understood the{" "}
												<Link href="/term" className="text-primary-dark">
													<strong>Terms and Conditions</strong>
												</Link>
												, and I agree to abide by them.
											</label>
										</div>

										{/* WhatsApp Button - enabled only when checkbox is checked */}
										<button
											type="button"
											className="btn btn-primary py-3 w-100 rounded-3 mt-3"
											disabled={!termsChecked}
										>
											<a
												href={`https://wa.me/${mobileNumber.replace(/\D/g, "")}`}
												target="_blank"
												rel="noopener noreferrer"
												className="d-flex align-items-center justify-content-center text-black text-decoration-none"
											>
												<PhoneCall size={20} className="me-2" />
												Book This Vehicle via WhatsApp
											</a>
										</button>

										<button
											type="button"
											onClick={() => setShowContact(false)}
											className="btn btn-secondary py-3 w-100 rounded-3 mt-3"
										>
											Close
										</button>
									</div>
								</div>
							</div>
						)}
					</section>
					<ModalVideo channel='youtube' isOpen={isOpen} videoId="JXMWOmuR1hU" onClose={() => setOpen(false)} />
				</div >

			</Layout >
		</>
	)
}