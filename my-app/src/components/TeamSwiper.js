// icons
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";

// swiper.js
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// team imgs
import marwanImg from "../imgs/marwanImg.jpg";
import { Link } from "react-router-dom";

//style
import "./teamSwiper.css";

const TeamSwiper = () => {
	const teamMembers = [
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
		{
			name: "Amr S. Ghoneim",
			title: "Consultant",
			img: "https://scontent.fcai22-2.fna.fbcdn.net/v/t39.30808-6/243579308_10165512914965401_8628431571916992085_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeEtSKqFGlPYmRJgeC60iCggXn_ygJaaW55ef_KAlppbnovswDGYcMgODpaFh2hUO4mNrHtg3U816ZJn2C48KCVY&_nc_ohc=87sszfAyneIAX862vWY&_nc_ht=scontent.fcai22-2.fna&oh=00_AfDzoEGZfR3OfKVp6FP5v3HnHwHsCF7tFnzz4eXopgxfxg&oe=651CA015",
			social: [
				{
					platform: "linkedin",
					link: "https://www.linkedin.com/in/amrghoneim/",
				},
				// {
				// 	platform: "github",
				// 	link: "https://github.com/MaroMohamedSalah",
				// },
				{
					platform: "facebook",
					link: "https://www.facebook.com/amr.ghoneim",
				},
			],
		},
		{
			name: "Sama Gomaa",
			title: "Requirement Engineer",
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
		{
			name: "Mazen Mohamed",
			title: "UI/UX Designer",
			img: "",
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
		{
			name: "AbdEl-Rahman Nasr",
			title: "UI/UX Designer",
			img: "",
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
		{
			name: "Ahmed Hany",
			title: "Database Designer",
			img: "",
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
			pagination={{
				clickable: true,
			}}
			modules={[Pagination]}
			breakpoints={{
				767: {
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
