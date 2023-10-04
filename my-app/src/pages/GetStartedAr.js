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

const GetStartedAr = () => {
	const [isLastSlide, setIsLastSlide] = useState(false);
	const swiperRef = useRef(null);
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
					const isMobileScreen = window.innerWidth <= 767;

					const activeIndex = swiperRef.current.activeIndex;
					const slidesCount = swiperRef.current.slides.length;
					setIsLastSlide(activeIndex === slidesCount - 1);

					const currentSlide = swiperRef.current.slides[activeIndex];
					const image = currentSlide.querySelector(".actorImg");
					if (image) {
						image.classList.add("fade-up");
					}

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

	const setCirclePosition = (element, left, bottom, background) => {
		element.style.left = left;
		element.style.bottom = bottom;
		element.style.background = background;
	};
	return (
		<div className="GetStartedSwiper" dir="rtl">
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
						<div className="container h-75 d-flex justify-content-center align-items-center">
							<div className="row p-md-3 w-100">
								<div className="col-12 col-md-8  d-flex justify-content-center align-items-start flex-column order-2 order-md-1">
									<h2 className="actorName mb-3 mb-md-5">
										خريج{" "}
										<Link className="fs-6" to={"/getStarted"}>
											EN
										</Link>
									</h2>
									<p className="actorDescription">
										خريجي الكلية، يشاركون بفعالية في نظام إدارة الخريجين الخاص
										بنا. يشمل ذلك التقديم لفرص العمل، مشاركة إنجازاتهم المهنية،
										والتواصل مع زملائهم السابقين لتعزيز شبكتهم المهنية القوية.
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
						<div className="container h-75 d-flex justify-content-center align-items-center">
							<div className="row p-md-3 w-100">
								<div className="col-12 col-md-8 d-flex justify-content-center align-items-start flex-column order-2 order-md-1">
									<h2 className="actorName mb-3 mb-md-5">طالب</h2>
									<p className="actorDescription">
										كطالب، أنت في قلب مجتمعنا. انضم إلينا واستكشف الفرص والموارد
										والروابط لدعم رحلتك الأكاديمية والمهنية. مستقبلك يبدأ هنا.
									</p>
								</div>
								<div className="col-12 col-md-4 order-1 order-md-2">
									<img className="w-100 actorImg" src={studentImg} alt="" />
								</div>
							</div>
						</div>
					</div>
					<div className="swiper-slide pt-5 hr">
						<div className="container h-75 d-flex justify-content-center align-items-center">
							<div className="row p-md-3 w-100">
								<div className="col-12 col-md-8 d-flex justify-content-center align-items-start flex-column order-2 order-md-1">
									<h2 className="actorName mb-3 mb-md-5">موارد بشرية</h2>
									<p className="actorDescription">
										باهتمامهم بالتطبيق العملي، يسهل محترفو الموارد البشرية
										عمليات توظيف الوظائف وتطوير الوظائف ضمن نظام إدارة الخريجين.
										يقومون بربط الخريجين والطلاب الحاليين بفرص العمل القيمة
										ومسارات النمو.
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

				<Link
					to="/roleSelection"
					className={`getStartBtn btn rounded-5 px-4 px-md-5 mb-5 start-50 end-50 ${
						isLastSlide ? "d-block" : "d-none"
					}`}
				>
					ابدأ الآن
				</Link>

				<div
					className={`swiper-button-next btn rounded-5 px-4 px-md-5 mb-5 start-50 end-50 ${
						isLastSlide ? "d-none" : "d-block"
					} `}
				>
					التالي
				</div>

				<div className="after"></div>
			</div>
		</div>
	);
};

export default GetStartedAr;
