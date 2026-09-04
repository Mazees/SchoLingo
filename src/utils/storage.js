const USER_SESSION_KEY = "scholingo_user_session";
const ANSWERS_KEY = "scholingo_answers";
const IS_SUBMITTED_KEY = "scholingo_is_submitted";

export const saveUserSession = (userData) => {
  try {
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error("Failed to save user session:", error);
  }
};

export const getUserSession = () => {
  try {
    const data = localStorage.getItem(USER_SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to get user session:", error);
    return null;
  }
};

export const saveQuizAnswers = (answers) => {
  try {
    localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
  } catch (error) {
    console.error("Failed to save answers:", error);
  }
};

export const getQuizAnswers = () => {
  try {
    const data = localStorage.getItem(ANSWERS_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Failed to get answers:", error);
    return {};
  }
};

export const saveSubmitStatus = (status) => {
  try {
    localStorage.setItem(IS_SUBMITTED_KEY, JSON.stringify(Boolean(status)));
  } catch (error) {
    console.error("Failed to save submit status:", error);
  }
};

export const getSubmitStatus = () => {
  try {
    const data = localStorage.getItem(IS_SUBMITTED_KEY);
    return data ? JSON.parse(data) : false;
  } catch (error) {
    console.error("Failed to get submit status:", error);
    return false;
  }
};

export const clearTestStorage = () => {
  try {
    localStorage.removeItem(ANSWERS_KEY);
    localStorage.removeItem(IS_SUBMITTED_KEY);
  } catch (error) {
    console.error("Failed to clear test storage:", error);
  }
};
