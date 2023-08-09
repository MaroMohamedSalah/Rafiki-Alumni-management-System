import React, { useState, useEffect, useRef } from "react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./GetStarted.css";
import alumniImg from "../imgs/alumni-img-2.svg";
import studentImg from "../imgs/Student img.svg";
import hrImg from "../imgs/HR img.svg";
import AOS from "aos";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const GetStarted = () => {
	const [isLastSlide, setIsLastSlide] = useState(false);
	const swiperRef = useRef(null); // Create a ref for swiper instance

	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: true,
		});
		swiperRef.current = new Swiper(".swiper-container", {
			slidesPerView: 1,
			modules: [Navigation, Pagination],
			pagination: {
				el: ".pagination-wrapper .swiper-pagination",
				clickable: true,
			},
			navigation: {
				nextEl: ".swiper-container .swiper-button-next",
				prevEl: ".swiper-container .swiper-button-prev",
			},
			on: {
				slideChange: () => {
					AOS.refresh();
					const activeIndex = swiperRef.current.activeIndex;
					const slidesCount = swiperRef.current.slides.length;
					setIsLastSlide(activeIndex === slidesCount - 1);
				},
			},
		});

		return () => {
			swiperRef.current.destroy();
			AOS.refresh();
		};
	}, []);
	return (
		<div className="GetStartedSwiper">
			<div className="swiper-container overflow-hidden vh-100">
				<div className="swiper-nav container position-relative d-flex justify-content-between align-items-center position-absolute">
					<h1 className="z-2 d-none d-md-block">Logo</h1>
					<div className="swiper-button-prev">
						<i className="fa-solid fa-arrow-left"></i>
					</div>
				</div>
				<div className="swiper-wrapper h-100">
					<div className="swiper-slide pt-5 alumni">
						{/* Content for Slide 1 */}
						<div className="container">
							<div className="row p-md-3">
								<div className="col-12 col-md-8  d-flex justify-content-center align-items-start flex-column order-2 order-md-1">
									<h2 className="actorName mb-3 mb-md-5">Alumni</h2>
									<p className="actorDescription">
										Our graduates, now alumni, actively participate in our
										Alumni Management System by applying for job opportunities,
										sharing career milestones, and connecting with fellow alumni
										to foster a robust professional network.
									</p>
								</div>
								<div className="col-12 col-md-4  order-1 order-md-2">
									<img
										className="w-100"
										src={alumniImg}
										alt=""
										data-aos="fade-up"
										data-aos-delay="600"
									/>
								</div>
							</div>
							<div
								className="after"
								data-aos="zoom-out-up"
								data-aos-delay="600"
							></div>
						</div>
					</div>
					<div className="swiper-slide pt-5 student">
						{/* Content for Slide 2 */}
						<div className="container">
							<div className="row p-md-3">
								<div className="col-12 col-md-8 d-flex justify-content-center align-items-start flex-column order-2 order-md-1">
									<h2 className="actorName mb-3 mb-md-5">Student</h2>
									<p className="actorDescription">
										join to us as a Student <br /> ... <br /> ... <br /> ...
									</p>
								</div>
								<div className="col-12 col-md-4 order-1 order-md-2">
									<img
										className="w-100"
										src={studentImg}
										alt=""
										// data-aos="fade-up"
										// data-aos-delay="600"
									/>
								</div>
							</div>
							<div
								className="after"
								// data-aos="zoom-out-up"
								// data-aos-delay="600"
							></div>
						</div>
					</div>
					<div className="swiper-slide pt-5 hr">
						{/* Content for Slide 3 */}
						<div className="container">
							<div className="row p-md-3">
								<div className="col-12 col-md-8 d-flex justify-content-center align-items-start flex-column order-2 order-md-1">
									<h2 className="actorName mb-3 mb-md-5">HR</h2>
									<p className="actorDescription">
										With a focus on practicality, HR professionals facilitate
										job placements and career advancements within the Alumni
										Management System, connecting alumni and current students
										with valuable employment opportunities and paths to growth.
									</p>
								</div>
								<div className="col-12 col-md-4 order-1 order-md-2">
									<img
										className="w-100"
										src={hrImg}
										alt=""
										// data-aos="fade-up"
										// data-aos-delay="600"
									/>
								</div>
							</div>
							<div
								className="after"
								// data-aos="zoom-out-up"
								// data-aos-delay="600"
							></div>
						</div>
					</div>
				</div>

				<div className="pagination-wrapper container">
					<div className="row">
						<div className="col">
							<div className="swiper-pagination ps-4 pb-5"></div>
						</div>
					</div>
				</div>

				{/* Render button or link based on the active slide */}
				{isLastSlide ? (
					<Link to="/roleSelection">
						<button className="swiper-button-next btn rounded-5 px-4 px-md-5 mb-5">
							Get Started
						</button>
					</Link>
				) : (
					<div
						className="swiper-button-next btn rounded-5 px-4 px-md-5 mb-5"
						onClick={() => swiperRef.current.slideNext()}
					>
						Next
					</div>
				)}
			</div>
		</div>
	);
};

export default GetStarted;
