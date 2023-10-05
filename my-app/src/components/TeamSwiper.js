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
			img: "https://scontent.fcai22-2.fna.fbcdn.net/v/t39.30808-6/243579308_10165512914965401_8628431571916992085_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeEtSKqFGlPYmRJgeC60iCggXn_ygJaaW55ef_KAlppbnovswDGYcMgODpaFh2hUO4mNrHtg3U816ZJn2C48KCVY&_nc_ohc=87sszfAyneIAX862vWY&_nc_ht=scontent.fcai22-2.fna&oh=00_AfDzoEGZfR3OfKVp6FP5v3HnHwHsCF7tFnzz4eXopgxfxg&oe=651CA015",
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
			img: "https://scontent.fcai22-1.fna.fbcdn.net/v/t39.30808-6/346975300_638832794344741_5663229216656707559_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeEq-2ubxtaT3AUeODEhpQiiPCGnbUtOQlk8IadtS05CWduvOCt_zrjPIgkGDfNGPh6a-F0LDLazpVBFckLKclo8&_nc_ohc=oKbjcyrbHIEAX_LULoA&_nc_ht=scontent.fcai22-1.fna&oh=00_AfB-CmbcNCmfUtQubmEsIuGf4GCce7OYHdI99F--OxMFGw&oe=651BD3BD",
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
			img: "https://scontent.fcai22-4.fna.fbcdn.net/v/t39.30808-6/345598192_956495852035157_8795313300678831859_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeFGMC2B-e-KAR3jVapyuQKODdX_f4iKZAMN1f9_iIpkA-wjHTDcbjnep1oGidOZ7n1yCEpyL3ac57Or26lpirZr&_nc_ohc=gOARr1EcXq8AX_TJv9N&_nc_ht=scontent.fcai22-4.fna&oh=00_AfBhdaHrcXBEmdPkMPfDLTzub4Y-h_sxLMO7FdsU9RR7Dg&oe=651D9C8E",
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
			img: "https://scontent.fcai22-4.fna.fbcdn.net/v/t39.30808-6/371894708_1085439445791544_6425038245321750238_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeGfy5O2gLesTh9pzUEJIs7o5FWq0a1r2jLkVarRrWvaMpWz2OCRFSbP2UGDUMBXokIVSSBlpD7DIo0Z733B6nSo&_nc_ohc=LkoO3Lx7uu8AX_9CJBz&_nc_ht=scontent.fcai22-4.fna&oh=00_AfA04A04nC0EjznHof8NfX6cYVPjsgl5CSJy0tmAMBIxpA&oe=651CD6F3",
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
