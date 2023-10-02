import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Cursor from "../components/Cursor";
import Logo from "../components/Logo";
import { Divider } from "@mui/material/node";
import introImg from "../imgs/introImg.png";
import feature1Animation from "../animations/animation_feature_1.json";
import feature2Animation from "../animations/animation_feature_2.json";
import feature3Animation from "../animations/animation_feature_3.json";
import missionAnimation from "../animations/animation_mission.json";
import whatWeOfferAnimation from "../animations/animation_what_we_offer.json";
import joinUsAnimation from "../animations/animation_join.json";

import alumniImg from "../imgs/alumniActor.png";
import studentImg from "../imgs/studentActor.png";
import hrImg from "../imgs/hrActor.png";
import introDecoration1 from "../imgs/introDecoration1.png";
import introDecoration2 from "../imgs/introDecoration2.png";
import actorsDecoration1 from "../imgs/actorsDecoration1.png";
import actorsDecoration3 from "../imgs/actorsDecoration3.png";

import TeamSwiper from "../components/TeamSwiper";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";

import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "lottie-react";
import LandingPageNav from "../components/LandingPageNav";

const LandingPage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		// Check if the user is already authenticated or has an active session.
		const isAuthenticated = localStorage.getItem("sessionId");

		if (isAuthenticated) {
			// Redirect to the desired route when the user is already in session.
			navigate("/dashboard"); // Change '/dashboard' to your desired route.
		}
	}, [navigate]);

	useEffect(() => {
		AOS.init({
			duration: 1000, // Set the duration for animations (in milliseconds)
		});
	}, []);

	return (
		<div className="LandingPage">
			<Cursor />
			{/* start nav  */}
			<LandingPageNav />
			{/* end nav  */}
			{/* start intro  */}
			<section className="intro position-relative">
				<div className="container">
					<div className="row py-5 justify-content-between flex-column-reverse flex-md-row">
						<div className="col-12 col-lg-5">
							<h1 data-aos="fade-up" className="text-center text-md-start">
								Discover Rafiki
							</h1>
							<h2
								data-aos="fade-up"
								data-aos-delay="100"
								className="text-center text-md-start"
							>
								Your College's All-in-One Hub
							</h2>
							<p
								data-aos="fade-up"
								data-aos-delay="100"
								className="text-black-50 text-center text-md-start"
							>
								Join our unique community, uniting students, graduates, faculty,
								and administrators. Explore discussions, jobs, ask questions,
								materials, <br /> and more!
							</p>
							<div
								className="d-flex justify-content-center flex-column align-items-center my-5"
								data-aos="zoom-in"
							>
								<Link
									to={"./getStarted"}
									className="btn signup py-2 px-3 rounded-5"
								>
									<h5>Join Now</h5>
								</Link>
								<Divider className="w-100 my-3">OR</Divider>
								<Link to={"./login"} className="btn login py-2 px-3 rounded-5">
									<h5>Already a member? Log in</h5>
								</Link>
							</div>
						</div>
						<div className="col-12 col-lg-6 mb-5 mb-md-0">
							<div data-aos="zoom-in" data-aos-delay="100">
								<img
									src={introImg}
									className="img-fluid"
									alt="introImg"
									srcset=""
								/>
							</div>
						</div>
					</div>
				</div>
				{/* <div
					className="decoration1 position-absolute d-none d-md-block"
					data-aos="fade-right"
				>
					<img src={introDecoration1} alt="decoration" className="img-fluid" />
				</div>
				<div
					className="decoration2 position-absolute d-none d-md-block"
					data-aos="fade-left"
				>
					<img src={introDecoration2} alt="decoration" className="img-fluid" />
				</div> */}
			</section>
			{/* end intro  */}
			{/* start features */}
			<section className="features">
				<div className="container py-5">
					<div className="title text-center">
						<h2 className="sectionTitle">Features</h2>
					</div>
					<div className="row py-5">
						<div className="col-12 col-lg-4 px-3 px-md-5 mb-4">
							<div
								className="card shadow-lg d-flex flex-column justify-content-center align-items-center p-2"
								data-aos="flip-left"
							>
								<div className="image">
									<Lottie
										loop={true}
										autoplay
										animationData={feature1Animation}
										style={{ height: "250px" }}
									/>
								</div>
								<h3 className="title text-center py-3">
									Unlock Your <span className="activeText">Potential</span>
								</h3>
								<p className="description text-center">
									Rafiki offers exclusive career opportunities tailored to FCAI
									alumni and students. Build a comprehensive professional
									profile, craft an impressive CV, and connect with top talent.
									Access job listings exclusively available to our community and
									take charge of your career journey with Rafiki.
								</p>
							</div>
						</div>

						<div className="col-12 col-lg-4 px-3 px-md-5 mb-4">
							<div
								className="card shadow-lg d-flex flex-column justify-content-center align-items-center p-2"
								data-aos="flip-left"
								data-aos-delay="100"
							>
								<div className="image">
									<Lottie
										loop={true}
										autoplay
										animationData={feature2Animation}
										style={{ height: "250px" }}
									/>
								</div>
								<h3 className="title text-center py-3">
									Connect & <span className="activeText">Collaborate</span>
								</h3>
								<p className="description text-center">
									Rafiki serves as a dynamic hub where FCAI alumni connect,
									build detailed profiles, form country-based communities, find
									answers in our FAQ, and schedule meetings with professors.
									Elevate your personal and professional journey within our
									thriving community, forging valuable connections and accessing
									resources tailored to your needs.
								</p>
							</div>
						</div>

						<div className="col-12 col-lg-4 px-3 px-md-5 mb-4">
							<div
								className="card shadow-lg d-flex flex-column justify-content-center align-items-center p-2"
								data-aos="flip-left"
								data-aos-delay="200"
							>
								<div className="image">
									<Lottie
										loop={true}
										autoplay
										animationData={feature3Animation}
										style={{ height: "250px" }}
									/>
								</div>
								<h3 className="title text-center py-3">
									Engage & <span className="activeText">Share</span>
								</h3>
								<p className="description text-center">
									Rafiki encourages open dialogue and knowledge exchange among
									students, alumni, HR professionals, and faculty. Engage in
									discussions covering academic advice, industry trends, and
									more. Connect with experts for collaborative problem-solving
									and gain insights from a diverse range of experiences and
									perspectives.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* end features */}
			{/* start actors  */}
			<section className="actors position-relative">
				<div className="container py-5">
					<div className="title text-center mb-4">
						<h2 className="sectionTitle">Who can join us?</h2>
					</div>
					<div
						className="actor row p-2 mx-0 mx-md-5 position-relative"
						data-aos="fade-right"
					>
						<div className="col-12 col-md-9 col-lg-10">
							<h4 className="actorName text-md-start text-center py-3">
								Alumni
							</h4>
							<p className="actorDescription text-md-start text-center">
								Calling all FCAI alumni! Rediscover your academic roots and
								reconnect with fellow graduates on Rafiki. Share your valuable
								knowledge, experiences, and insights with the next generation of
								CS professionals. Here, you can expand your network, offer
								mentorship, and contribute to the thriving growth of our
								community. Your journey doesn't stop at graduation; it continues
								right here.
							</p>
						</div>
						<div className="col">
							<div className="actorImg position-absolute bottom-0 end-0 d-none d-md-block">
								<img src={alumniImg} alt="actor-img" className="img-fluid" />
							</div>
						</div>
					</div>
					<div
						className="actor row p-2 mx-0 mx-md-5 position-relative reverseGradient"
						data-aos="fade-left"
						data-aos-delay="100"
					>
						<div className="col">
							<div className="actorImg position-absolute bottom-0 left-0 d-none d-md-block">
								<img src={studentImg} alt="actor-img" className="img-fluid" />
							</div>
						</div>
						<div className="col-12 col-md-7 col-lg-9">
							<h4 className="actorName text-center text-md-end py-3">
								Student
							</h4>
							<p className="actorDescription text-md-start text-center">
								Are you a current FCAI student aspiring for a brilliant future?
								Join Rafiki to connect with alumni who've walked in your shoes.
								Seek guidance, gain invaluable insights, and explore internship
								and job opportunities within our extensive network. Collaborate
								with your peers and access a treasure trove of resources to
								enrich both your academic and professional journey.
							</p>
						</div>
					</div>

					<div
						className="actor row p-2 mx-0 mx-md-5 position-relative"
						data-aos="fade-right"
						data-aos-delay="200"
					>
						<div className="col-12 col-md-9 col-lg-10">
							<h4 className="actorName text-center text-md-start py-3">
								Recruiters
							</h4>
							<p className="actorDescription text-md-start text-center">
								Recruiters, unlock a treasure trove of talent within the CS
								field on Rafiki. Gain access to a diverse and exceptionally
								skilled community of alumni and students. Post your job
								listings, engage with potential candidates, and cultivate
								meaningful connections. Join us in shaping the future of CS
								education and employment. Your next star hire may be just a
								click away.
							</p>
						</div>
						<div className="col">
							<div className="actorImg position-absolute bottom-0 end-0 d-md-block d-none">
								<img src={hrImg} alt="actor-img" className="img-fluid" />
							</div>
						</div>
					</div>
				</div>
				<div
					className="actorDecoration1 position-absolute d-none d-md-block"
					data-aos="zoom-in"
				>
					<img src={actorsDecoration1} alt="decoration" />
				</div>
				<div
					className="actorDecoration3 position-absolute d-none d-md-block"
					data-aos="zoom-in"
				>
					<img src={actorsDecoration3} alt="decoration" />
				</div>
			</section>
			{/* end actors  */}
			{/* start team */}
			<section className="team">
				<div className="container py-5">
					<div className="title text-center mb-5">
						<h2 className="sectionTitle">Meet the team</h2>
					</div>
					{/* <!-- Slider main container --> */}
					<div data-aos="fade-up">
						<TeamSwiper />
					</div>
				</div>
			</section>
			{/* end team */}
			{/* start about  */}
			<section className="about">
				<div className="container py-5">
					<div className="title text-center mb-5">
						<h2 className="sectionTitle">About Rafiki</h2>
					</div>
					<div className="row py-5">
						<div className="col-12 col-md-4">
							<div className="aboutCard shadow">
								<h3
									className="subtitle text-center pb-3 position-relative"
									data-aos="fade-down"
								>
									<div className="icon position-absolute">
										<Lottie
											loop={true}
											autoplay
											animationData={missionAnimation}
											style={{ height: "80px" }}
										/>
									</div>
									Our Mission
								</h3>
								<p className="description p-3 text-justify" data-aos="fade-up">
									At Rafiki, we are on a mission to unite the vibrant community
									of the Faculty of Computers and Artificial Intelligence (FCAI)
									at HU. We believe in fostering lifelong connections among
									students, alumni, educators, and administrators. Our platform
									is designed to empower your academic and professional journey
									by providing exclusive opportunities, knowledge sharing, and
									meaningful collaboration.
								</p>
							</div>
						</div>
						<div className="col-12 col-md-4">
							<div className="aboutCard shadow">
								<h3
									className="subtitle text-center pb-3 mb-0 position-relative"
									data-aos="fade-down"
									data-aos-delay="200"
								>
									<div className="icon position-absolute">
										<Lottie
											loop={true}
											autoplay
											animationData={whatWeOfferAnimation}
											style={{ height: "60px" }}
										/>
									</div>
									What We Offer
								</h3>
								<p
									className="description p-3 text-justify"
									data-aos="fade-up"
									data-aos-delay="200"
								>
									Rafiki is more than just an alumni management system; it's a
									dynamic hub where you can unlock exclusive career
									opportunities, build professional profiles, engage in
									discussions, and connect with fellow members of the FCAI
									community. Whether you're a current student looking to secure
									your future, an alumnus seeking to reconnect, or an HR
									professional seeking top talent, Rafiki has something special
									to offer you.
								</p>
							</div>
						</div>
						<div className="col-12 col-md-4">
							<div className="aboutCard shadow">
								<h3
									className="subtitle text-center pb-3 mb-0 position-relative"
									data-aos="fade-down"
								>
									<div className="icon position-absolute">
										<Lottie
											loop={true}
											autoplay
											animationData={joinUsAnimation}
											style={{ height: "100px" }}
										/>
									</div>
									Join Our Community
								</h3>
								<p className="description p-3 text-justify" data-aos="fade-up">
									We invite you to join our unique community, where your journey
									doesn't end with graduation—it continues here. Together, we
									can shape the future of computer science and artificial
									intelligence education and employment. Connect, collaborate,
									and elevate your personal and professional aspirations with
									Rafiki.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* end about  */}
			{/* start footer */}
			<footer>
				<div className="container pt-4 pb-2 d-flex justify-content-center align-items-center flex-column">
					<Divider light className="w-100 my-2 logo">
						<Logo />
					</Divider>
					<h4 className="my-3">Reach Us</h4>
					<ul className="social list-unstyled d-flex justify-content-between my-4">
						<li>
							<Link
								to={"https://www.facebook.com/rafikiFCAIHu"}
								className="m-2 facebook text-white-50"
								target="_blank"
							>
								<FacebookIcon fontSize="medium" />
							</Link>
						</li>
						<li>
							<Link
								to={"https://www.instagram.com/rafiki_fcai/"}
								className="m-2 instagram  text-white-50"
								target="_blank"
							>
								<InstagramIcon fontSize="medium" />
							</Link>
						</li>
						<li>
							<Link
								to="mailto:rafiki.questions@gmail.com"
								className="m-2 email text-white-50"
								target="_blank"
							>
								<EmailIcon fontSize="medium" />
							</Link>
						</li>
					</ul>
					<h5>© 2023 Rafiki. All Rights Reserved</h5>
				</div>
			</footer>
			{/* end footer */}
		</div>
	);
};
export default LandingPage;
