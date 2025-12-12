import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/Auth/LoginPage";
import OnboardingPage from "./pages/Auth/OnboardingPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import CallPage from "./pages/Communication/CallPage";
import ChatPage from "./pages/Communication/ChatPage";
import NotificationsPage from "./pages/Communication/NotificationsPage";
import HomePage from "./pages/HomePage";
import { useQuery } from "@tanstack/react-query";
import API from "./lib/api";

function App() {
  const { data: authData } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await API.get("/auth/me");
      return res.data;
    },
    retry: false,
  });

  const authUser = authData?.user;

  return (
    <div data-theme="cupcake" className="w-full h-screen">
      {/* <h1 className="text-3xl font-bold underline text-green-500">
        Bismillah!
      </h1> */}
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
