import { Route, Routes } from "react-router";
import "./App.css";
import LoginPage from "./pages/Auth/LoginPage";
import OnboardingPage from "./pages/Auth/OnboardingPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import CallPage from "./pages/Communication/CallPage";
import ChatPage from "./pages/Communication/ChatPage";
import NotificationsPage from "./pages/Communication/NotificationsPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div data-theme="cupcake" className="w-full h-screen">
      {/* <h1 className="text-3xl font-bold underline text-green-500">
        Bismillah!
      </h1> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
