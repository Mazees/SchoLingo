import { createContext, useState, useCallback, useMemo } from "react";
import questionsData from "../data/questions.json";
import programsData from "../data/programs.json";
import {
  getUserSession,
  saveUserSession,
  getQuizAnswers,
  saveQuizAnswers,
  getSubmitStatus,
  saveSubmitStatus,
  clearTestStorage,
} from "../utils/storage";
import { useNavigate } from "react-router-dom";

export const QuizContext = createContext(null);

export const QuizProvider = ({ children }) => {
  const navigate = useNavigate();

  const [questions] = useState(questionsData);
  const [programs] = useState(programsData);
  const [userSession, setUserSession] = useState(
    () => getUserSession() || null,
  );
  const [answers, setAnswers] = useState(() => getQuizAnswers() || {});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [isSubmitted, setIsSubmitted] = useState(
    () => getSubmitStatus() || false,
  );

  const registerUser = useCallback((userData) => {
    setUserSession(userData);
    saveUserSession(userData);
  }, []);

  const startQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
  }, []);

  const selectAnswer = useCallback((questionId, optionIndex) => {
    setAnswers((prev) => {
      const updated = {
        ...prev,
        [questionId]: optionIndex,
      };
      saveQuizAnswers(updated);
      return updated;
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => {
      if (prev < questions.length - 1) return prev + 1;
      return prev;
    });
  }, [questions.length]);

  const prevQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => {
      if (prev > 0) return prev - 1;
      return prev;
    });
  }, []);

  const goToQuestion = useCallback(
    (index) => {
      if (index >= 0 && index < questions.length) {
        setCurrentQuestionIndex(index);
      }
    },
    [questions.length],
  );

  const finishTest = useCallback(() => {
    setIsSubmitted(true);
    saveSubmitStatus(true);
    navigate("/result");
  }, [navigate]);

  const resetQuiz = useCallback(() => {
    setAnswers({});
    setCurrentQuestionIndex(-1);
    setIsSubmitted(false);
    clearTestStorage();
  }, []);

  const getResult = useCallback(() => {
    const totalScore = questions.reduce((total, quest) => {
      if (answers[quest.id] === quest.correctAnswer) {
        return total + quest.points;
      }
      return total;
    }, 0);

    const correctCount = questions.reduce((count, q) => {
      return answers[q.id] === q.correctAnswer ? count + 1 : count;
    }, 0);

    const level =
      totalScore > 75
        ? "advanced"
        : totalScore > 50
          ? "intermediate"
          : "beginner";

    return {
      score: totalScore,
      correctCount,
      level,
      programsSuggestion: programs.find((p) => p.level === level),
    };
  }, [questions, answers, programs]);

  const value = useMemo(
    () => ({
      questions,
      programs,
      userSession,
      answers,
      currentQuestionIndex,
      isSubmitted,
      registerUser,
      startQuiz,
      selectAnswer,
      prevQuestion,
      nextQuestion,
      goToQuestion,
      finishTest,
      resetQuiz,
      getResult,
    }),
    [
      questions,
      programs,
      userSession,
      answers,
      currentQuestionIndex,
      isSubmitted,
      registerUser,
      startQuiz,
      selectAnswer,
      prevQuestion,
      nextQuestion,
      goToQuestion,
      finishTest,
      resetQuiz,
      getResult,
    ],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
