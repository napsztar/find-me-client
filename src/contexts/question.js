import { createContext, useState } from 'react';

const QuestionContext = createContext({
  state: { question: {}, loading: false },
  actions: {
    setQuestion: () => {},
    setLoading: () => {},
  },
});

const QuestionProvider = ({ children }) => {
  const [question, setQuestion] = useState({});
  const [loading, setLoading] = useState(false);

  const value = {
    state: { question, loading },
    actions: {
      setQuestion,
      setLoading,
    },
  };

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
};

export { QuestionProvider };

export default QuestionContext;
