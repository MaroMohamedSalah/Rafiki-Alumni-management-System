import cv from "../imgs/Set As Resume.svg";
const GenerateCV = () => {
	return (
		<button className="btn GenerateCV">
			<span className="icon">
				<img src={cv} alt="" />
			</span>{" "}
			Create your own CV
		</button>
	);
};
export default GenerateCV;
