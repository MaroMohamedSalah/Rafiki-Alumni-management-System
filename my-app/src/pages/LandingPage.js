import { Link } from "react-router-dom";
import "./LandingPage.css";
import Cursor from "../components/Cursor";
import Logo from "../components/Logo";
import { Divider } from "@mui/material/node";
import introImg from "../imgs/landing_page_intro.png";
import feature1Img from "../imgs/feature-1.png";
import alumniImg from "../imgs/alumniActor.png";
import studentImg from "../imgs/studentActor.png";
import hrImg from "../imgs/hrActor.png";
import TeamSwiper from "../components/TeamSwiper";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";

const LandingPage = () => {
	return (
		<div className="LandingPage">
			<Cursor />
			{/* start nav  */}
			<nav>
				<div className="container d-flex justify-content-between align-items-center py-2">
					<h1>Logo</h1>
					<div className="d-flex">
						<Link to={"./login"} className="btn login me-4 py-2 px-3 rounded-5">
							<h5>Login</h5>
						</Link>
						<Link
							to={"./getStarted"}
							className="btn signup py-2 px-3 rounded-5"
						>
							<h5>Signup</h5>
						</Link>
					</div>
				</div>
			</nav>
			{/* end nav  */}
			{/* start intro  */}
			<section className="intro">
				<div className="container py-5">
					<div className="row py-5">
						<div className="col-12 col-lg-6">
							<h1>Discover Rafiki</h1>
							<h2>Your College's All-in-One Hub</h2>
							<p className="text-black-50">
								Join our unique community, uniting students, graduates, faculty,
								and administrators. Explore discussions, jobs, ask questions,
								materials, and more!
							</p>
							<div className="d-flex justify-content-center flex-column align-items-center my-5">
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
						<div className="col-12 col-lg-6">
							<img
								src={introImg}
								className="img-fluid"
								alt="introImg"
								srcset=""
							/>
						</div>
					</div>
				</div>
			</section>
			{/* end intro  */}
			{/* start features */}
			<section className="features">
				<div className="container py-5">
					<div className="title text-center">
						<h2 className="sectionTitle">Features</h2>
					</div>
					<div className="row py-5">
						<div className="col-12 col-lg-4 px-5 mb-4">
							<div className="card shadow-lg d-flex flex-column justify-content-center align-items-center p-2">
								<div className="image">
									<img
										src={feature1Img}
										alt="feature-1"
										className="img-fluid"
									/>
								</div>
								<h3 className="title text-center py-3">
									Empowering Your <span className="activeText">Career</span>
								</h3>
								<p className="description text-center">
									Rafiki provides a dedicated Career Services platform, tailored
									to support your professional growth. As an active member of
									our community, you can post job listings and discover exciting
									career opportunities within the CS industry. Our user-friendly
									tools simplify the job search process and enable you to
									connect with top-notch talent or find your dream job. Take
									control of your career path with Rafiki.
								</p>
							</div>
						</div>

						<div className="col-12 col-lg-4 px-5 mb-4">
							<div className="card shadow-lg d-flex flex-column justify-content-center align-items-center p-2">
								<div className="image">
									<img
										src={feature1Img}
										alt="feature-1"
										className="img-fluid"
									/>
								</div>
								<h3 className="title text-center py-3">
									Empowering Your <span className="activeText">Career</span>
								</h3>
								<p className="description text-center">
									Rafiki provides a dedicated Career Services platform, tailored
									to support your professional growth. As an active member of
									our community, you can post job listings and discover exciting
									career opportunities within the CS industry. Our user-friendly
									tools simplify the job search process and enable you to
									connect with top-notch talent or find your dream job. Take
									control of your career path with Rafiki.
								</p>
							</div>
						</div>

						<div className="col-12 col-lg-4 px-5 mb-4">
							<div className="card shadow-lg d-flex flex-column justify-content-center align-items-center p-2">
								<div className="image">
									<img
										src={feature1Img}
										alt="feature-1"
										className="img-fluid"
									/>
								</div>
								<h3 className="title text-center py-3">
									Empowering Your <span className="activeText">Career</span>
								</h3>
								<p className="description text-center">
									Rafiki provides a dedicated Career Services platform, tailored
									to support your professional growth. As an active member of
									our community, you can post job listings and discover exciting
									career opportunities within the CS industry. Our user-friendly
									tools simplify the job search process and enable you to
									connect with top-notch talent or find your dream job. Take
									control of your career path with Rafiki.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* end features */}
			{/* start actors  */}
			<section className="actors">
				<div className="container py-5">
					<div className="title text-center mb-4">
						<h2 className="sectionTitle">Who can join us?</h2>
					</div>
					<div className="actor row p-2 mx-0 mx-md-5 position-relative">
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
					<div className="actor row p-2 mx-0 mx-md-5 position-relative">
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
					<div className="actor row p-2 mx-0 mx-md-5 position-relative">
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
			</section>
			{/* end actors  */}
			{/* start team */}
			<section className="team">
				<div className="container py-5">
					<div className="title text-center mb-5">
						<h2 className="sectionTitle">Meet the team</h2>
					</div>
					{/* <!-- Slider main container --> */}
					<TeamSwiper />
				</div>
			</section>
			{/* end team */}
			{/* start footer */}
			<footer>
				<div className="container pt-4 pb-2 d-flex justify-content-center align-items-center flex-column">
					<Divider light className="w-100 my-2 logo">
						LOGO
					</Divider>
					<h4 className="my-3">Reach Us</h4>
					<ul className="social list-unstyled d-flex justify-content-between my-4">
						<li>
							<Link to={""} className="m-2" target="_blank">
								<LinkedInIcon fontSize="medium" />
							</Link>
						</li>
						<li>
							<Link to={""} className="m-2" target="_blank">
								<LinkedInIcon fontSize="medium" />
							</Link>
						</li>
						<li>
							<Link to={""} className="m-2" target="_blank">
								<LinkedInIcon fontSize="medium" />
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
