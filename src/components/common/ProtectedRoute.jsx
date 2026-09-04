import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../../hooks/useSession";
import { useQuiz } from "../../hooks/useQuiz";

export const RequireSession = () => {
  const { isRegistered } = useSession();

  if (!isRegistered) {
    return <Navigate to="/register" replace />;
  }

  return <Outlet />;
};

export const RequireResult = () => {
  const { isRegistered } = useSession();
  const { isSubmitted } = useQuiz();

  if (!isRegistered) {
    return <Navigate to="/register" replace />;
  }

  if (!isSubmitted) {
    return <Navigate to="/test" replace />;
  }

  return <Outlet />;
};
