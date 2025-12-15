import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router";
import Layout from "./components/Layout/Layout";
import useAuthUser from "./lib/hooks/useAuthUser";
import { useThemeStore } from "./lib/store/theme.store";
import LoginPage from "./pages/Auth/LoginPage";
import OnboardingPage from "./pages/Auth/OnboardingPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import CallPage from "./pages/Communication/CallPage";
import ChatPage from "./pages/Communication/ChatPage";
import NotificationsPage from "./pages/Communication/NotificationsPage";
import HomePage from "./pages/HomePage";
import PageLoader from "./components/Misc/PageLoader";

function App() {
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
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
