import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router";
import Layout from "./components/Layout/Layout";
import PageLoader from "./components/Misc/PageLoader";
import useAuthUser from "./lib/hooks/queries/queries/useAuthQuery";
import usePageTitle from "./lib/hooks/usePageTitle";
import { useThemeStore } from "./lib/store/theme.store";

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/Auth/LoginPage"));
const SignUpPage = lazy(() => import("./pages/Auth/SignUpPage"));
const OnboardingPage = lazy(() => import("./pages/Auth/OnboardingPage"));

const NotificationsPage = lazy(
  () => import("./pages/Communication/NotificationsPage")
);
const CallPage = lazy(() => import("./pages/Communication/CallPage"));
const ChatPage = lazy(() => import("./pages/Communication/ChatPage"));
const FriendsPage = lazy(() => import("./pages/Communication/FriendsPage"));

function App() {
  usePageTitle();
  const { currentTheme } = useThemeStore();
  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;

  return (
    <div data-theme={currentTheme}>
      {/* <h1 className="text-3xl font-bold underline text-green-500">
        Bismillah!
      </h1> */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar>
                  <HomePage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/signup"
            element={!isAuthenticated ? <SignUpPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <LoginPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/onboarding"
            element={
              isAuthenticated ? (
                !isOnboarded ? (
                  <OnboardingPage />
                ) : (
                  <Navigate to={"/"} />
                )
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/notifications"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar>
                  <NotificationsPage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/call/:id"
            element={
              isAuthenticated && isOnboarded ? (
                <CallPage />
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/chat/:id"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar={false}>
                  <ChatPage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/friends"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar>
                  <FriendsPage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
        </Routes>
      </Suspense>
      <Toaster />
    </div>
  );
}

export default App;
