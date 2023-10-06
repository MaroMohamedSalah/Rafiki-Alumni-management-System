// icons
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";

// swiper.js
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// team imgs
import marwanImg from "../imgs/marwanImg.jpg";
import abdoImg from "../imgs/abdElRahmanImg.jpg";
import mazenMohamedImg from "../imgs/MazenImg.jpg";
import azzaImg from "../imgs/azzaImg.jpeg";
import mahmoudImg from "../imgs/mahmoudImg.JPG";
import mazenIslamImg from "../imgs/mazinIslamImg.jpg";
import ahmedImg from "../imgs/ahmedImg.jpg";
import amrImg from "../imgs/drAmrImg.jpg";
import moheyImg from "../imgs/moheyImg.jpg";
import martinaImg from "../imgs/martinaImg.jpg";
import samaImg from "../imgs/samaImg.jpg";
import { Link } from "react-router-dom";

//style
import "./teamSwiper.css";

const TeamSwiper = () => {
	const teamMembers = [
		// Marwan
		{
			name: "Marwan Mohamed",
			title: "Team Leader, Front-end",
			img: marwanImg,
			social: [
				{
					platform: "linkedin",
					link: "https://www.linkedin.com/in/marwanmohamedsalah/",
				},
				{
					platform: "github",
					link: "https://github.com/MaroMohamedSalah",
				},
				{
					platform: "facebook",
					link: "https://www.facebook.com/profile.php?id=100009187233222",
				},
			],
		},
		// Amr
		{
			name: "Amr S. Ghoneim",
			title: "Our Amazing Consultant",
			img: amrImg,
			social: [
				{
					platform: "linkedin",
					link: "https://www.linkedin.com/in/amrghoneim/",
				},
				{
					platform: "facebook",
					link: "https://www.facebook.com/amr.ghoneim",
				},
			],
		},
		// Sama
		{
			name: "Sama Gomaa",
			title: "Business Analyst",
			img: samaImg,
			social: [
				{
					platform: "linkedin",
					link: "http://www.linkedin.com/in/sama-gomaa",
				},
				{
					platform: "github",
					link: "https://github.com/samagomaa",
				},
				{
					platform: "facebook",
					link: "https://www.facebook.com/profile.php?id=100008853250931&mibextid=ZbWKwL",
				},
			],
		},
		// Mazin Mohamed
		{
			name: "Mazin Mohamed",
			title: "UI/UX Designer",
			img: mazenMohamedImg,
			social: [
				{
					platform: "linkedin",
					link: "https://eg.linkedin.com/in/mazen-mohamed-495291241",
				},
				{
					platform: "github",
					link: "https://github.com/mazen3722",
				},
				{
					platform: "behance",
					link: "https://www.behance.net/mazenmohamed83",
				},
			],
		},
		// Abdo
		{
			name: "AbdEl-Rahman Nasr",
			title: "UI/UX Designer",
			img: abdoImg,
			social: [
				{
					platform: "linkedin",
					link: "https://www.linkedin.com/in/victory-171200",
				},
				{
					platform: "github",
					link: "https://github.com/victory-17",
				},
				{
					platform: "behance",
					link: "https://www.behance.net/victory-17",
				},
			],
		},
		// Mohey
		{
			name: "Mohey El-deen",
			title: "Designer",
			img: moheyImg,
			social: [
				{
					platform: "linkedin",
					link: "https://www.linkedin.com/in/mohey-e-maher",
				},
				{
					platform: "facebook",
					link: "https://m.facebook.com/mohey.e.maher",
				},
				{
					platform: "github",
					link: "https://github.com/mohey-e-maher",
				},
				{
					platform: "behance",
					link: "https://www.behance.net/mohey_e_maher",
				},
			],
		},
		// Martina
		{
			name: "Martina Mousa",
			title: "Database Designer",
			img: martinaImg,
			social: [
				{
					platform: "linkedin",
					link: "https://www.linkedin.com/in/martina-mousa-a88708223?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
				},
				{
					platform: "github",
					link: "https://github.com/MARTINA-MOUSA",
				},
				{
					platform: "facebook",
					link: "https://www.facebook.com/profile.php?id=100029764970180&mibextid=ZbWKwL",
				},
			],
		},
		// Ahmed
		{
			name: "Ahmed Hany",
			title: "Database Designer",
			img: ahmedImg,
			social: [
				{
					platform: "linkedin",
					link: "https://www.linkedin.com/in/ahmed-hany-aou?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
				},
				{
					platform: "github",
					link: "https://github.com/Ahmed-Hany-Aou",
				},
			],
		},
		// mazin islam
		{
			name: "Mazin Islam",
			title: "Back-end Developer",
			img: mazenIslamImg,
			social: [
				{
					platform: "linkedin",
					link: "https://www.linkedin.com/in/mazin-islam-88658b22b",
				},
				{
					platform: "github",
					link: "https://github.com/N1ghtHunter",
				},
				{
					platform: "facebook",
					link: "https://www.facebook.com/mazinislam?mibextid=9R9pXO",
				},
			],
		},
		// Mahmoud
		{
			name: "Mahmoud Fathy",
			title: "Tester",
			img: mahmoudImg,
			social: [
				// {
				// 	platform: "linkedin",
				// 	link: "https://www.linkedin.com/in/mazin-islam-88658b22b",
				// },
				// {
				// 	platform: "github",
				// 	link: "https://github.com/N1ghtHunter",
				// },
				{
					platform: "facebook",
					link: "https://www.facebook.com/profile.php?id=100028448964098&mibextid=ZbWKwL",
				},
			],
		},
		// Azza
		{
			name: "Azza Mohamed",
			title: "Tester",
			img: azzaImg,
			social: [
				{
					platform: "linkedin",
					link: "https://www.linkedin.com/in/azza-mohamed-5b0ab21a9",
				},
				{
					platform: "facebook",
					link: "https://www.facebook.com/profile.php?id=100011274993311&mibextid=ZbWKwL",
				},
			],
		},
		// Shahd
		{
			name: "Shahd Ahmed",
			title: "HR, Social Media Specialist",
			img: "https://media.licdn.com/dms/image/D4D03AQExXTrO1w7nKQ/profile-displayphoto-shrink_400_400/0/1667637271002?e=1701302400&v=beta&t=iZpAzDhhIKCQNcDoZzUKOXdLc-DdW19VIAdjbwQmYG4",
			social: [
				{
					platform: "linkedin",
					link: "https://www.linkedin.com/in/shahd-ahmed-90777022b",
				},
				{
					platform: "github",
					link: "https://github.com/shahdahmed2000",
				},
				{
					platform: "facebook",
					link: "https://www.facebook.com/shahdahmed.mhmd?mibextid=ZbWKwL",
				},
			],
		},
	];

	const displayTeamMembers = () => {
		return teamMembers.map((member) => {
			return (
				<SwiperSlide className="py-3 px-2">
					<div className="memberImg mb-2">
						<img src={member.img} alt="member-1" className="img-fluid" />
					</div>
					<h3 className="name mb-2">{member.name}</h3>
					<h4 className="title text-black-50">{member.title}</h4>
					<ul className="social list-unstyled d-flex justify-content-between my-4">
						{member.social.map((s) => (
							<li key={s.platform} className={s.platform}>
								<Link to={s.link} className="m-2" target="_blank">
									{/* Render platform icon here */}
									{s.platform === "linkedin" && (
										<LinkedInIcon fontSize="medium" />
									)}
									{s.platform === "github" && <GitHubIcon fontSize="medium" />}
									{s.platform === "facebook" && (
										<FacebookIcon fontSize="medium" />
									)}
									{s.platform === "behance" && (
										<i class="fa-brands fa-behance"></i>
									)}
								</Link>
							</li>
						))}
					</ul>
				</SwiperSlide>
			);
		});
	};
	return (
		<Swiper
			slidesPerView={1}
			spaceBetween={20}
			autoplay={true}
			pagination={{
				clickable: true,
			}}
			modules={[Pagination]}
			breakpoints={{
				767: {
					slidesPerView: 2,
					spaceBetween: 30,
				},
				1200: {
					slidesPerView: 3,
					spaceBetween: 30,
				},
			}}
			className="mySwiper py-5"
		>
			{displayTeamMembers()}
		</Swiper>
	);
};

export default TeamSwiper;
