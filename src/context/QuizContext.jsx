import { createContext, useState } from "react";
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

  const registerUser = (userData) => {
    setUserSession(userData);
    saveUserSession(userData);
  };

  const startQuiz = () => {
    setCurrentQuestionIndex(0);
  };

  const selectAnswer = (questionId, optionIndex) => {
    setAnswers((prev) => {
      const updated = {
        ...prev,
        [questionId]: optionIndex,
      };
      saveQuizAnswers(updated);
      return updated;
    });
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => {
      if (prev < questions.length - 1) return prev + 1;
      return prev;
    });
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex((prev) => {
      if (prev > 0) return prev - 1;
      return prev;
    });
  };

  const goToQuestion = (index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  const calculateScore = () => {
    return questions.reduce((total, quest) => {
      if (answers[quest.id] === quest.correctAnswer) {
        return total + quest.points;
      }
      return total;
    }, 0);
  };

  const finishTest = () => {
    setIsSubmitted(true);
    saveSubmitStatus(true);
    navigate("/result");
  };

  const getResult = () => {
    const totalScore = calculateScore();
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
  };

  const value = {
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
    getResult,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
