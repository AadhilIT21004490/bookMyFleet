import CounterUp from '../elements/CounterUp'


export default function Static1() {
	return (
		<>

			<section className="section-static-1 background-body @@classList">
				<div className="container">
					<div className="row">
						<div className="rounded-12 background-3 pt-30 pb-30">
							<div className="wow fadeIn">
								<div className="d-flex align-items-center justify-content-around flex-wrap">
									<div className="mb-4 mb-lg-0 d-block px-lg-5 px-3">
										<div className="d-flex justify-content-center justify-content-md-start">
											<h3 className="count neutral-1000"><CounterUp count={19} /></h3>
											<h3 className="neutral-1000">+</h3>
										</div>
										<div className="text-md-start text-center">
											<p className="text-lg-bold neutral-1000">Island</p>
											<p className="text-lg-bold neutral-1000">Partners</p>
										</div>
									</div>
									<div className="mb-4 mb-lg-0 d-block px-lg-5 px-3">
										<div className="d-flex justify-content-center justify-content-md-start">
											<h3 className="count neutral-1000"><CounterUp count={1200} /></h3>
											{/* <h3 className="neutral-1000">K</h3> */}
										</div>
										<div className="text-md-start text-center">
											<p className="text-lg-bold neutral-1000">Daily</p>
											<p className="text-lg-bold neutral-1000">Site Visitors</p>
										</div>
									</div>
									<div className="mb-4 mb-lg-0 d-block px-lg-5 px-3">
										<div className="d-flex justify-content-center justify-content-md-start">
											<h3 className="count neutral-1000"><CounterUp count={150} /></h3>
											<h3 className="neutral-1000">+</h3>
										</div>
										<div className="text-md-start text-center">
											<p className="text-lg-bold neutral-1000">Best</p>
											<p className="text-lg-bold neutral-1000">Vehicles</p>
										</div>
									</div>
									<div className="mb-4 mb-lg-0 d-block px-lg-5 px-3">
										<div className="d-flex justify-content-center justify-content-md-start">
											<h3 className="count neutral-1000"><CounterUp count={168} /></h3>
											{/* <h3 className="neutral-1000">K</h3> */}
										</div>
										<div className="text-md-start text-center">
											<p className="text-lg-bold neutral-1000">Happy</p>
											<p className="text-lg-bold neutral-1000">Customers</p>
										</div>
									</div>
									<div className="mb-4 mb-lg-0 d-block px-lg-5 px-3">
										<div className="d-flex justify-content-center justify-content-md-start">
											<h3 className="count neutral-1000"><CounterUp count={9} /></h3>
											<h3 className="neutral-1000"></h3>
										</div>
										<div className="text-md-start text-center">
											<p className="text-lg-bold neutral-1000">Provinces</p>
											<p className="text-lg-bold neutral-1000">of Island</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
