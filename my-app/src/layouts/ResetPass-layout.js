import { Outlet } from "react-router-dom";
import "./resetPass.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Swiper from "swiper";
import forgetPassImg from "../imgs/forget-pass-img.png";
import Logo from "../components/Logo";
import { useEffect, useRef } from "react";
import { Navigation, Pagination } from "swiper/modules";
import ResetPassEmail from "../pages/ResetPassEmail";

const ResetPassLayout = () => {
	// const swiperRef = useRef(null); // Create a ref for swiper instance

	// useEffect(() => {
	// 	swiperRef.current = new Swiper(".swiper-container", {
	// 		slidesPerView: 1,
	// 		modules: [Navigation, Pagination],
	// 		pagination: {
	// 			el: ".swiper-pagination",
	// 			clickable: true,
	// 		},
	// 		navigation: {
	// 			nextEl: ".swiper-button-next",
	// 			prevEl: ".swiper-button-prev",
	// 		},
	// 		on: {
	// 			// slideChange: () => {
	// 			// 	const isMobileScreen = window.innerWidth <= 767; // Example breakpoint
	// 			// 	const activeIndex = swiperRef.current.activeIndex;
	// 			// 	const slidesCount = swiperRef.current.slides.length;
	// 			// 	// setIsLastSlide(activeIndex === slidesCount - 1);
	// 			// 	// Apply fade-up animation to the image in the current slide
	// 			// 	const currentSlide = swiperRef.current.slides[activeIndex];
	// 			// 	// const image = currentSlide.querySelector(".actorImg");
	// 			// 	// if (image) {
	// 			// 	// 	image.classList.add("fade-up");
	// 			// 	// }
	// 			// },
	// 		},
	// 	});

	// 	return () => {
	// 		swiperRef.current.destroy();
	// 	};
	// }, []);

	return (
		<div className="Auth ResetPass">
			<div className="container-fluid">
				<div className="position-absolute pt-2">
					<Logo />
				</div>

				<div className="row">
					<div className="col-12 col-md-6 d-none d-md-flex justify-content-center align-items-center leftSide">
						<div className="image overflow-hidden w-100 d-flex justify-content-center">
							<img className="img-fluid" src={forgetPassImg} alt="" />
						</div>
					</div>
					<div className="col-12 col-md-6 d-flex rightSide position-relative">
						<div className="container d-flex justify-content-center align-items-center flex-column">
							<Outlet />
						</div>
					</div>
				</div>
			</div>
		</div>
		/* Slider main container */
		// <div className="swiper-container w-100 overflow-hidden position-relative">
		// 	{/* Additional required wrapper */}
		// 	<div className="swiper-wrapper">
		// 		{/* Slides */}
		// 		<div class="swiper-slide">
		// 			<ResetPassEmail />
		// 		</div>
		// 		<div class="swiper-slide">Slide 2</div>
		// 		<div class="swiper-slide">Slide 3</div>
		// 		{/* Add more slides as needed */}
		// 	</div>
		// 	{/* If we need pagination */}
		// 	<div className="swiper-pagination"></div>

		// 	{/* If we need navigation buttons */}
		// 	<div className="swiper-button-prev"></div>
		// 	<div className="swiper-button-next"></div>
		// </div>
	);
};

export default ResetPassLayout;
