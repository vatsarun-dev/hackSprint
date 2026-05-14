import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import PageLoader from "../components/loaders/PageLoader";

const PublicRoute = () => {
  const { isAuthenticated, isBootstrapped, loading } = useSelector((state) => state.auth);

  if (!isBootstrapped || loading) {
    return <PageLoader label="Preparing your session" />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;



