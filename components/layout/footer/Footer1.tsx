import Image from 'next/image'
import Link from 'next/link'

export default function Footer1() {
	return (
		<>
			<footer className="footer">
				<div className="container">
					<div className="footer-top">
						<div className="row align-items-center">
							<div className="col-lg-5 col-md-6 text-center text-md-start">
								<h5 className="color-white wow fadeInDown">Subscribe to see time based deals price drops the moment you
									sign up!</h5>
							</div>
							<div className="col-lg-7 col-md-6 text-center text-md-end mt-md-0 mt-4">
								<div className="d-flex align-items-center justify-content-center justify-content-md-end">
									<form className="form-newsletter wow fadeInUp" action="#">
										<input className="form-control" type="text" placeholder="Enter your email" />
										<input className="btn btn-brand-2" type="submit" defaultValue="Subscribe" />
									</form>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-3 col-sm-12 footer-1">
							<div className="mt-20 mb-20">
								<Link className="d-flex" href="/">
								<Image
									src="/assets/imgs/template/lg-white.png"
									width={200}
									height={50}
									alt='logo'
									/>
								</Link>
								<div className="box-info-contact mt-0">
									<p className="text-md neutral-400 icon-address">Akkaraipattu, Sri Lanka</p>
									<p className="text-md neutral-400 icon-worktime">Hours: 8:00 - 17:00</p>
									<p className="text-md neutral-400 icon-email">contact@bookmyfleet.com</p>
								</div>
								<div className="box-need-help">
									<p className="need-help text-md-medium mb-5">Need help? Call us</p>
									<br /><Link className="heading-6 phone-support" href="/tel:+1 222-555-33-99">+9475 220 3374</Link>
									<br /><Link className="heading-6 phone-support" href="/tel:+1 222-555-33-99">+9475 220 3374</Link>
								</div>
							</div>
						</div>
						<div className="col-md-2 col-xs-6 footer-3">
							<h6 className="text-linear-3">Company</h6>
							<ul className="menu-footer">
								<li><Link href="#">About Us</Link></li>
								<li><Link href="#">Terms of Use</Link></li>
								<li><Link href="#">Privacy Notice</Link></li>
								<li><Link href="#">Vendor &amp; Client</Link></li>
							</ul>
						</div>
						<div className="col-md-2 col-xs-6 footer-2">
							<h6 className="text-linear-3">Fleet Category</h6>
							<ul className="menu-footer">
								<li><Link href="#">SUV</Link></li>
								<li><Link href="#">Sedan</Link></li>
								<li><Link href="#">Hatchback</Link></li>
								<li><Link href="#">Sport</Link></li>
								<li><Link href="#">Minivan</Link></li>
								<li><Link href="#">Mini</Link></li>
								<li><Link href="#">Pickup</Link></li>
							</ul>
						</div>
						<div className="col-md-3 col-xs-6 footer-5">
							<h6 className="text-linear-3">Support</h6>
							<ul className="menu-footer">
								<li><Link href="#">Forum support</Link></li>
								<li><Link href="#">Help Center</Link></li>
								<li><Link href="#">List your Vehicle</Link></li>
								<li><Link href="#">How it works</Link></li>
								<li><Link href="#">Security</Link></li>
								<li><Link href="#">Refund Policy</Link></li>
							</ul>
						</div>
					</div>
					<div className="footer-bottom mt-50">
						<div className="row align-items-center justify-content-center">
							<div className="col-md-6 text-md-start text-center mb-20">
								<p className="text-sm color-white">© {new Date().getFullYear()} Book My Fleet Pvt Ltd. All rights reserved.</p>
							</div>
							<div className="col-md-6 text-md-end text-center mb-20">
								<div className="d-flex align-items-center justify-content-center justify-content-md-end">
									<p className="text-lg-bold neutral-0 d-inline-block mr-10">Follow us</p>
									<div className="box-socials-footer d-inline-block">
										<Link className="icon-socials icon-instagram" href="#">
											<svg xmlns="http://www.w3.org/2000/svg" width={21} height={20} viewBox="0 0 21 20" fill="none">
												<path d="M13.9146 1.6665H6.93127C3.89793 1.6665 2.0896 3.47484 2.0896 6.50817V13.4832C2.0896 16.5248 3.89793 18.3332 6.93127 18.3332H13.9063C16.9396 18.3332 18.7479 16.5248 18.7479 13.4915V6.50817C18.7563 3.47484 16.9479 1.6665 13.9146 1.6665ZM10.4229 13.2332C8.6396 13.2332 7.1896 11.7832 7.1896 9.99984C7.1896 8.2165 8.6396 6.7665 10.4229 6.7665C12.2063 6.7665 13.6563 8.2165 13.6563 9.99984C13.6563 11.7832 12.2063 13.2332 10.4229 13.2332ZM15.3563 5.73317C15.3146 5.83317 15.2563 5.92484 15.1813 6.00817C15.0979 6.08317 15.0063 6.1415 14.9063 6.18317C14.8063 6.22484 14.6979 6.24984 14.5896 6.24984C14.3646 6.24984 14.1563 6.1665 13.9979 6.00817C13.9229 5.92484 13.8646 5.83317 13.8229 5.73317C13.7813 5.63317 13.7563 5.52484 13.7563 5.4165C13.7563 5.30817 13.7813 5.19984 13.8229 5.09984C13.8646 4.9915 13.9229 4.90817 13.9979 4.82484C14.1896 4.63317 14.4813 4.5415 14.7479 4.59984C14.8063 4.60817 14.8563 4.62484 14.9063 4.64984C14.9563 4.6665 15.0063 4.6915 15.0563 4.72484C15.0979 4.74984 15.1396 4.7915 15.1813 4.82484C15.2563 4.90817 15.3146 4.9915 15.3563 5.09984C15.3979 5.19984 15.4229 5.30817 15.4229 5.4165C15.4229 5.52484 15.3979 5.63317 15.3563 5.73317Z" fill="white" />
											</svg>
										</Link>
										<Link className="icon-socials icon-facebook" href="#">
											<svg xmlns="http://www.w3.org/2000/svg" width={21} height={20} viewBox="0 0 21 20" fill="none">
												<path d="M18.7563 13.4915C18.7563 16.5248 16.9479 18.3332 13.9146 18.3332H12.9229C12.4646 18.3332 12.0896 17.9582 12.0896 17.4998V12.6915C12.0896 12.4665 12.2729 12.2748 12.4979 12.2748L13.9646 12.2498C14.0813 12.2415 14.1813 12.1582 14.2063 12.0415L14.4979 10.4498C14.5229 10.2998 14.4063 10.1582 14.2479 10.1582L12.4729 10.1832C12.2396 10.1832 12.0563 9.99985 12.0479 9.77485L12.0146 7.73317C12.0146 7.59984 12.1229 7.48318 12.2646 7.48318L14.2646 7.44984C14.4063 7.44984 14.5146 7.34152 14.5146 7.19985L14.4813 5.19983C14.4813 5.05816 14.3729 4.94984 14.2313 4.94984L11.9813 4.98318C10.5979 5.00818 9.49794 6.1415 9.52294 7.52484L9.5646 9.8165C9.57293 10.0498 9.38961 10.2332 9.15628 10.2415L8.15627 10.2582C8.0146 10.2582 7.90628 10.3665 7.90628 10.5082L7.93127 12.0915C7.93127 12.2332 8.0396 12.3415 8.18126 12.3415L9.18127 12.3248C9.41461 12.3248 9.59792 12.5082 9.60626 12.7332L9.68125 17.4832C9.68959 17.9498 9.31459 18.3332 8.84792 18.3332H6.93126C3.89793 18.3332 2.0896 16.5248 2.0896 13.4832V6.50817C2.0896 3.47484 3.89793 1.6665 6.93126 1.6665H13.9146C16.9479 1.6665 18.7563 3.47484 18.7563 6.50817V13.4915Z" fill="white" />
											</svg>
										</Link>
										<Link className="icon-socials icon-twitter" href="#">
											<svg xmlns="http://www.w3.org/2000/svg" width={21} height={20} viewBox="0 0 21 20" fill="none">
												<path d="M12.2847 8.46864L19.5701 0H17.8437L11.5178 7.3532L6.46535 0H0.637939L8.27824 11.1193L0.637939 20H2.36443L9.04472 12.2348L14.3805 20H20.2079L12.2843 8.46864H12.2847ZM9.92005 11.2173L9.14593 10.1101L2.98651 1.29967H5.63831L10.609 8.40994L11.3831 9.51718L17.8445 18.7594H15.1927L9.92005 11.2177V11.2173Z" fill="white" />
											</svg>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>

		</>
	)
}
