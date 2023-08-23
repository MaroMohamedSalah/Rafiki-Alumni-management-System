import { useDispatch, useSelector } from "react-redux";
import { updateDashboardSidebar } from "../redux/actions/dashboardActions";

const DashboardSidebarBurgerIcon = () => {
	const dispatch = useDispatch();
	const sideBarIsOpen = useSelector(
		(state) => state.dashboard.sidebar.sideBarIsOpen
	);
	const handelSidebarTrigger = () => {
		if (sideBarIsOpen) {
			updateDashboardSidebar(dispatch, false);
		} else {
			updateDashboardSidebar(dispatch, true);
		}
	};
	return (
		<div className="burgerIcon open" onClick={handelSidebarTrigger}>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default DashboardSidebarBurgerIcon;
