import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "../routes/ProtectedRoute";
import PublicRoute from "../routes/PublicRoute";
import PageLoader from "../components/loaders/PageLoader";

const HomePage = lazy(() => import("../features/dashboard/pages/HomePage"));
const LoginPage = lazy(() => import("../features/auth/pages/LoginPage"));
const SignupPage = lazy(() => import("../features/auth/pages/SignupPage"));
const ProjectsPage = lazy(() => import("../features/projects/pages/ProjectsPage"));
const ProjectDetailsPage = lazy(() => import("../features/projects/pages/ProjectDetailsPage"));
const CreateProjectPage = lazy(() => import("../features/projects/pages/CreateProjectPage"));
const BlogsPage = lazy(() => import("../features/blogs/pages/BlogsPage"));
const BlogDetailsPage = lazy(() => import("../features/blogs/pages/BlogDetailsPage"));
const WriteBlogPage = lazy(() => import("../features/blogs/pages/WriteBlogPage"));
const ProfilePage = lazy(() => import("../features/profile/pages/ProfilePage"));
const EditProfilePage = lazy(() => import("../features/profile/pages/EditProfilePage"));
const DashboardHomePage = lazy(() => import("../features/dashboard/pages/DashboardHomePage"));
const CommunityPage = lazy(() => import("../features/community/pages/CommunityPage"));

const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader label="Loading page experience" />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: withSuspense(HomePage) },
      { path: "/developers", element: withSuspense(CommunityPage) },
      { path: "/projects", element: withSuspense(ProjectsPage) },
      { path: "/projects/:id", element: withSuspense(ProjectDetailsPage) },
      { path: "/blogs", element: withSuspense(BlogsPage) },
      { path: "/blogs/:id", element: withSuspense(BlogDetailsPage) },
      { path: "/profile/:username", element: withSuspense(ProfilePage) },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: withSuspense(LoginPage) },
          { path: "/signup", element: withSuspense(SignupPage) },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/dashboard/home", element: withSuspense(HomePage) },
          { path: "/dashboard", element: withSuspense(DashboardHomePage) },
          { path: "/profile/edit", element: withSuspense(EditProfilePage) },
          { path: "/dashboard/projects", element: withSuspense(ProjectsPage) },
          { path: "/dashboard/projects/:id", element: withSuspense(ProjectDetailsPage) },
          { path: "/projects/create", element: withSuspense(CreateProjectPage) },
          { path: "/blogs/write", element: withSuspense(WriteBlogPage) },
          { path: "/dashboard/community", element: withSuspense(CommunityPage) },
        ],
      },
    ],
  },
]);



