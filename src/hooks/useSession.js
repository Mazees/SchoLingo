import { useQuiz } from './useQuiz';


export const useSession = () => {
  const { userSession, registerUser } = useQuiz();

  const isRegistered = Boolean(userSession && userSession.name);

  return {
    userSession,
    isRegistered,
    registerUser,
  };
};
