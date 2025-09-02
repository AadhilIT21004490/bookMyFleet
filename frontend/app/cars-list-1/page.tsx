'use client'
import CarCard1 from '@/components/elements/carcard/CarCard1'
import HeroSearch from '@/components/elements/HeroSearch'
import SortCarsFilter from '@/components/elements/SortCarsFilter'
import ByAmenities from '@/components/Filter/ByAmenities'
import ByCarType from '@/components/Filter/ByCarType'
import ByFuel from '@/components/Filter/ByFuel'
import ByLocation from '@/components/Filter/ByLocation'
import ByPagination from '@/components/Filter/ByPagination'
import ByPrice from '@/components/Filter/ByPrice'
import ByRating from '@/components/Filter/ByRating'
import Layout from "@/components/layout/Layout"
import rawCarsData from "@/util/cars.json"
import useCarFilter from '@/util/useCarFilter'
import Link from "next/link"
import Marquee from 'react-fast-marquee'
import { useState } from "react"

const carsData = rawCarsData.map(car => ({
	...car,
	rating: parseFloat(car.rating as string)
}))

export default function CarsList1() {
	const {
		filter,
		setFilter,
		sortCriteria,
		setSortCriteria,
		itemsPerPage,
		setItemsPerPage,
		currentPage,
		setCurrentPage,
		uniqueNames,
		uniqueFuelTypes,
		uniqueAmenities,
		uniqueLocations,
		uniqueRatings,
		uniqueCarTypes,
		filteredCars,
		sortedCars,
		totalPages,
		startIndex,
		endIndex,
		paginatedCars,
		handleCheckboxChange,
		handleSortChange,
		handlePriceRangeChange,
		handleItemsPerPageChange,
		handlePageChange,
		handlePreviousPage,
		handleNextPage,
		handleClearFilters,
		startItemIndex,
		endItemIndex,
	} = useCarFilter(carsData)
// filter toggle state
	const [showFilters, setShowFilters] = useState(false)
	return (
		<>

			<Layout footerStyle={1}>
			<div>
				

				{/* cars-listing-1 */}
				<section className="section-box pt-50 background-body">
					<div className="container">
						<div className="row align-items-end">
							<div className="col-md-9 mb-30 wow fadeInUp">
								<h4 className="title-svg neutral-1000 mb-15">Our Vehicle Fleet</h4>
								<p className="text-lg-medium text-bold neutral-500">
									Turning dreams into reality with versatile vehicles.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className="box-section block-content-tourlist background-body">
					<div className="container">
						<div className="box-content-main pt-20">
							
							{/* Filters */}
							{showFilters && (
								<div className="content-left order-lg-first mb-4 ">
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">Price Range</h6>
												<ByPrice filter={filter} handlePriceRangeChange={handlePriceRangeChange} />
											</div>
										</div>
									</div>
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">Car type</h6>
												<ByCarType uniqueCarTypes={uniqueCarTypes} filter={filter} handleCheckboxChange={handleCheckboxChange} />
											</div>
										</div>
									</div>
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">Transmission</h6>
												<ByAmenities uniqueAmenities={uniqueAmenities} filter={filter} handleCheckboxChange={handleCheckboxChange} />
											</div>
										</div>
									</div>
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">Fuel Type</h6>
												<ByFuel uniqueFuelTypes={uniqueFuelTypes} filter={filter} handleCheckboxChange={handleCheckboxChange} />
											</div>
										</div>
									</div>
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">Location</h6>
												<ByLocation uniqueLocations={uniqueLocations} filter={filter} handleCheckboxChange={handleCheckboxChange} />
											</div>
										</div>
									</div>
								</div>
							)}

							{/* Car list */}
							<div className="content-right">
								
								
								<div className="box-filters mb-25 pb-5 border-bottom border-1">
									{/* Toggle button */}
									<button 
										className="btn btn-clear text-xs-medium" 
										onClick={() => setShowFilters(!showFilters)}
									>
										{showFilters ? "Hide Vehicle Filters" : "Show Vehicle Filters"}
										
									</button>
									<SortCarsFilter
										sortCriteria={sortCriteria}
										handleSortChange={handleSortChange}
										itemsPerPage={itemsPerPage}
										handleItemsPerPageChange={handleItemsPerPageChange}
										handleClearFilters={handleClearFilters}
										startItemIndex={startItemIndex}
										endItemIndex={endItemIndex}
										sortedCars={sortedCars}
									/>
								</div>
								
								<div className="box-grid-tours wow fadeIn">
									<div className="row">
										{paginatedCars.map((car) => (
											<div className="col-lg-4 col-md-6 wow fadeInUp" key={car.id}>
												<CarCard1 car={car} />
											</div>
										))}
									</div>
								</div>
								<ByPagination
									handlePreviousPage={handlePreviousPage}
									totalPages={totalPages}
									currentPage={currentPage}
									handleNextPage={handleNextPage}
									handlePageChange={handlePageChange}
								/>
							</div>

						</div>
					</div>
				</section>
			</div>
		</Layout>
		</>
	)
}