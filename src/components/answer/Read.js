import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Edit from './Edit';
import { isEmptyObject, toDateFormat } from '../../utils/common';

const Read = ({ match, history }) => {
  const { answerId } = match.params;
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState({});
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_HOST}/answer/read`,
          { answerId: answerId },
          { 'Content-Type': 'application/json', withCredentials: true },
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

  if (isEmptyObject(answer)) {
    return null;
  }

  return (
    <div>
      <div>오늘의 질문?{answer.questionContent}</div>
      <div>오늘의 질문 날짜{toDateFormat(answer.questionAt)}</div>
      <div>내가 쓴 답변{answer.answerContent}</div>
      <div>
        최근 작성일 :{' '}
        {toDateFormat(answer.updatedAt ? answer.updatedAt : answer.createdAt)}
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
};
export default Read;
