import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Edit from './Edit';
const Read = ({ match, history }) => {
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
        console.log('qwer', response.data);
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
  } else {
    return (
      <div>
        <div>오늘의 질문?{answer.questionContent}</div>
        <div>오늘의 질문 날짜{answer.questionAt}</div>
        <div>내가 쓴 답변{answer.answerContent}</div>
        <div>
          최근 작성일 : {answer.updatedAt ? answer.updatedAt : answer.createdAt}
        </div>
        <button
          onClick={() => {
            history.push({
              pathname: `/answer/${answerId}/edit`,
              state: { answer: answer },
            });
          }}
        >
          수정
        </button>
      </div>
    );
  }
};
export default Read;
