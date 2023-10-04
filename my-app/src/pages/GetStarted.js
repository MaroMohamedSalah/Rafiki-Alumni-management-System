import React, { useState, useEffect, useRef } from "react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./GetStarted.css";
import alumniImg from "../imgs/alumni-img-2.svg";
import studentImg from "../imgs/studentImg2.svg";
import hrImg from "../imgs/hrImg.svg";
import AOS from "aos";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const GetStarted = () => {
	const [isLastSlide, setIsLastSlide] = useState(false);
	const swiperRef = useRef(null); // Create a ref for swiper instance
	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: true,
		});

		const swiperAfter = document.querySelector(
			".GetStartedSwiper .swiper-container .after"
		);

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
					const isMobileScreen = window.innerWidth <= 767; // Example breakpoint

					const activeIndex = swiperRef.current.activeIndex;
					const slidesCount = swiperRef.current.slides.length;
					setIsLastSlide(activeIndex === slidesCount - 1);

					// Apply fade-up animation to the image in the current slide
					const currentSlide = swiperRef.current.slides[activeIndex];
					const image = currentSlide.querySelector(".actorImg");
					if (image) {
						image.classList.add("fade-up");
					}
					// change the circle position
					switch (activeIndex) {
						case 0:
							isMobileScreen
								? setCirclePosition(swiperAfter, "-2%", "80%", "white")
								: setCirclePosition(swiperAfter, "-2%", "17%", "white");
							break;

						case 1:
							isMobileScreen
								? setCirclePosition(swiperAfter, "85%", "56%", "#5a82a8")
								: setCirclePosition(swiperAfter, "95%", "56%", "#5a82a8");
							break;

						case 2:
							isMobileScreen
								? setCirclePosition(swiperAfter, "85%", "85%", "#f29935")
								: setCirclePosition(swiperAfter, "95%", "18%", "#f29935");
							break;

						default:
							break;
					}
				},
			},
		});

		return () => {
			swiperRef.current.destroy();
			AOS.refresh();
		};
	}, []);

	// Helper function to set the circle position and color
	const setCirclePosition = (element, left, bottom, background) => {
		element.style.left = left;
		element.style.bottom = bottom;
		element.style.background = background;
	};
	return (
		<div className="GetStartedSwiper">
			<div className="swiper-container overflow-hidden vh-100 position-relative">
				<div className="swiper-nav container position-relative d-flex justify-content-between align-items-center position-absolute">
					<h1 className="z-2 d-none d-md-block py-2">
						<Logo />
					</h1>
					<div className="swiper-button-prev">
						<i className="fa-solid fa-arrow-left"></i>
					</div>
				</div>
				<div className="swiper-wrapper h-100">
					<div className="swiper-slide pt-5 alumni">
						{/* Content for Slide 1 */}
						<div className="container h-75 d-flex justify-content-center align-items-center">
							<div className="row p-md-3 w-100">
								<div className="col-12 col-md-8  d-flex justify-content-center align-items-start flex-column order-2 order-md-1">
									<h2 className="actorName mb-3 mb-md-5">
										Alumni{" "}
										<Link className="fs-6" to={"/getStartedAr"}>
											AR?
										</Link>{" "}
									</h2>
									<p className="actorDescription">
										Our graduates, now alumni, actively participate in our
										Alumni Management System by applying for job opportunities,
										sharing career milestones, and connecting with fellow alumni
										to foster a robust professional network.
									</p>
								</div>
								<div className="col-12 col-md-4 order-1 order-md-2">
									<img
										className="w-100 actorImg fade-up"
										src={alumniImg}
										alt=""
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="swiper-slide pt-5 student">
						{/* Content for Slide 2 */}
						<div className="container h-75 d-flex justify-content-center align-items-center">
							<div className="row p-md-3 w-100">
								<div className="col-12 col-md-8 d-flex justify-content-center align-items-start flex-column order-2 order-md-1">
									<h2 className="actorName mb-3 mb-md-5">Student</h2>
									<p className="actorDescription">
										As a student, you're at the heart of our community. Join us
										and explore opportunities, resources, and connections to
										support your academic and professional journey. Your future
										starts here.
									</p>
								</div>
								<div className="col-12 col-md-4 order-1 order-md-2">
									<img className="w-100 actorImg" src={studentImg} alt="" />
								</div>
							</div>
						</div>
					</div>
					<div className="swiper-slide pt-5 hr">
						{/* Content for Slide 3 */}
						<div className="container h-75 d-flex justify-content-center align-items-center">
							<div className="row p-md-3 w-100">
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
									<img className="w-100 actorImg" src={hrImg} alt="" />
								</div>
							</div>
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

				<Link
					to="/roleSelection"
					className={`getStartBtn btn rounded-5 px-4 px-md-5 mb-5 ${
						isLastSlide ? "d-block" : "d-none"
					}`}
				>
					Get Started
				</Link>

				<div
					className={`swiper-button-next btn rounded-5 px-4 px-md-5 mb-5 ${
						isLastSlide ? "d-none" : "d-block"
					} `}
				>
					Next
				</div>

				<div className="after"></div>
			</div>
		</div>
	);
};

export default GetStarted;
