import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import {
  RequireSession,
  RequireResult,
} from "./components/common/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <QuizProvider>
        <div className="min-h-screen bg-zinc-50 text-neutral font-sans antialiased">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<RequireSession />}>
              <Route path="/test" element={<TestPage />} />
            </Route>
            <Route element={<RequireResult />}>
              <Route path="/result" element={<ResultPage />} />
            </Route>
          </Routes>
        </div>
      </QuizProvider>
    </BrowserRouter>
  );
}

export default App;
