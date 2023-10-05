import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthenticatedRoute() {
	const auth = useSelector((state: RootState) => state.auth);

	return auth.isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />;
}
