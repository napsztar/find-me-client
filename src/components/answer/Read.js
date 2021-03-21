import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Read = ({ match }) => {
  const { answerId } = match.params;
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState({});
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          'http://localhost:5000/answer/read',
          { answerId: answerId },
          { 'Content-Type': 'application/json' },
        );
        setAnswer(response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, []);
  if (loading) {
    return <div>loading...</div>;
  }
  if (!answer) {
    return null;
  }
  return (
    <div>
      <div>오늘의 질문?{answer.questionContent}</div>
      <div>오늘의 질문 날짜{answer.questionAt}</div>
      <div>내가 쓴 답변{answer.answerContent}</div>
      <div>
        최근 작성일 : {answer.updatedAt ? answer.updatedAt : answer.createdAt}
      </div>
    </div>
  );
};
export default Read;
