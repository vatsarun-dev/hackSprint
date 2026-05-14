import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PageLoader from "../components/loaders/PageLoader";

const ProtectedRoute = () => {
  const { isAuthenticated, isBootstrapped, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isBootstrapped || loading) {
    return <PageLoader label="Securing your workspace" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
